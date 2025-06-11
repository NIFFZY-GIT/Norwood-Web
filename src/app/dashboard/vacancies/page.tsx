"use client";

import { useState, useEffect } from 'react';
import { Vacancy } from '@/lib/types';
import { Loader2, PlusCircle, ServerCrash } from 'lucide-react';

// --- CHECK 1: VERIFY THIS IMPORT ---
// It MUST be importing 'VacancyAdminCard'.
import VacancyAdminCard from '@/components/dashboard/VacancyAdminCard';
import VacancyFormModal from '@/components/dashboard/VacancyFormModal';

const ManageVacanciesPage = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

    const fetchVacancies = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/vacancies');
            if (!res.ok) throw new Error('Failed to fetch vacancies.');
            const data: Vacancy[] = await res.json();
            setVacancies(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const handleOpenModal = (vacancy: Vacancy | null = null) => {
        setEditingVacancy(vacancy);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingVacancy(null);
    };

    const handleSave = () => {
        handleCloseModal();
        fetchVacancies(); // Re-fetch the list to show changes
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vacancy?')) return;
        
        try {
            const res = await fetch(`/api/admin/vacancies/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete.');
            fetchVacancies(); // Refresh list
        } catch (err) {
            alert('Deletion failed.');
        }
    };

    return (
        <>
            {isModalOpen && (
                <VacancyFormModal
                    vacancy={editingVacancy}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
            <div className="p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manage Vacancies</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center justify-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <PlusCircle size={18} className="mr-2" />
                        Add Vacancy
                    </button>
                </div>

                {isLoading && <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-sky-500" size={48} /></div>}
                
                {error && (
                    <div className="text-center p-8 text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <ServerCrash size={48} className="mx-auto mb-4" />
                        <p>Error: {error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="grid grid-cols-1 gap-6">
                        {vacancies.length > 0 ? (
                            vacancies.map(vacancy => (
                                // --- CHECK 2: VERIFY THIS COMPONENT NAME ---
                                // The component name here MUST be 'VacancyAdminCard'.
                                <VacancyAdminCard 
                                    key={vacancy._id}
                                    vacancy={vacancy}
                                    onEdit={() => handleOpenModal(vacancy)}
                                    onDelete={() => handleDelete(vacancy._id)}
                                />
                            ))
                        ) : (
                            <p className="text-center py-10 text-slate-500 dark:text-slate-400">No vacancies have been created yet.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageVacanciesPage;