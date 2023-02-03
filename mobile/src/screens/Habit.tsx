import { BackButton } from '@/components/BackButton';
import { Checkbox } from '@/components/Checkbox';
import Loading from '@/components/Loading';
import { NewHabitButton } from '@/components/NewHabitButton';
import { ProgressBar } from '@/components/ProgressBar';
import { api } from '@/plugins/axios';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

interface HabitParams {
  date: string;
}

type HabitsResponse = {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
};

export function Habit() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<HabitsResponse>();
  const [completed, setCompleted] = useState(0);
  const [amount, setAmount] = useState(0);

  const completedPercentage = generateProgressPercentage(amount, completed);

  const route = useRoute();

  const { date } = route.params as HabitParams;

  const parsedDate = moment(date).startOf('day').toDate();
  const isDateInPast = moment(date).endOf('day').isBefore(new Date());
  const dayOfWeek = moment(date).format('dddd');
  const dayAndMonth = moment(date).format('DD/MM');

  async function fetchHabits() {
    try {
      setLoading(true);

      const { data } = await api.get('day', {
        params: {
          date: parsedDate,
        },
      });

      setHabits(data);
      setCompleted(data.completedHabits!.length);
      setAmount(data.possibleHabits!.length);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a lista de hábitos.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchToggleHabit(habitId: string) {
    try {
      setLoading(true);

      await api.patch(`habits/${habitId}/toggle`);

      const isHabitAlreadyCompleted = habits!.completedHabits.includes(habitId);

      let completedHabits: string[] = [];

      if (isHabitAlreadyCompleted) {
        completedHabits = habits!.completedHabits.filter(
          (id) => id !== habitId
        );
      } else {
        completedHabits = [...habits!.completedHabits, habitId];
      }

      setHabits({
        possibleHabits: habits!.possibleHabits,
        completedHabits,
      });

      setCompleted(completedHabits.length);
      setAmount(habits!.possibleHabits.length);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar o estado desse hábito.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      {loading && <Loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <BackButton />

        <Text className="mt-6 text-base text-white lowercase font-semibold">
          {dayOfWeek}
        </Text>
        <Text className="mt-1 text-3xl text-white font-extrabold">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={completedPercentage} />

        <View className="mt-6">
          {habits?.possibleHabits.length ? (
            <View className="mb-6">
              {habits.possibleHabits.map(({ id, title }) => {
                const isChecked = habits.completedHabits.includes(id);

                return (
                  <Checkbox
                    key={id}
                    title={title}
                    checked={isChecked}
                    disabled={isDateInPast}
                    onPress={() => fetchToggleHabit(id)}
                  />
                );
              })}
            </View>
          ) : (
            !isDateInPast && (
              <>
                <Text className="text-white text-base text-center">
                  Você ainda não esta monitorando nenhum hábito nesse dia da
                  semana.
                </Text>
                <View className="mt-6">
                  <NewHabitButton value="Novo Hábito" />
                </View>
              </>
            )
          )}
          <View>
            {isDateInPast && (
              <Text className="text-white text-base text-center p-2 border border-violet-500 rounded-lg">
                Você não pode editar hábitos de uma data passada.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
