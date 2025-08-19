"use client";
import React, { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus({ type: 'success', message: result.message });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus({ type: 'error', message: result.message });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Error al enviar el mensaje' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className="md:w-[700px] w-[100%] mt-5 p-4">
                <main className="flex flex-col gap-2">
                    <h1 className="text-xl font-medium before:content-['>'] before:mr-1">
                        Contactame
                    </h1>
                    <div className="p-1">
                        
                        
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div>
                                <div>
                                    <span className="uppercase text-sm text-base-content/80 font-bold">
                                        Nombre completo
                                    </span>
                                    <input
                                        className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-3">
                                    <span className="uppercase text-sm text-base-content/80 font-bold">
                                        Correo electrónico
                                    </span>
                                    <input
                                        className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-3">
                                    <span className="uppercase text-sm text-base-content/80 font-bold">
                                        Mensaje
                                    </span>
                                    <textarea
                                        className="w-full mt-1 p-3 rounded-lg focus:outline-none border border-base-content text-base-content/80 focus:shadow-outline"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="mt-2">
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="uppercase text-sm font-bold tracking-wide bg-base-content text-base-100 p-3 cursor-pointer hover:bg-base-content/95 rounded-lg w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                                    </button>
                                </div>
                               
                            </div>
                            {submitStatus && (
                            <div className={`p-3 rounded-lg mb-4 mt-5 ${
                                submitStatus.type === 'success' 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}