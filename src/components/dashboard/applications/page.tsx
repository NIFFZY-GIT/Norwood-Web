"use client";

import { useState, useEffect } from "react";
import { Application } from "@/lib/types";
import { Loader2, ServerCrash, User, Download, Mail, Phone, Briefcase } from "lucide-react";

const ApplicationsPage = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            try {
                // Fetch from the admin-only endpoint
                const res = await fetch('/api/admin/applications');
                if (!res.ok) throw new Error('Failed to fetch applications');
                const data = await res.json();
                setApplications(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (isLoading) return <div className="flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900"><Loader2 className="animate-spin text-sky-500" size={48} /></div>;
    if (error) return <div className="text-center p-8 text-red-500"><ServerCrash size={48} className="mx-auto mb-4"/>Error: {error}</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-slate-100 dark:bg-slate-900 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Job Applications</h1>
            {applications.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No applications have been submitted yet.</p>
            ) : (
                <div className="space-y-4">
                    {applications.map(app => (
                        <div key={app._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-transparent hover:border-sky-500 transition-all">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center"><User className="mr-2 text-sky-500" size={20} />{app.fullName}</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center"><Briefcase className="mr-2" size={14}/>Applied for: <span className="font-medium ml-1">{app.vacancyTitle}</span></p>
                                    <p className="text-sm text-slate-400 mt-2">Submitted on: {new Date(app.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col sm:items-end gap-2 text-sm">
                                    <span className="flex items-center text-slate-600 dark:text-slate-300"><Mail className="mr-2" size={14}/>{app.email}</span>
                                    <span className="flex items-center text-slate-600 dark:text-slate-300"><Phone className="mr-2" size={14}/>{app.phone}</span>
                                </div>
                                <div className="flex-shrink-0 pt-4 sm:pt-0">
                                    <a
                                        href={`data:${app.cvMimeType};base64,${app.cvBase64}`}
                                        download={`CV-${app.fullName.replace(/\s/g, '_')}-${app.vacancyTitle.replace(/\s/g, '_')}.${app.cvMimeType.split('/')[1] === 'msword' ? 'doc' : 'pdf'}`}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                                    >
                                        <Download size={16} className="mr-2" />
                                        Download CV
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsPage;