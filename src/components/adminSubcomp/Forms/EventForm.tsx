import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EventFormProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (event: Omit<MesaEvent, 'id'>) => void;
  initialData?: MesaEvent;
}

interface MesaEvent {
  name: string;
  description: string;
  date: string; // ISO 8601 date string
  location: string;
  participants?: string[];
}

const EventForm: React.FC<EventFormProps> = ({ open, handleClose, handleSave, initialData }) => {
  const [formData, setFormData] = useState<MesaEvent>({
    name: '',
    description: '',
    date: '',
    location: '',
    participants: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        description: '',
        date: '',
        location: '',
        participants: [],
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        {initialData ? 'Edit Event' : 'Add New Event'}
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
          label="Date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="dense"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1976d2' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
