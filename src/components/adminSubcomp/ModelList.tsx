// ModelList.tsx
import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  Collapse,
} from '@mui/material';
import { DeleteIcon, EditIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Model } from './types';
import ModelForm from './Forms/ModelForm';
import api from '../../api';

const ModelList: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchModels = async () => {
    try {
      const response = await api.get('/models');
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/models/${id}`);
      setModels(models.filter((model) => model.id !== id));
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  const handleEdit = (model: Model) => {
    setSelectedModel(model);
    setIsFormOpen(true);
  };

  const handleSave = async (modelData: Omit<Model, 'id' | 'photos' | 'events'>) => {
    try {
      if (selectedModel) {
        await api.patch(`/models/${selectedModel.id}`, modelData);
      } else {
        await api.post('/models', modelData);
      }
      fetchModels();
      setIsFormOpen(false);
      setSelectedModel(null);
    } catch (error) {
      console.error('Error saving model:', error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h6" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
            Models
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
        {models.map((model) => (
          <Box key={model.id} sx={{ mb: 2 }}>
            <ListItem
              sx={{
                border: '1px solid #f8bbd0',
                borderRadius: 2,
                backgroundColor: '#fff',
              }}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    onClick={() => handleEdit(model)}
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
                    onClick={() => handleDelete(model.id)}
                    sx={{
                      color: '#d81b60',
                      '&:hover': { color: '#ad1457' }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => toggleExpand(model.id)}
                    sx={{ color: '#d81b60' }}
                  >
                    {expandedId === model.id ? <ChevronUp /> : <ChevronDown />}
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={model.name}
                secondary={`${model.email} ${model.phone ? `| ${model.phone}` : ''}`}
                sx={{ color: '#880e4f' }}
              />
            </ListItem>
            <Collapse in={expandedId === model.id}>
              <Box sx={{ 
                p: 2, 
                ml: 2, 
                border: '1px solid #f8bbd0', 
                borderTop: 0,
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2,
                backgroundColor: '#fff5f7'
              }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Bio:</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{model.bio || 'No bio available'}</Typography>
                
                {model.events && model.events.length > 0 && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Events:</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {model.events.map(event => (
                        <Chip
                          key={event.id}
                          label={event.name}
                          size="small"
                          sx={{ backgroundColor: '#f8bbd0' }}
                        />
                      ))}
                    </Box>
                  </>
                )}
                
                {model.photos && model.photos.length > 0 && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Photos:</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {model.photos.map(photo => (
                        <Chip
                          key={photo.id}
                          label={photo.description}
                          size="small"
                          sx={{ backgroundColor: '#f8bbd0' }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>

      <ModelForm
        open={isFormOpen}
        initialData={selectedModel || undefined}
        handleClose={() => {
          setIsFormOpen(false);
          setSelectedModel(null);
        }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default ModelList;