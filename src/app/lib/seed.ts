import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const defaultPosts = [
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

export const seedInitialPosts = async () => {
  const postsRef = collection(db, "posts");
  const snapshot = await getDocs(postsRef);

  if (snapshot.empty) {
    console.log("[seed] No posts found. Seeding default posts...");
    for (const post of defaultPosts) {
      const postRef = doc(db, "posts", post.id); // задаём ID вручную
      await setDoc(postRef, {
        title: post.title,
        content: post.content,
        comments: post.comments,
      });
    }
    console.log("[seed] Seeding completed.");
  } else {
    console.log("[seed] Posts already exist. Skipping seed.");
  }
};
