'use client';
import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { createPost, Post } from '@/app/store/postsSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ModalArgs {
  open: boolean;
  funcStatus: () => void;
}

const schema = z.object({
  title: z.string().min(3, 'Min 3 symbols'),
  content: z.string().min(10, 'Min 10 symbols'),
});

type FormData = z.infer<typeof schema>;

const AddModalForm: FC<ModalArgs> = ({ open, funcStatus }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    getValues,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = getValues();

    const post: Omit<Post, 'id'> = {
      title: data.title,
      content: data.content,
      comments: [],
    };

    dispatch(createPost(post));
    reset();
    funcStatus();
  };

  return (
    <Modal
      open={open}
      onClose={funcStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        fontFamily="Arial"
        justifyContent="center"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          paddingTop: '15%',
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.contrastText',
            padding: '20px',
            height: '45%',
            border: 'solid 1px ',
            borderColor: 'divider',
            alignItems: 'center',
            borderRadius: '2px',
          }}
        >
          <Stack
            direction="row"
            alignContent="center"
            marginBottom="15px"
            justifyContent="space-between"
          >
            <Typography sx={{ fontSize: '15px' }} alignContent="center">
              Add Post
            </Typography>
            <Button
              onClick={funcStatus}
              sx={{
                color: '#333333',
                fontWeight: 'bold',
                maxWidth: '70px',
                maxHeight: '30px',
              }}
            >
              close
            </Button>
          </Stack>
          <Typography>Wright title</Typography>
          <TextField
            {...register('title')}
            error={!!errors.title?.message}
            helperText={errors.title?.message || ''}
          />
          <Typography>Wright Content</Typography>
          <TextField
            {...register('content')}
            error={!!errors.content?.message}
            helperText={errors.content?.message || ''}
          />
          <Stack direction="row" justifyContent="end" marginTop="10px">
            <Button
              onClick={onSubmit}
              sx={{
                bgcolor: '#f89406',
                color: '#333333',
                fontWeight: 'bold',
                maxWidth: '100px',
                maxHeight: '30px',
              }}
            >
              Add post
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModalForm;
