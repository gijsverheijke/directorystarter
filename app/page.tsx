// hero
import { title } from "@/lib/keycopy";
import { h2 } from "@/lib/keycopy";
import SearchBar from "@/components/search/SearchBar";
import FAQ from "@/components/faq/Faq";
import HeroAnimation from "@/components/hero/HeroAnimation";

// listings
import { getAllListings } from "@/utils/supabase/queries";
import ListingCard from "@/components/listings/ListingCard";
import ListingsError from "@/components/error/ListingsError";


export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { listings, error } = await getAllListings();
  const sp = searchParams ? await searchParams : undefined
  const submitted = sp?.submitted === '1'
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
        
        {submitted && (
          <div className="bg-secondary text-secondary-foreground border rounded-md px-5 py-2 mb-10">
            Thanks! Your listing was submitted and is pending review.
          </div>
        )}
        
    {/*Main content area*/}
        {error ? (
          <ListingsError message={error} />
        ) : (
          <div className="listing-grid">
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing}
              />
            ))}
          </div>
        )}

    {/*FAQ section*/}
      <div className="section-spacing pt-20">
      <FAQ />
      </div>
      </main>
      
      
    </div>
  );
}
