export default function ProjectSkeleton() {
  return (
    <div className="-mx-3 animate-pulse rounded-[20px] px-3 py-3">
      <div className="mb-3 aspect-video w-full rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70 xl:hidden" />
      <div className="space-y-2">
        <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-200/80 dark:bg-zinc-800/80" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
