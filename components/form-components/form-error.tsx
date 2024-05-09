import { AlertCircle } from "lucide-react"

interface FormErrorProps {
    message?: string,
}

const FormError = ({message}: FormErrorProps) => {
    if (!message) {
        return null;
    }
  return (
    <div className="flex gap-x-2 items-center justify-center p-3 rounded-md bg-destructive/25 text-sm text-destructive">
    <AlertCircle size={20}/>
    <p>{message}</p>
    </div>
  )
}

export default FormError
