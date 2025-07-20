'use client';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { useParams } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { updatePost } from '@/app/store/postsSlice';
import Header from '@/app/components/Header';
import AddIcon from '@mui/icons-material/Add';

export default function PostDetailPage() {
  const dispatch = useAppDispatch();
  const [editStatus, setEditStatus] = useState(false);
  const [addCommentStatus, setAddCommentStatus] = useState(false);
  const { id } = useParams();
  const post = useAppSelector(state =>
    state.posts.items.find(p => p.id === id),
  );
  const [newTitle, setNewTitle] = useState<string>();
  const [newContent, setNewContent] = useState<string>();
  const [newComment, setNewComment] = useState<string>();
  const [comments, setComments] = useState<Array<string> | undefined>(
    post?.comments,
  );
  if (!post) return <p className="p-4">Пост не найден</p>;

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function changeContent(event: ChangeEvent<HTMLInputElement>) {
    setNewContent(event.target.value);
  }

  function changeStatus() {
    setEditStatus(prev => !prev);
  }

  function changeComment(event: ChangeEvent<HTMLInputElement>) {
    setNewComment(event.target.value);
  }

  function update() {
    const editPost = Object.assign({}, post);
    if (newTitle) {
      editPost.title = newTitle;
    }
    if (newContent) {
      editPost.content = newContent;
    }

    if (post?.id) {
      dispatch(updatePost({ id: post?.id, data: editPost }));
      setEditStatus(false);
    }
  }

  function changeAddCommentStatus() {
    setAddCommentStatus(prev => !prev);
  }

  function addComment() {
    const editPost = Object.assign({}, post);
    if (comments && newComment) {
      const arr = [...comments];
      arr.push(newComment);
      editPost.comments = arr;
      setComments(arr);
    } else {
      if (newComment) {
        setComments([newComment]);
        editPost.comments = [newComment];
      }
    }
    if (post?.id) {
      dispatch(updatePost({ id: post?.id, data: editPost }));
    }
    changeAddCommentStatus();
  }

  return (
    <Stack
      component="main"
      sx={{ height: '100%', width: '100%', bgcolor: '#eeeeee' }}
    >
      <Header pageName={`Post: ${post.title}`} />
      <Stack sx={{ padding: '20px' }}>
        {editStatus ? (
          <Stack sx={{ width: '50%' }} direction="row">
            <Stack>
              <TextField defaultValue={post.title} onChange={changeTitle} />
              <TextField defaultValue={post.content} onChange={changeContent} />
            </Stack>
            <Button
              onClick={update}
              sx={{
                bgcolor: '#f89406',
                color: '#333333',
                fontWeight: 'bold',
                maxWidth: '70px',
                maxHeight: '30px',
              }}
            >
              Update
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" sx={{ width: '50%' }}>
            <Stack>
              <Typography sx={{ fontSize: '14px' }}>Title</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                {post.title}
              </Typography>
              <Typography sx={{ fontSize: '14px' }}>Description</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                {post.content}
              </Typography>
            </Stack>
            <Button
              onClick={changeStatus}
              sx={{
                bgcolor: '#f89406',
                color: '#333333',

                maxWidth: '70px',
                maxHeight: '30px',
              }}
            >
              Edit
            </Button>
          </Stack>
        )}

        <Stack>
          {post.comments ? (
            <Stack>
              <Stack direction="row" spacing={2}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Comments
                </Typography>
                <AddIcon
                  onClick={changeAddCommentStatus}
                  sx={{ color: '#f89406' }}
                />
              </Stack>
              {post.comments.map((comment, idx) => (
                <Typography key={idx}>{comment}</Typography>
              ))}
              {addCommentStatus && (
                <Stack direction="row">
                  <TextField onChange={changeComment} />
                  <AddIcon onClick={addComment} sx={{ color: '#f89406' }} />
                </Stack>
              )}
            </Stack>
          ) : (
            <Stack>
              <Stack direction="row" spacing={2}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  No Comments...
                </Typography>
                <AddIcon
                  onClick={changeAddCommentStatus}
                  sx={{ color: '#f89406' }}
                />
              </Stack>
              {addCommentStatus && (
                <Stack direction="row">
                  <TextField onChange={changeComment} />
                  <AddIcon onClick={addComment} sx={{ color: '#f89406' }} />
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
