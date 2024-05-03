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

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })



  function onSubmit(data: z.infer<typeof LoginSchema>){
    console.log(data);
  }

  return (
    <CardWrapper header='Login' 
                 label='Create an account' 
                 backButtonHref='/auth/register' 
                 backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
          <Button type='submit' className='w-full'>
            Log In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
