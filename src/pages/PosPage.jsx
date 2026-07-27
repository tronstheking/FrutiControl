import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

// The POS route simply opens the modal and redirects back to home.
// The real POS experience is handled by PosTerminalModal.
export const PosPage = () => {
  const openModal = useStore(state => state.openModal);
  const navigate = useNavigate();

  useEffect(() => {
    openModal('pos');
    navigate('/', { replace: true });
  }, [openModal, navigate]);

  return null;
};
