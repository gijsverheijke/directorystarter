import ListingCardSkeleton from "./ListingCardSkeleton";

interface ListingGridSkeletonProps {
  count?: number;
}

export default function ListingGridSkeleton({ count = 6 }: ListingGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <ListingCardSkeleton key={index} />
      ))}
    </div>
  );
}