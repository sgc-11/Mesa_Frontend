import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { Media } from './types';
import api from '../../api';
import MediaForm from './Forms/MediaForm';

const MediaList: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchMediaItems = async () => {
    try {
      const response = await api.get('/media');
      setMediaItems(response.data);
    } catch (error) {
      console.error('Error fetching media items:', error);
    }
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/media/${id}`);
      setMediaItems(mediaItems.filter((media) => media.id !== id));
    } catch (error) {
      console.error('Error deleting media item:', error);
    }
  };

  const handleEdit = (media: Media) => {
    setSelectedMedia(media);
    setIsFormOpen(true);
  };

  const handleSave = async (mediaData: Omit<Media, 'id'>) => {
    try {
      if (selectedMedia) {
        // Update existing media
        await api.patch(`/media/${selectedMedia.id}`, mediaData);
      } else {
        // Create new media
        await api.post('/media', mediaData);
      }
      fetchMediaItems();
      setIsFormOpen(false);
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error saving media item:', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h6" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
            Media Items
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => setIsFormOpen(true)}
            sx={{
              backgroundColor: '#f8bbd0',
              color: '#d81b60',
              '&:hover': { backgroundColor: '#f48fb1' },
            }}
          >
            +
          </IconButton>
        </Grid>
      </Grid>

      <List>
        {mediaItems.map((media) => (
          <ListItem
            key={media.id}
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
                  onClick={() => handleEdit(media)}
                  sx={{
                    color: '#d81b60',
                    marginRight: 1,
                    '&:hover': { color: '#ad1457' },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(media.id)}
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
              primary={media.description || 'No Description'}
              secondary={`URL: ${media.url} ${
                media.price ? `| Price: $${media.price}` : ''
              } ${media.model ? `| Model: ${media.model.name}` : ''}`}
              sx={{ color: '#880e4f' }}
            />
          </ListItem>
        ))}
      </List>

      <MediaForm
        open={isFormOpen}
        initialData={selectedMedia || undefined}
        handleClose={() => {
          setIsFormOpen(false);
          setSelectedMedia(null);
        }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default MediaList;
