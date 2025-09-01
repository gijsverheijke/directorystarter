// hero
import { title } from "@/lib/keycopy";
import { h2 } from "@/lib/keycopy";
import SearchBar from "@/components/search/SearchBar";

// listings
import { mockListings } from "@/lib/mock-data";
import ListingCard from "@/components/listings/ListingCard";


export default function Home() {
  return (
    <div>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="heading-1 mb-2">{title}</h1>
          <h2 className="heading-2 mb-6">{h2}</h2>
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing, index) => (
            <ListingCard 
              key={index} 
              listing={listing}
            />
          ))}
        </div>
      </main>
      
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">This is some text in the footer</p>
        </div>
      </footer>
    </div>
  );
}
