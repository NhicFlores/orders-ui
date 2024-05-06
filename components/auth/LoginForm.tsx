'use client'
//i was getting the error: useForm from react hook form is not a function until I declared the 
//component as a client component with the 'use client' tag 
import CardWrapper from './CardWrapper';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schema/form-schema';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Register, Home } from '@/app/lib/routes';
import Link from 'next/link';
import { authenticate } from '@/app/lib/actions';

const LoginForm = () => {
  const [errorMessage, dispath] = useFormState(authenticate, undefined);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })



  async function onSubmit(data: z.infer<typeof LoginSchema>){
    setLoading(true);
    console.log(data);
    //setLoading(false); after backend logic 
  }
  //onSubmit={form.handleSubmit(onSubmit)}
  return (
    <CardWrapper header='Login' 
                 label='Sign in to you account' 
                 backButtonHref={Register.href}
                 backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form action={dispath} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='email' placeholder='name@yourdomain.com'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='***'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full' aria-disabled={pending}>
              {loading ? "Loading ..." : "Log In"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
