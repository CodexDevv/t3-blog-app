import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import LoginForm from "../components/LoginForm"
import dynamic from "next/dynamic"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

const DLoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false
})

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

function LoginPage() {

  return <DLoginForm />
}

export default LoginPage