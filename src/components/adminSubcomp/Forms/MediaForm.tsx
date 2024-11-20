// MediaForm.tsx
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Media, Model } from '../types';

interface MediaFormData {
  url: string;
  description: string;
  price?: number;
  modelId?: string;
}

interface MediaFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (media: MediaFormData) => void;
  initialData?: Media;
  models: Model[];
}

const MediaForm: React.FC<MediaFormProps> = ({
  open,
  handleClose,
  handleSave,
  initialData,
  models
}) => {
  const [formData, setFormData] = useState<MediaFormData>({
    url: '',
    description: '',
    price: undefined,
    modelId: undefined
  });

  useEffect(() => {
    if (initialData) {
      const { id, model, ...rest } = initialData;
      setFormData({
        ...rest,
        modelId: model?.id.toString()
      });
    } else {
      setFormData({
        url: '',
        description: '',
        price: undefined,
        modelId: undefined
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleModelChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      modelId: event.target.value
    }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: '#d81b60', fontWeight: 'bold' }}>
        {initialData ? 'Edit Media' : 'Add New Media'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price || ''}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
              value={formData.modelId || ''}
              onChange={handleModelChange}
              label="Model"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {models.map((model) => (
                <MenuItem key={model.id} value={model.id.toString()}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default MediaForm;
