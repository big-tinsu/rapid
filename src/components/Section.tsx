import { ReactNode } from 'react';

export function Section({ children }: { children: ReactNode }) {
  return <section className='px-6 py-16 max-w-6xl mx-auto'>{children}</section>;
}
