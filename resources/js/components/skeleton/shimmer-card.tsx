export default function ShimmerCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden">

      {/* Image shimmer */}
      <div className="aspect-video shimmer" />

      {/* Text shimmer */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-full rounded shimmer" />
      </div>
    </div>
  );
}
