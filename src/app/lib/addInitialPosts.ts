// scripts/addInitialPosts.ts
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const posts = [
  {
    id: '11958c9b-7d86-43e2-a543-479fe5910413',
    title: 'First blog',
    content: 'my first blog',
    comments: ['first comment', 'second comment'],
  },
  {
    id: '11958c9b-7d86-43e2-a543-479fe5910414',
    title: 'Second blog',
    content: 'my second blog',
    comments: ['first comment', 'second comment'],
  },
];

export async function addInitialPosts() {
  for (const post of posts) {
    await setDoc(doc(db, 'posts', post.id), {
      title: post.title,
      content: post.content,
      comments: post.comments,
    });
    console.log(`Post "${post.title}" added.`);
  }
}
