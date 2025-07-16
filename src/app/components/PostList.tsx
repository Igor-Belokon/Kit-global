'use client';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchPosts } from "@/app/store/postsSlice";
import Link from "next/link";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const loading = useAppSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Загрузка постов...</p>;

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.excerpt}</p>
        </Link>
      ))}
    </div>
  );
};