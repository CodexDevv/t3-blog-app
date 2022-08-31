import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.postId as string

  const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }])

  if (isLoading) return <p>Loading post...</p>

  if (!data) return <Error statusCode={404} />

  return <div className="max-w-sm flex flex-col mx-auto mt-5 rounded border px-10 py-2 space-y-6">
    <h1 className="text-3xl">{data?.title}</h1>
    <p>
      {data?.body}
    </p>
    <Link href="/posts">
      <button className="btn btn-primary">Go to all posts</button>
    </Link>
  </div>
}

export default SinglePostPage;