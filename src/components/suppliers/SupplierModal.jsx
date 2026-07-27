import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from '../common/Modal';

export const SupplierModal = () => {
  const { activeModal, modalData, closeModal, addSupplier, editSupplier } = useStore();

  const [name, setName] = useState('');
  const [fruit, setFruit] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const isOpen = activeModal === 'supplier';

  useEffect(() => {
    if (modalData) {
      setName(modalData.name || '');
      setFruit(modalData.fruit || '');
      setPhone(modalData.phone || '');
      setLocation(modalData.location || '');
    } else {
      setName('');
      setFruit('');
      setPhone('');
      setLocation('');
    }
  }, [modalData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data = { name: name.trim(), fruit: fruit.trim(), phone: phone.trim(), location: location.trim() };
    if (modalData && modalData.id) {
      editSupplier(modalData.id, data);
    } else {
      addSupplier(data);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={modalData ? "Editar Proveedor" : "Agregar Proveedor Mayorista"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Nombre o Empresa</label>
          <input
            type="text"
            required
            placeholder="Ej: Frutícola Los Andes"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Frutas Surtidas</label>
          <input
            type="text"
            required
            placeholder="Ej: Fresas, Cambures, Parchitas..."
            value={fruit}
            onChange={(e) => setFruit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Teléfono / WhatsApp</label>
          <input
            type="text"
            required
            placeholder="Ej: +58 412 5550199"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Ubicación / Mercado</label>
          <input
            type="text"
            placeholder="Ej: Mercado de Coche, Caracas"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-colors"
          >
            Guardar Proveedor
          </button>
        </div>
      </form>
    </Modal>
  );
};
