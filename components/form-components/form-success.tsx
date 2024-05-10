import { CheckCircle } from "lucide-react"

interface FormErrorProps {
    message?: string,
}

const FormSuccess = ({message}: FormErrorProps) => {
    if (!message) {
        return null;
    }
  return (
    <div className="flex gap-x-2 items-center justify-center p-3 rounded-md bg-emerald-500/25 text-sm text-emerald-600">
    <CheckCircle size={18}/>
    <p>{message}</p>
    </div>
  )
}

export default FormSuccess
