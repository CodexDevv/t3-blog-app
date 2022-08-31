import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import { useUserContext } from '../context/user.context'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {

  const user = useUserContext()

  if (!user) return <LoginForm />

  return <div className='p-10'>
    <Link href="/posts/new" className='justify-center items-center'>
      <button className='btn btn-primary'>Create Post</button>
    </Link>
  </div>
}

export default Home
