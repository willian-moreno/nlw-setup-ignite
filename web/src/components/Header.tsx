import { Plus, X } from 'phosphor-react';
import logo from '@assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitForm } from '@components/NewHabitForm';

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col gap-5 items-center justify-between">
      <img
        src={logo}
        alt="Habits"
      />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border-2 border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-3 uppercase hover:border-violet-300 2xl:active:scale-95 xl:active:scale-95 lg:active:scale-95 md:active:scale-95 sm:active:scale-95 active:scale-100 transition-all"
        >
          <Plus
            size={20}
            className="text-violet-500"
          />
          Novo Hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
              <X
                size={24}
                aria-label="Fechar"
              />
            </Dialog.Close>
            <Dialog.Title className="text-2xl leading-tight font-extrabold">
              Criar Hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
