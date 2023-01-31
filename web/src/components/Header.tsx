import { Plus } from 'phosphor-react';
import logo from '@assets/logo.svg';

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col gap-5 items-center justify-between">
      <img
        src={logo}
        alt="Habits"
      />
      <button
        type="button"
        className="border-2 border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-3 uppercase hover:border-violet-300 2xl:active:scale-95 xl:active:scale-95 lg:active:scale-95 md:active:scale-95 sm:active:scale-95 active:scale-100 transition-all"
      >
        <Plus
          size={20}
          className="text-violet-500"
        />
        Novo Hábito
      </button>
    </div>
  );
}
