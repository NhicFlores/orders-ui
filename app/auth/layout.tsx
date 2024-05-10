//layout for auth route

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='w-full'>
        <div className='h-screen flex items-center justify-center
                        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600 to-slate-400'>
            {children}
        </div>
    </section>
  )
}

export default AuthLayout
