export default function ProjectsLayout({ children }) {
  return (
    <div className="w-screen max-w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
