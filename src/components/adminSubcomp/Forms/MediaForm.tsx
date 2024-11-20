import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Media } from '../types';

interface MediaFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (media: Omit<Media, 'id'>) => void;
  initialData?: Media;
}

// Form data interface to match backend requirements
interface MediaFormData {
  url: string;
  description: string;
  price?: number;
  modelId?: number;
}

const MediaForm: React.FC<MediaFormProps> = ({
  open,
  handleClose,
  handleSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<MediaFormData>({
    url: '',
    description: '',
    price: undefined,
    modelId: undefined,
  });

  useEffect(() => {
    if (initialData) {
      // Pre-fill form data when editing
      const { id, model, ...rest } = initialData;
      setFormData({ ...rest, modelId: model?.id });
    } else {
      setFormData({
        url: '',
        description: '',
        price: undefined,
        modelId: undefined,
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: '#d81b60', fontWeight: 'bold' }}>
        {initialData ? 'Edit Media' : 'Add New Media'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Price"
          name="price"
          type="number"
          value={formData.price || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Model ID"
          name="modelId"
          value={formData.modelId || ''}
          onChange={handleChange}
        />
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
            '&:hover': { backgroundColor: '#ad1457' },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediaForm;
