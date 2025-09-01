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
      <main className="container-spacing">
        <div className="section-spacing">
          <h1 className="heading-1 mb-2">{title}</h1>
          <h2 className="heading-2 element-spacing">{h2}</h2>
          <SearchBar />
        </div>
        
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
