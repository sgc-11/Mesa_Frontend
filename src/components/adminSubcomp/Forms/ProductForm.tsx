import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField 
} from '@mui/material';
import { Product } from '../types';

interface ProductFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (product: Omit<Product, 'id'>) => void;
  initialData?: Product;
}

// Separate interface for form data to match backend expectations
interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  open, 
  handleClose, 
  handleSave, 
  initialData 
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (initialData) {
      // Only copy the fields we want to edit, excluding id
      const { id, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
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

  const onSubmit = () => {
    // Send form data without id
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: '#d81b60', fontWeight: 'bold' }}>
        {initialData ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
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
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
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

export default ProductForm;