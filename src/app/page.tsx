import { Stack } from '@mui/material';
import { PostList } from '@/app/components/PostList';
import { Suspense } from 'react';
import { seedInitialPosts } from '@/app/lib/seed';
import Header from './components/Header';

export default async function Home() {
  await seedInitialPosts();

  return (
    <Stack component="main" sx={{ height: '100%', width: '100%' }}>
      <Header pageName={'Blog'} />
      <Stack
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: '#eeeeee',
          padding: '20px',
        }}
      >
        <Suspense fallback={<div>Загрузка...</div>}>
          <PostList />
        </Suspense>
      </Stack>
    </Stack>
  );
}
