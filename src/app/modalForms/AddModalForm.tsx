import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useState, ChangeEvent } from 'react';
import { z } from 'zod';
import { useAppDispatch } from '@/app/store/hooks';
import { createPost } from '@/app/store/postsSlice';

interface ModalArgs {
  open: boolean;
  funcStatus: () => void;
}
const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(5),
  content: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const AddModalForm: FC<ModalArgs> = ({ open, funcStatus }) => {
  const dispatch = useAppDispatch();
  const [newPost, setNewPost] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
  });

  const onSubmit = () => {
    if (newPost) {
      dispatch(createPost(newPost));
      funcStatus();
    }
  };

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const post = Object.assign({}, newPost);
    post.title = event.target.value;
    setNewPost(post);
  }

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
            height: '250px',
            border: 'solid 1px ',
            borderColor: 'divider',
            alignItems: 'center',
            borderRadius: '2px',
          }}
        >
          <Stack direction="row">
            <Typography sx={{ marginBottom: '30px', fontSize: '15px' }}>
              Add Post
            </Typography>
            <Button onClick={funcStatus}>close</Button>
          </Stack>
          <TextField onChange={changeTitle} />
          <Stack direction="row" justifyContent="end">
            <Button
              onClick={onSubmit}
              sx={{
                maxHeight: '30px',
                width: '75px',
                bgcolor: 'warning.main',
                border: '1px solid',
                borderColor: 'rareColors.dark',
                color: 'secondColors.light',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Ok
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModalForm;
