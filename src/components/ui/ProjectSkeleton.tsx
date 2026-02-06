export default function ProjectSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="relative block rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-zinc-200/70 dark:bg-zinc-800/70" />
      </div>
      <div className="px-1 space-y-2">
        <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <div className="h-5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
