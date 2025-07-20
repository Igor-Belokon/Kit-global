'use client';
import { useState, FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddModalForm from '@/app/modalForms/AddModalForm';
import Link from 'next/link';

interface HeaderArg {
  pageName: string;
}

const Header: FC<HeaderArg> = ({ pageName }) => {
  const [openAddForm, setOpenAddForm] = useState(false);

  function handleOpen() {
    setOpenAddForm(prev => !prev);
  }

  return (
    <Stack
      sx={{ width: '100%', height: '40px', bgcolor: '#cccccc' }}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <Button
        onClick={handleOpen}
        sx={{ bgcolor: '#f89406', color: '#333333', fontWeight: 'bold' }}
      >
        Add Post
      </Button>
      <Link href={'/'} passHref>
        <Typography>KIT-GLOBAL</Typography>
      </Link>
      <Typography>{pageName}</Typography>
      <AddModalForm open={openAddForm} funcStatus={handleOpen} />
    </Stack>
  );
};

export default Header;
