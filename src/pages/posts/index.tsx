import Link from "next/link"
import { trpc } from "../../utils/trpc"

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(['posts.posts'])

  if (isLoading) return <p>Loading...</p>

  return <div>
    {data?.map(post => (
      <div key={post?.id}>
        <p>{post.title}</p>
        <Link href={`/posts/${post.id}`}>Read Post</Link>
      </div>
    ))}
  </div>
}

export default PostListingPage