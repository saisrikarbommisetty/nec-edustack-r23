export default function SkeletonCard({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-6 animate-pulse">
          <div className="h-4 bg-secondary rounded w-3/4 mb-3" />
          <div className="h-3 bg-secondary rounded w-1/2 mb-2" />
          <div className="h-3 bg-secondary rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
