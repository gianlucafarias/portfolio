"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
    const { messages } = useLanguage();
    
    return (
        <>
            <div className="flex flex-col gap-2 mt-10 scroll-mt-14" id="about">
                <h2 className="text-xl font-medium before:content-['>'] before:mr-1">
                    {messages?.nav?.about || "Sobre mí"}
                </h2>
                <div className="flex gap-2 flex-col">
                    <p className="text-base text-base-content/80">
                        {messages?.profile?.about || "Disfruto de crear soluciones útiles con tecnología y de aprender algo nuevo cada día. En el futuro, quiero aplicar inteligencia artificial y Machine Learning a mis proyectos."}
                    </p>
                    
                    <p className="text-base text-base-content/80">
                    {messages?.profile?.projectInvitation || "¿Tenés un proyecto en mente? enviame un"}{" "}
                        <a
                            href={`mailto:${messages?.profile?.email || 'palmiergianluca@gmail.com'}`}
                            className="font-bold hover:underline cursor-pointer"
                        >
                            {messages?.profile?.emailText || "Mail"}
                        </a>{" "}
                        {messages?.profile?.responseText || "y te respondo al toque."}
                    </p>
                    
                </div>
            </div>
        </>
    );
}
