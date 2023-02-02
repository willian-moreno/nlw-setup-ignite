import { BackButton } from '@/components/BackButton';
import { Checkbox } from '@/components/Checkbox';
import Loading from '@/components/Loading';
import { api } from '@/plugins/axios';
import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function New() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0)
        return Alert.alert(
          'Atenção',
          'Preencha o título do hábito e selecione 1 ou mais dias na semana.'
        );

      setLoading(true);

      await api.post('habits', {
        title,
        weekDays,
      });

      setTitle('');
      setWeekDays([]);
      Alert.alert('Sucesso', 'Hábito criado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar um novo hábito.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

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

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 mb-3 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-zinc-500"
          placeholder="Ex.: Exercícios, dormir bem, etc."
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text className="mt-6 mb-3 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox
              key={weekDay}
              title={weekDay}
              onPress={() => handleToggleWeekDay(index)}
              checked={weekDays.includes(index)}
            />
          );
        })}

        <TouchableOpacity
          activeOpacity={0.7}
          className={clsx(
            'w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6',
            {
              'bg-green-600 opacity-60': !title.length || !weekDays.length,
            }
          )}
          disabled={!title.length || !weekDays.length}
          onPress={handleCreateNewHabit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="ml-2 text-white font-semibold">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
