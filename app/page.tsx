// hero
import { title } from "@/lib/keycopy";
import { h2 } from "@/lib/keycopy";
import SearchBar from "@/components/search/SearchBar";
import FAQ from "@/components/faq/Faq";
import HeroAnimation from "@/components/hero/HeroAnimation";

// listings
import { mockListings } from "@/lib/mock-data";
import ListingCard from "@/components/listings/ListingCard";


export default function Home() {
    return (
    // Hero
    <div>
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="container-spacing">
          <HeroAnimation>
            <h1 className="hero-text mb-10">{title}</h1>
            <h2 className="heading-2 element-spacing text-muted-foreground">{h2}</h2>
            <div className="max-w-xl mx-auto mt-20">
              <SearchBar />
            </div>
          </HeroAnimation>
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

    {/*FAQ section*/}
      <div className="section-spacing pt-20">
      <FAQ />
      </div>
      </main>
      
      
    </div>
  );
}
