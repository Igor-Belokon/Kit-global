import { db } from '@/app/lib/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

const seedData = [
  {
    title: 'First blog',
    id: '11958c9b-7d86-43e2-a543-479fe5910413',
    content: 'my first blog',
    comments: ['first comment', 'second comment'],
  },
  {
    title: 'Second blog',
    id: '11958c9b-7d86-43e2-a543-479fe5910414',
    content: 'my second blog',
    comments: ['first comment', 'second comment'],
  },
];

async function seedPosts() {
  for (const post of seedData) {
    await setDoc(doc(collection(db, 'posts'), post.id), {
      title: post.title,
      content: post.content,
      comments: post.comments,
    });
    console.log(`✅ Seeded: ${post.title}`);
  }
}

seedPosts()
  .then(() => {
    console.log('🔥 Seeding complete');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
