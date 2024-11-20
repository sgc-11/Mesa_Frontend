// src/components/MemberList.tsx
import React, { useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Membership } from './types';
import api from '../../api';

const MemberList: React.FC = () => {
  const [memberships, setMemberships] = React.useState<Membership[]>([]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await api.get('/memberships');
      setMemberships(response.data);
    } catch (error) {
      console.error('Error al obtener las membresías:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/memberships/${id}`);
      setMemberships(memberships.filter(membership => membership.id !== id));
    } catch (error) {
      console.error('Error al eliminar la membresía:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Crear Nueva Membresía
      </Button>
      {memberships.map(membership => (
        <Card key={membership.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{membership.name}</Typography>
            <Typography variant="body2">Beneficios: {membership.benefits}</Typography>
            <Typography variant="body2">Precio: ${membership.price}</Typography>
            <Typography variant="body2">
              Activa: {membership.isActive ? 'Sí' : 'No'}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(membership.id)}
              sx={{ mt: 1 }}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MemberList;
