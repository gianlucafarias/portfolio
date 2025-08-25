"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import ProjectSkeleton from "./ProjectSkeleton";
import Image from "next/image";

export default function ProjectsList() {
    const { messages, isEnglish } = useLanguage();
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

    const getProjectsToShow = () => {
        if (!messages?.projects) return [];
        
        const pinnedProjects = messages.projects.pinProjects || [];
        const otherProjects = messages.projects.otherProjects || [];
        
        let projectsToShow = [...pinnedProjects];
        
        if (projectsToShow.length < 4) {
            const remainingCount = 4 - projectsToShow.length;
            const additionalProjects = otherProjects.slice(0, remainingCount);
            projectsToShow = [...projectsToShow, ...additionalProjects];
        }
        
        return projectsToShow.slice(0, 4);
    };

    const projectsToShow = getProjectsToShow();

    return (
        <div className="mt-10 scroll-mt-14 flex flex-col gap-2" id="projects">
            <div className="flex items-end justify-between">
                <h2 className="text-xl font-medium before:content-['>'] before:mr-1">
                    {messages?.nav?.projects || "Proyectos"}
                </h2>
                <Link href={isEnglish ? "/en/projects" : "/projects"} className="text-sm flex underline hover:text-base-content/80">
                    {messages?.sections?.viewAll || "Ver todos"}
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!messages ? (
                    // Mostrar skeletons mientras cargan las traducciones
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                ) : (
                    <>
                        {/* Mostrar 4 proyectos */}
                        {projectsToShow.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => openModal(item)}
                                className="group cursor-pointer p-4 border-2 border-base-content/20 hover:border-base-content/80 rounded-2xl transition-transform duration-200 hover:shadow-md hover:shadow-gray-200 hover:scale-[1.02]"
                            >
                                <div className="flex flex-col gap-2 justify-between h-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">
                                            {item.title}
                                        </h3>
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
                                    <div className="flex items-center flex-wrap gap-2 mt-auto">
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

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}
