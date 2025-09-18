import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
            Shinobi Focus
          </h1>
        </Link>
        <Button asChild variant="outline">
          <Link href="/daily-progress">
            <CalendarDays />
            Mission Log
          </Link>
        </Button>
      </div>
    </header>
  );
}
