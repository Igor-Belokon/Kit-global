'use client';
import { useState } from 'react';
import { Button } from '@mui/material';
import AddModalForm from '@/app/modalForms/AddModalForm';

export const Header = () => {
  const [openAddForm, setOpenAddForm] = useState(false);

  function handleOpen() {
    setOpenAddForm(prev => !prev);
  }

  return (
    <div className="grid gap-4">
      <Button onClick={handleOpen}>Add Blog</Button>
      <AddModalForm open={openAddForm} funcStatus={handleOpen} />
    </div>
  );
};
