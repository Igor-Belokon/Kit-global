import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const seedInitialPosts = async () => {
  const postsCol = collection(db, "posts");
  const existing = await getDocs(postsCol);

  // Только если база пуста
  if (existing.empty) {
    const samplePosts = [
      {
        title: "Добро пожаловать в блог",
        content: "Это наш первый пост в блоге. Здесь будет публиковаться интересный контент.",
      },
      {
        title: "Как использовать наш блог",
        content: "Вы можете создавать и редактировать посты с помощью простой формы на сайте.",
      },
    ];

    for (const post of samplePosts) {
      await addDoc(postsCol, post);
    }

    console.log("📘 Начальные посты добавлены в Firestore.");
  } else {
    console.log("✅ Firestore уже содержит посты — пропущено.");
  }
};