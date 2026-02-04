import React from "react";
import { blogs, seo } from "@/data/constants";
import Link from "next/link";

export const metadata = {
    title: `Blogs | ${seo.title}`,
    description: "Lee artículos, tutoriales e insights sobre desarrollo web, Next.js y programación.",
    keywords: "blog, web development, Next.js, programming, tutorials"
};

function page() {
    return (
        <div className="md:w-[700px] w-[100%] mt-5 p-4">
            <main className="flex flex-col gap-2">
                <h1 className="text-xl font-medium before:content-['>'] before:mr-1">Blogs</h1>
               
            </main>
        </div>
    );
}

export default page;
