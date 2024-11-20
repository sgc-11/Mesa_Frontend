import React, { useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Media, Model } from './types';
import api from '../../api';
import MediaForm from './Forms/MediaForm';

const MediaList: React.FC = () => {
  const [mediaItems, setMediaItems] = React.useState<Media[]>([]);
  const [models, setModels] = React.useState<Model[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchMediaItems();
    fetchModels();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await api.get('/media');
      setMediaItems(response.data);
    } catch (error) {
      console.error('Error fetching media items:', error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await api.get('/models'); // Replace with the correct endpoint
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/media/${id}`);
      setMediaItems(mediaItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting media item:', error);
    }
  };

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleSaveMedia = async (mediaData: Omit<Media, 'id'>) => {
    try {
      const response = await api.post('/media', mediaData);
      setMediaItems([...mediaItems, response.data]);
      handleCloseForm();
    } catch (error) {
      console.error('Error creating media item:', error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenForm} sx={{ mb: 2 }}>
        Add New Media
      </Button>

      <MediaForm
        open={open}
        handleClose={handleCloseForm}
        handleSave={handleSaveMedia}
        models={models}
      />

      {mediaItems.map(item => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.description || 'No Description'}</Typography>
            <Typography>URL: {item.url}</Typography>
            {item.price && <Typography>Price: ${item.price}</Typography>}
            {item.model && <Typography>Model: {item.model.name}</Typography>}
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(item.id)}
              sx={{ mt: 1 }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MediaList;
