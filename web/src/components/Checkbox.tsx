import * as CheckboxRadix from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'phosphor-react';

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  title: string;
  lineThrough?: boolean;
}

export function Checkbox({ title, lineThrough = false, ...rest }: CheckboxProps) {
  return (
    <CheckboxRadix.Root
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      {...rest}
    >
      <div className="flex items-center justify-center w-8 h-8 border-2 border-zinc-800 bg-zinc-900 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
        <CheckboxRadix.Indicator>
          <Check
            size={20}
            weight="bold"
            className="text-white"
          />
        </CheckboxRadix.Indicator>
      </div>
      <span
        className={clsx('text-base text-white leading-tight ', {
          'group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through':
            lineThrough,
        })}
      >
        {title}
      </span>
    </CheckboxRadix.Root>
  );
}
