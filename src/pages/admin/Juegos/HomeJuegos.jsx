// src/pages/user/Home.jsx
import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import { homeData } from './data/homeData';
import JuegosService from '../../../services/JuegosService';
import { generarMensaje } from '../../../utils/GenerarMensaje';

const createInputs = [
  { name: "nombre", type: "text", placeholder: "Nombre", required: true },
  { name: "descripcion", type: "textarea", placeholder: "Descripción", required: true, className: "h-28" },
  { name: "logo", type: "file" },
];

function Home() {
    const [pageData, setPageData] = useState(homeData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingJuego, setEditingJuego] = useState(null);
 
    useEffect(() => {
        const loadData = async () => {
            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "juegos");

            if (tableItem) {
                try {
                    setLoading(true);
                    const data = await JuegosService.getAllJuegos();
                    const dataWithActions = data.map(juego => ({
                        ...juego,
                        onEdit: () => handleOpenEdit(juego),
                        onDelete: () => handleDelete(juego.id),
                    }));
                    tableItem.data = dataWithActions;
                } catch (error) {
                    generarMensaje('No se pudieron cargar los juegos', 'warning');
                    tableItem.data = [{ id: "Error", nombre: "No se pudieron cargar", descripcion: "Revisa tu conexión" }];
                } finally {
                    setLoading(false);
                }
            }
            setPageData(updatedData);
        };

        loadData();
    }, []);

    const handleOpenEdit = (juego) => {
        setEditingJuego(juego);
        setIsModalOpen(true);
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            if (editingJuego) {
                await JuegosService.updateFaccion(editingJuego.id, formData);
                generarMensaje('Juego actualizado con éxito!', 'success');
            } else {
                await JuegosService.createFaccion(formData);
                generarMensaje('Juego creado con éxito!', 'success');
            }
            const data = await JuegosService.getAllFacciones();
            const dataWithActions = data.map(faccion => ({
                ...faccion,
                onEdit: () => handleOpenEdit(faccion),
                onDelete: () => handleDelete(faccion.id),
            }));

            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "juegos");
            tableItem.data = dataWithActions;
            setPageData(updatedData);

            setIsModalOpen(false);
            setEditingJuego(null);
        } catch (error) {
            generarMensaje('Error al guardar el juego', 'warning');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este juego?')) return;

        try {
            await JuegosService.deleteFaccion(id);
            generarMensaje('Juego eliminado con éxito!', 'success');

            const data = await JuegosService.getAllJuegos();
            const dataWithActions = data.map(juego => ({
                ...juego,
                onEdit: () => handleOpenEdit(juego),
                onDelete: () => handleDelete(juego.id),
            }));

            const updatedData = [...pageData];
            const tableItem = updatedData.find(i => i.service === "juegos");
            tableItem.data = dataWithActions;
            setPageData(updatedData);
        } catch (error) {
            generarMensaje('Error al eliminar el juego', 'warning');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            <div className="container py-6 flex justify-end">
                <Button
                    text="Crear Facción"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                />
            </div>

            <Section content={pageData} className="container" />

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                setIsModalOpen(false);
                setEditingJuego(null);
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingJuego ? "Editar Juego" : "Crear Nueva Juego"}
                submitText={editingJuego ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingJuego || {}}
            />
        </div>
    );
}

export default Home;