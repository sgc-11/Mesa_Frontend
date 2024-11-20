// src/components/MediaList.tsx

import React, { useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Media } from './types';
import api from '../../api';
import MediaForm from './Forms/MediaForm';

const MediaList: React.FC = () => {
  const [mediaItems, setMediaItems] = React.useState<Media[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await api.get('/media');
      setMediaItems(response.data);
    } catch (error) {
      console.error('Error fetching media items:', error);
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
      // Prepare data according to your API's expected format
      const dataToSend = {
        ...mediaData,
        modelId: mediaData.model?.id,
      };
      const response = await api.post('/media', dataToSend);
      setMediaItems([...mediaItems, response.data]);
      handleCloseForm();
    } catch (error) {
      console.error('Error creating media item:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenForm} sx={{ mb: 2 }}>
        Add New Media
      </Button>

      <MediaForm
        open={open}
        handleClose={handleCloseForm}
        handleSave={handleSaveMedia}
      />

      {mediaItems.map(item => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{item.description || 'No Description'}</Typography>
            <Typography variant="body2">URL: {item.url}</Typography>
            {item.price && <Typography variant="body2">Price: ${item.price}</Typography>}
            {item.model && <Typography variant="body2">Model: {item.model.name}</Typography>}
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
    </div>
  );
};

export default MediaList;
