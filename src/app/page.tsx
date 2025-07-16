import { PostList } from '@/app/components/PostList';
import { Suspense } from 'react';
import { seedInitialPosts } from '@/app/lib/seed';
import { Header } from './components/Header';

export default async function Home() {
  await seedInitialPosts();

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Блог</h1>
      <Suspense fallback={<div>Загрузка...</div>}>
        <PostList />
      </Suspense>
    </main>
  );
}
