/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter()
  const { data, isLoading } = trpc.useQuery(['users.verify-otp', {
    hash
  }])
  if (isLoading)
    return <p>Verifying...</p>

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

  return <p>Redirecting...</p>
}


function LoginForm() {

  const { handleSubmit, register } = useForm<CreateUserInput>()
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true)
    }
  })


  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath })
  }

  const hash = router.asPath.split('#token=')[1]

  if (hash) return <VerifyToken hash={hash} />

  return <div className="flex flex-col space-y-2 items-center max-w-sm mx-auto pt-5">
    <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full mx-auto space-y-4">
      {error && <div className="alert shadow-sm">{error.message}</div>}
      {success && <p>Check your email</p>}
      <h1 className="text-3xl">Login</h1>
      <input type="email" placeholder="your email" className="input input-bordered input-primary w-full" {...register('email')} />
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    <Link href="/register">Don't have an account? Register</Link>

  </div>
}

export default LoginForm