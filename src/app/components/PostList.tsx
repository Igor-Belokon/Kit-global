'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchPosts } from '@/app/store/postsSlice';
import Link from 'next/link';
import { Stack, Typography } from '@mui/material';

export const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.items);
  const loading = useAppSelector(state => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Загрузка постов...</p>;

  return (
    <Stack
      spacing={1}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap', height: '100%', width: '100%' }}
    >
      {posts.map(post => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="border p-4 rounded shadow"
        >
          <Stack
            sx={{
              border: '1px solid #333333',
              borderRadius: '3px',
              padding: '5px',
              width: '200px',
            }}
          >
            <Typography fontWeight="bold">{post.title}</Typography>
            <Typography>{post.content.slice(0, 100)}...</Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};
