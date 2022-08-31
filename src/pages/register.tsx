import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

function RegisterPage() {

  const { handleSubmit, register } = useForm<CreateUserInput>()

  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/login')
    }
  })


  function onSubmit(values: CreateUserInput) {
    mutate(values)
  }

  return <div className="flex flex-col space-y-2 items-center max-w-sm mx-auto pt-5">
    <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-sm mx-auto space-y-6">
      {error && <div className="alert shadow-sm">{error.message}</div>}
      <h1 className="text-3xl">Register</h1>
      <input type="email" placeholder="your email" {...register('email')} className="input input-bordered input-primary w-full" />
      <input type="text" placeholder="your name" {...register('name')} className="input input-bordered input-primary w-full" />
      <button type="submit" className="btn btn-primary">Register</button>
    </form>

    <Link href="/login">Already have an account? Login</Link>
  </div>
}

export default RegisterPage