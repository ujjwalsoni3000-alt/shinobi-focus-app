'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { generatePersonalizedMotivation, PersonalizedMotivationInput } from '@/ai/flows/personalized-motivation';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

export function MotivationSensei(props: PersonalizedMotivationInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const getMotivation = async () => {
    setIsLoading(true);
    setIsOpen(true);
    setError('');
    setMessage('');
    try {
      const result = await generatePersonalizedMotivation(props);
      setMessage(result.motivationMessage);
    } catch (e) {
      setError('The Sensei is meditating. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={getMotivation} variant="secondary" className="w-full">
        Seek Sensei's Wisdom
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              A Word from the Sensei
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="py-4 text-foreground text-base font-body italic">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />}
              {message && `"${message}"`}
              {error && <span className="text-destructive">{error}</span>}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
