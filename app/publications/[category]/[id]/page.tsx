import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Details from "@/components/publicationsection/Details";
import Officialletter from "@/components/publicationsection/Officialletter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

// Fetch publication data
async function getPublication(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/publications/${id}`, { 
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching publication:", error);
    return null;
  }
}

// Helper to format category for display
function formatCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    "article": "Articles",
    "newsletter": "Newsletters",
    "official-letter": "Official Letters",
    "podcast": "Podcasts",
    "ARTICLE": "Articles",
    "NEWSLETTER": "Newsletters",
    "OFFICIAL_LETTER": "Official Letters",
    "PODCAST": "Podcasts",
  };
  return categoryMap[category] || category;
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  
  // Fetch the publication data
  const publication = await getPublication(id);

  // If publication not found, show 404
  if (!publication) {
    notFound();
  }

  const formattedCategory = formatCategory(category);
  const isOfficialLetter = publication.category === "OFFICIAL_LETTER";

  return (
    <>
      <Navbar />

      {/* TopNav */}
      <div className="px-22.5 h-[34lvh] py-4 bg-[#0C1657] flex items-start justify-end flex-col text-white">
        <h2 className="font-rubik font-bold text-[40px]">Publications</h2>
        <p className="font-grotesk tracking-[0.9px] flex items-center gap-2">
          <Link href="/publications" className="hover:underline">
            Publications
          </Link>{" "}
          <ArrowRight />
          <Link 
            href={`/publications?category=${publication.category}`} 
            className="hover:underline"
          >
            {formattedCategory}
          </Link>
          <ArrowRight />
          <span className="line-clamp-1">{publication.title}</span>
        </p>
      </div>

      {/* Content - Pass publication data to components */}
      {isOfficialLetter ? (
        <Officialletter publication={publication} />
      ) : (
        <Details publication={publication} />
      )}

      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const publication = await getPublication(id);

  if (!publication) {
    return {
      title: "Publication Not Found",
    };
  }

  return {
    title: `${publication.title} | ACUSA Publications`,
    description: publication.description || publication.title,
  };
}