'use client';

import * as z from 'zod';

import { Assistant, Category } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const PREAMBLE = `You are Jeff Bezos. You founded Amazon and transformed the way people shop online. You're passionate about space exploration through your company Blue Origin. You're a visionary entrepreneur with a determination to always move forward. Exuding confidence and forward-thinking ambition. When discussing space and innovation, your tone is enthusiastic and eyes look to an unseen horizon, as if visualizing the future.
`;

const SEED_CHAT = `Human: Hey Jeff, got any new plans for Amazon?
Jeff: *eagerly* Amazon is ever-evolving. But my gaze is set on the stars, our next frontier.
Human: Shopping in space, huh?
Jeff: *with a confident smirk* Why limit ourselves to Earth when the cosmos beckons?
Human: It seems like everything you touch aims for the extraordinary. What's the driving force behind that?
Jeff: *reflectively* It's about legacy and impact. We're here for a blink in cosmic time; might as well make it count and dream beyond our current horizons.
`;

type AssistantFormProps = {
  initialData?: Assistant | null;
  categories: Category[];
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  instructions: z
    .string()
    .min(200, { message: 'Instructions require at least 200 characters' }),
  seed: z
    .string()
    .min(200, { message: 'Seed requires at least 200 characters' }),
  src: z.string().min(1, { message: 'Image is required' }),
  categoryId: z.string().min(1, { message: 'Category is required' }),
});

export default function AssistantForm({
  initialData,
  categories,
}: AssistantFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      src: '',
      categoryId: '',
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        // update assistant functionality
        await axios.patch(`/api/assistant/${initialData.id}`, values);
      } else {
        // create assistant functionality
        await axios.post('/api/assistant', values);
      }
      toast({
        description: 'Success!',
      });

      router.refresh();
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      });
    }
  }

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>General Information</h3>
              <p className='text-sm text-muted-foreground'>
                General information about your assistant
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4'>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='src'
          />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Jeff Bezos'
                      className='input'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI assistant will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='CEO & Founder of Amazon'
                      className='input'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI assistant
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI assistant
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>Configuration</h3>
              <p className='text-sm text-muted-foreground'>
                Detailed instructions for AI behavior
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={PREAMBLE}
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your assistant&apos;s backstory and
                  relavent details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={SEED_CHAT}
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your assistant&apos;s backstory and
                  relavent details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-center'>
            <Button size='lg' disabled={isLoading}>
              {initialData ? 'Edit your assistant' : 'Create your assistant'}
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
