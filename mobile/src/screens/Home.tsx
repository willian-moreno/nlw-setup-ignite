import { DAY_SIZE, HabitDay } from '@/components/HabitDay';
import { Header } from '@/components/Header';
import Loading from '@/components/Loading';
import { api } from '@/plugins/axios';
import { generateDatesFromYearBeginning } from '@/utils/generate-dates-from-year-beginning';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

const characterWeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearBeginning.length;

type SummaryResponse = {
  id: string;
  date: string;
  completed: number;
  amount: number;
}[];

export function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryResponse>([]);
  const { navigate } = useNavigation();

  async function fetchSummary() {
    try {
      setLoading(true);
      const { data } = await api.get('summary');
      setSummary(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter as informações dos hábitos.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSummary();
    }, [])
  );

  if (loading)
    return (
      <View className="flex-1 bg-background">
        <Loading />
      </View>
    );

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Header />
        <View className="flex-row mt-6 mb-2">
          {characterWeekDays.map((characterWeekDay, index) => {
            return (
              <Text
                className="text-zinc-400 text-xl font-bold text-center mx-1"
                style={{
                  width: DAY_SIZE,
                  height: DAY_SIZE,
                }}
                key={characterWeekDay.concat('-', String(index))}
              >
                {characterWeekDay}
              </Text>
            );
          })}
        </View>

        <View className="flex-row flex-wrap">
          {summary.length &&
            datesFromYearBeginning.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return moment(date).isSame(day.date, 'day');
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amount={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('habit', {
                      date: date.toISOString(),
                    })
                  }
                />
              );
            })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  className="m-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-50"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  key={'not-allowed-day'.concat('-', String(index))}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
