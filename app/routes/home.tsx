import SearchField from "@/components/widgets/search";
import { useSearch } from "~/context/SearchContext";
import { useNavigate } from "react-router";


export default function Home() {

  const { 
    query,
    setQuery,
    triggerSearch,
  } = useSearch();

  //handlers
  const navigate = useNavigate();
  const searchAndNavigate = async () => {
    triggerSearch()
    navigate("/search");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="heading-1 text-text-primary text-5xl md:text-7xl mb-6">
          Light up your <span className="text-primary italic">next</span> story
        </h1>
        <p className="text-text-secondary text-lg md:text-xl">
          Search through millions of books with LuminaBookie.
        </p>
      </div>
      <div className="md:min-w-2xl">
          <SearchField 
            query={query} 
            onChange={setQuery} 
            onSearch={searchAndNavigate} 
          />
      </div>
    </main>
  );
}
