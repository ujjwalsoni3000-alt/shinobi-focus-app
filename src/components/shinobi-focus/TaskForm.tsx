'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Mission name must be at least 3 characters.' }),
  chakra: z.number().min(1).max(5),
});

interface TaskFormProps {
  onAddTask: (title: string, chakra: number) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      chakra: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddTask(values.title, values.chakra);
    form.reset();
  }

  return (
    <Card className="mx-4 md:mx-8">
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
              name="chakra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chakra Needed ({field.value})</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Accept Mission</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
