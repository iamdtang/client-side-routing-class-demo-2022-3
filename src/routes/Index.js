import { useLoaderData } from "react-router-dom";
import PostCard from "../PostCard";

export default function Index() {
  const posts = useLoaderData();

  return (
    <div className="index-page">
      <h1>Posts</h1>
      <div>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
}
