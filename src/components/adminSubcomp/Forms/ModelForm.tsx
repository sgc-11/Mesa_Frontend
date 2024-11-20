import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Box
} from '@mui/material';
import { Model } from '../types';

interface ModelFormData {
  name: string;
  bio?: string;
  email: string;
  phone?: string;
}

interface ModelFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (model: ModelFormData) => void;
  initialData?: Model;
}

const ModelForm: React.FC<ModelFormProps> = ({
  open,
  handleClose,
  handleSave,
  initialData
}) => {
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    bio: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (initialData) {
      const { id, photos, events, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        name: '',
        bio: '',
        email: '',
        phone: ''
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: '#d81b60', fontWeight: 'bold' }}>
        {initialData ? 'Edit Model' : 'Add New Model'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#d81b60' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          sx={{
            backgroundColor: '#d81b60',
            color: 'white',
            '&:hover': { backgroundColor: '#ad1457' }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModelForm;