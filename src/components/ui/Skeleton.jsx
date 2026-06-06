import PropTypes from "prop-types";
import { cn } from "../../lib/cn";

export const Skeleton = ({ className = "" }) => (
  <div className={cn("animate-pulse rounded bg-white/10", className)} />
);

Skeleton.propTypes = {
  className: PropTypes.string,
};

export const SkeletonCard = ({ className = "" }) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4",
      className,
    )}
  >
    <Skeleton className="aspect-video w-full rounded-lg" />
    <Skeleton className="mt-4 h-5 w-2/3" />
    <Skeleton className="mt-3 h-4 w-full" />
    <Skeleton className="mt-2 h-4 w-5/6" />
    <div className="mt-4 flex gap-2">
      <Skeleton className="h-7 w-20 rounded-full" />
      <Skeleton className="h-7 w-24 rounded-full" />
    </div>
  </div>
);

SkeletonCard.propTypes = {
  className: PropTypes.string,
};
