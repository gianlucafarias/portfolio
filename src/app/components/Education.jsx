"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Education() {
    const { messages } = useLanguage();
    
    return (
        <>
            <div className="mt-10 scroll-mt-14" id="education">
                <h2 className="text-xl font-medium before:content-['>'] before:mr-1">
                    {messages?.sections?.education || "Educación & Certificaciones"}
                </h2>
                <div className="mt-6">
                    <ol className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-gray-500 mt-4 p-2">
                        {messages?.education?.map((item, index) => (
                            <li
                                key={index}
                                className="relative -ms-1.5 flex items-start gap-4"
                            >
                                <span className="size-3 shrink-0 rounded-full bg-base-content"></span>

                                <div className="-mt-2">
                                    <time className="text-xs font-medium text-base-content/80">
                                        {item.date}
                                    </time>
                                    <h3 className="text-lg font-semibold text-base-content">
                                        {item.title}
                                    </h3>
                                    <p className="mt-0.5 text-sm text-base-content/80">
                                        {item.institution}
                                    </p>
                                </div>
                            </li>
                        )) || []}
                    </ol>
                </div>
            </div>
        </>
    );
}
