interface HabitProps {
  completed: number;
}

export function Habit(props: HabitProps) {
  return (
    <>
      <h1 className="text-blue-500">{props.completed}</h1>
    </>
  );
}