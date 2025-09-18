'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MISSION_RANKS } from '@/lib/ranks';
import type { MissionRankName } from '@/lib/types';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Mission name must be at least 3 characters.' }),
  rank: z.enum(['C', 'B', 'A', 'S']),
});

interface TaskFormProps {
  onAddTask: (title: string, rank: MissionRankName) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      rank: 'C',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddTask(values.title, values.rank as MissionRankName);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Mission</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mission Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Master the Rasengan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mission Rank</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 flex-wrap"
                    >
                      {Object.values(MISSION_RANKS).map((rank) => (
                        <FormItem
                          key={rank.name}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={rank.name} id={rank.name} />
                          </FormControl>
                          <FormLabel
                            htmlFor={rank.name}
                            className={cn('font-normal cursor-pointer p-2 rounded-md border', field.value === rank.name && 'border-primary bg-primary/10')}
                          >
                            {rank.name}-Rank (🔥{rank.chakra})
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Accept Mission
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
