import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Box, 
  Grid 
} from '@mui/material';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { Product } from './types';
import ProductForm from './Forms/ProductForm';
import api from '../../api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = async (productData: Omit<Product, 'id'>) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await api.patch(`/products/${selectedProduct.id}`, productData);
      } else {
        // Create new product
        await api.post('/products', productData);
      }
      fetchProducts();
      setIsFormOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h6" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
            Products
          </Typography>
        </Grid>
        <Grid item>
          <IconButton 
            onClick={() => setIsFormOpen(true)}
            sx={{ 
              backgroundColor: '#f8bbd0', 
              color: '#d81b60',
              '&:hover': { backgroundColor: '#f48fb1' } 
            }}
          >
            +
          </IconButton>
        </Grid>
      </Grid>

      <List>
        {products.map((product) => (
          <ListItem
            key={product.id}
            sx={{
              border: '1px solid #f8bbd0',
              borderRadius: 2,
              marginBottom: 1,
              backgroundColor: '#fff',
            }}
            secondaryAction={
              <>
                <IconButton 
                  edge="end" 
                  onClick={() => handleEdit(product)}
                  sx={{ 
                    color: '#d81b60', 
                    marginRight: 1,
                    '&:hover': { color: '#ad1457' } 
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(product.id)}
                  sx={{
                    color: '#d81b60',
                    '&:hover': { color: '#ad1457' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={product.name}
              secondary={`$${product.price} | ${product.category}`}
              sx={{ color: '#880e4f' }}
            />
          </ListItem>
        ))}
      </List>

      <ProductForm
        open={isFormOpen}
        initialData={selectedProduct || undefined}
        handleClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default ProductList;