import ListingCardSkeleton from "./ListingCardSkeleton";

interface ListingGridSkeletonProps {
  count?: number;
}

export default function ListingGridSkeleton({ count = 6 }: ListingGridSkeletonProps) {
  return (
    <div className="listing-grid">
      {Array.from({ length: count }).map((_, index) => (
        <ListingCardSkeleton key={index} />
      ))}
    </div>
  );
}