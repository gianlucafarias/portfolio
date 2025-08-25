"use client";
import React, { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import ProjectSkeleton from "../components/ProjectSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const ProjectsClient = () => {
    const { messages } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="md:w-[700px] w-[100%] mt-5 p-4">
            <main className="flex flex-col gap-2">
                <h1 className="text-xl font-medium before:content-['>'] before:mr-1">
                    {messages?.isEnglish ? "All Projects" : "Todos los proyectos"}
                </h1>
                <div className="flex flex-col gap-2">
                    {!messages ? (
                        // Mostrar skeletons mientras cargan las traducciones
                        <>
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                        </>
                    ) : (
                        <>
                            {/* Proyectos destacados */}
                            {messages.projects?.pinProjects?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => openModal(item)}
                            className="group cursor-pointer p-4 border-2 border-base-content/20 hover:border-base-content/80 rounded-2xl transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <div className="flex flex-col gap-2 justify-between">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-lg">
                                        {item.title}
                                    </h2>
                                    <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        fill="currentColor"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                        className="transform transition-transform duration-300 group-hover:rotate-45 group-active:rotate-45"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 6L10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6z"></path>
                                    </svg>
                                </div>
                                
                                {/* Imagen del proyecto */}
                                {item.image && (
                                    <div className="w-full h-48 overflow-hidden rounded-lg">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={400}
                                            height={200}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                
                                <p className="text-base-content/80 text-sm sm:text-base">
                                    {item.shortDescription || item.description}
                                </p>
                                <div className="flex items-center flex-wrap gap-2 mt-1">
                                    {item.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs border-gray-400 font-medium text-base-content/70 border rounded-md px-4"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                            
                            {/* Otros proyectos */}
                            {messages.projects?.otherProjects?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => openModal(item)}
                            className="group cursor-pointer p-4 border-2 border-base-content/20 hover:border-base-content/80 rounded-2xl hover:scale-[1.02] transition-transform duration-200"
                        >
                            <div className="flex flex-col gap-2 justify-between">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-lg">
                                        {item.title}
                                    </h2>
                                    <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        fill="currentColor"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                        className="transform transition-transform duration-300 group-hover:rotate-45 group-active:rotate-45"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 6L10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6z"></path>
                                    </svg>
                                </div>
                                
                                {/* Imagen del proyecto */}
                                {item.image && (
                                    <div className="w-full h-48 overflow-hidden rounded-lg">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={400}
                                            height={200}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                
                                <p className="text-base-content/80 text-sm sm:text-base">
                                    {item.shortDescription || item.description}
                                </p>
                                <div className="flex items-center flex-wrap gap-2 mt-1">
                                    {item.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs border-gray-400 font-medium text-base-content/70 border rounded-md px-4"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                        </>
                    )}
                </div>
            </main>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default ProjectsClient;
