import { Metadata } from "next";
import { seo } from "@/data/constants";

export const metadata: Metadata = {
  title: `Blogs | ${seo.title}`,
  description: "Lee artículos, tutoriales e insights sobre desarrollo web, Next.js y programación.",
  keywords: "blog, web development, Next.js, programming, tutorials"
};

export default function BlogsPage() {
  return (
    <div className="md:w-[700px] w-[100%] mt-5 p-4">
      <main className="flex flex-col gap-2">
        <h1 className="text-xl font-medium before:content-['>'] before:mr-1">Blogs</h1>
      </main>
    </div>
  );
}
