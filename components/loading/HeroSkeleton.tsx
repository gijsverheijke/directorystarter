import { Skeleton } from "../ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-secondary to-background">
      <div className="container-spacing">
        <div className="text-center">
          <Skeleton className="hero-text h-16 w-3/4 mx-auto mb-10" />
          <Skeleton className="h-8 w-1/2 mx-auto element-spacing" />
          <div className="max-w-xl mx-auto mt-20">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}