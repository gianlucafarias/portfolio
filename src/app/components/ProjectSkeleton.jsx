export default function ProjectSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="p-4 border-2 border-base-content/20 rounded-2xl">
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex items-center justify-between">
            {/* Título skeleton */}
            <div className="h-6 bg-base-content/20 rounded w-3/4"></div>
            {/* Icono skeleton */}
            <div className="h-4 w-4 bg-base-content/20 rounded"></div>
          </div>
          
          {/* Descripción skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-base-content/20 rounded w-full"></div>
            <div className="h-4 bg-base-content/20 rounded w-5/6"></div>
            <div className="h-4 bg-base-content/20 rounded w-4/6"></div>
          </div>
          
          {/* Tags skeleton */}
          <div className="flex items-center flex-wrap gap-2 mt-1">
            <div className="h-6 bg-base-content/20 rounded w-16"></div>
            <div className="h-6 bg-base-content/20 rounded w-20"></div>
            <div className="h-6 bg-base-content/20 rounded w-14"></div>
            <div className="h-6 bg-base-content/20 rounded w-18"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
