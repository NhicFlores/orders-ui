
interface AuthHeaderProps {
  header: string, 
  label: string,
}

const AuthHeader = ({header, label}: AuthHeaderProps) => { 
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className='text-2xl font-semibold'>{header}</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default AuthHeader;
