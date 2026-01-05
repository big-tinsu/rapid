// src/components/error/Error.tsx
interface ErrorProps {
  message: string
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="alert alert-danger my-2 p-2 text-white bg-red-500 rounded-md">
      {message}
    </div>
  )
}