import React from "react";
import Image from "next/image";

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 border-2 border-base-content/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-6 ">
                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-base-content/60 hover:text-base-content transition-colors p-2 rounded-lg hover:bg-base-200"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - Project Image */}
                        <div className="lg:w-1/2">
                            {project.image ? (
                                <div className="border-2 border-base-content/20 rounded-2xl overflow-hidden bg-base-50">
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        width={500}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ) : (
                                <div className="border-2 border-base-content/20 rounded-2xl w-full h-80 flex items-center justify-center bg-base-200">
                                    <div className="text-center text-base-content/50">
                                        <svg
                                            className="w-16 h-16 mx-auto mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="text-sm">Sin imagen disponible</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right side - Project Details */}
                        <div className="lg:w-1/2 flex flex-col gap-6">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 before:content-['>'] before:mr-2">
                                    Descripción
                                </h3>
                                <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 before:content-['>'] before:mr-2">
                                    Tecnologías
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs border-gray-400 font-medium text-base-content/70 border rounded-md px-4 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                <button
                                    onClick={() => window.open(project.link, '_blank')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="uppercase text-sm font-bold tracking-wide bg-base-content text-base-100 p-3 cursor-pointer hover:bg-base-content/95 rounded-lg w-full focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    Ver Proyecto
                                </button>
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 border-2 border-base-content/20 text-base-content px-6 py-3 rounded-xl font-medium hover:border-base-content/80 hover:bg-base-200 transition-all duration-200 text-center flex items-center justify-center gap-2"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
