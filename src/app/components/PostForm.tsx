'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/app/store/hooks";
import { createPost } from "@/app/store/postsSlice";

const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(5),
  content: z.string().min(10)
});

type FormData = z.infer<typeof schema>;

export const PostForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    dispatch(createPost(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" placeholder="Заголовок" {...register("title")}
        className="w-full p-2 border rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea placeholder="Содержание" {...register("content")}
        className="w-full p-2 border rounded h-40" />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Создать</button>
    </form>
  );
};