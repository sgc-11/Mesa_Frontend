import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Grid } from '@mui/material';
import { DeleteIcon, EditIcon } from 'lucide-react';
import EventForm from './Forms/EventForm';
import api from '../../api';

interface MesaEvent {
  id: string;
  name: string;
  description: string;
  date: string; // ISO 8601 date string
  location: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<MesaEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MesaEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/event');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/event/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event: MesaEvent) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleSave = async (eventData: Omit<MesaEvent, 'id'>) => {
    try {
      if (selectedEvent) {
        await api.patch(`/event/${selectedEvent.id}`, eventData);
      } else {
        await api.post('/event', eventData);
      }
      fetchEvents();
      setIsFormOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Events
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => setIsFormOpen(true)}
            sx={{
              backgroundColor: '#bbdefb',
              color: '#1976d2',
              '&:hover': { backgroundColor: '#90caf9' },
            }}
          >
            +
          </IconButton>
        </Grid>
      </Grid>

      <List>
        {events.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              border: '1px solid #bbdefb',
              borderRadius: 2,
              marginBottom: 1,
              backgroundColor: '#fff',
            }}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  onClick={() => handleEdit(event)}
                  sx={{
                    color: '#1976d2',
                    marginRight: 1,
                    '&:hover': { color: '#1565c0' },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(event.id)}
                  sx={{
                    color: '#1976d2',
                    '&:hover': { color: '#1565c0' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={event.name}
              secondary={`${new Date(event.date).toLocaleString()} | ${event.location}`}
              sx={{ color: '#0d47a1' }}
            />
          </ListItem>
        ))}
      </List>

      <EventForm
        open={isFormOpen}
        initialData={selectedEvent || undefined}
        handleClose={() => {
          setIsFormOpen(false);
          setSelectedEvent(null);
        }}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default EventList;
