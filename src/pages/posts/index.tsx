import Link from "next/link"
import { trpc } from "../../utils/trpc"

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(['posts.posts'])

  if (isLoading) return <p>Loading...</p>

  return <div className=" max-w-3xl grid grid-cols-4 mx-auto mt-5 gap-4">
    {data?.map(post => (
      <div key={post?.id} className="flex flex-col justify-between rounded border shadow-sm px-5 py-2 w-32">
        <p className="text-lg">{post.title}</p>
        <Link href={`/posts/${post.id}`}>
          <button className="btn btn-primary">Read Post</button>
        </Link>
      </div>
    ))}
  </div>
}

export default PostListingPage