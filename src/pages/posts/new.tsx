import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { CreatePostInput } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"

function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>()

  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['posts.create-post'], {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`)
    }
  })

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="form-control max-w-sm pt-5 mx-auto space-y-4">
    {error && <div className="alert shadow-sm">{error.message}</div>}
    <h1 className="text-3xl">Create Post</h1>
    <input type="text" placeholder="Post Title" {...register('title')} className="input input-bordered input-primary w-full" />
    <textarea placeholder="Body" {...register('body')} className="input input-bordered input-primary w-full" />
    <button className="btn btn-primary">Create Post</button>
  </form>
}

export default CreatePostPage