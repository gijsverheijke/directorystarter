// hero
import { title } from "@/lib/keycopy";
import { h2 } from "@/lib/keycopy";
import SearchBar from "@/components/search/SearchBar";

// listings
import { mockListings } from "@/lib/mock-data";
import ListingCard from "@/components/listings/ListingCard";


export default function Home() {
    return (
    // Hero
    <div>
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="container-spacing">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-chart-1/25 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-chart-2/25 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/20 blur-2xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h1 className="heading-1 mb-5">{title}</h1>
            <h2 className="heading-2 element-spacing text-muted-foreground">{h2}</h2>
            <div className="max-w-xl mx-auto mt-20">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      <main className="container-spacing">
        
    {/*Main content area*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockListings.map((listing, index) => (
            <ListingCard 
              key={index} 
              listing={listing}
            />
          ))}
        </div>
      </main>
      
      
    </div>
  );
}
