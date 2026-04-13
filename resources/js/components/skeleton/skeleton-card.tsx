
export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden">

      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-gray-300 dark:bg-slate-700" />

      {/* Text */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-full" />
      </div>
    </div>
  );
}
