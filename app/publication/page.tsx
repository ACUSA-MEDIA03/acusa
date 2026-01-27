"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import PaginatedItems from "@/utils/pagination";
import BannerImg from "@/assets/Banner/banner.jpg";

/*  Types  */
type CategoryType = {
  id: number;
  category: string;
  apiValue: string;
};

type PublicationItem = {
  id: string;
  header: string;
  title: string;
  date: string;
  author: string | null;
  description: string;
  content: string;
  category: string;
  image: string | null;
  staticImage: string;
  imageUrl: string | null;
  fileUrl: string | null;
  audioUrl: string | null;
  referenceNo: string | null;
  createdAt: string;
  createdBy?: {
    name: string;
  };
};

// Map your UI categories to API categories
const Categories: CategoryType[] = [
  { id: 1, category: "Articles", apiValue: "ARTICLE" },
  { id: 2, category: "Newsletters", apiValue: "NEWSLETTER" },
  { id: 3, category: "Official Letters", apiValue: "OFFICIAL_LETTER" },
  { id: 4, category: "Podcasts", apiValue: "PODCAST" },
];

export default function PublicationPage() {
  const [category, setCategory] = useState<string>("Articles");
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Find the API value for the selected category
      const selectedCategory = Categories.find(
        (cat) => cat.category === category
      );
      const apiCategory = selectedCategory?.apiValue || "";

      // Build the API URL with category filter
      const url = apiCategory
        ? `/api/publications?category=${apiCategory}&limit=100`
        : "/api/publications?limit=100";

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch publications");
      }

      const data = await res.json();
      
      // Transform API data to match your component's expected format
      const transformedPublications: PublicationItem[] = data.publications.map((pub: {
        id: string;
        title: string;
        description: string;
        content: string;
        category: string;
        imageUrl: string | null;
        fileUrl: string | null;
        audioUrl: string | null;
        author: string | null;
        referenceNo: string | null;
        createdAt: string;
        createdBy?: {
          name: string;
        };
      }) => ({
        id: pub.id,
        header: pub.title, // Map title to header for compatibility
        title: pub.title,
        date: new Date(pub.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        author: pub.author || pub.createdBy?.name || "ACUSA",
        description: pub.description || "",
        content: pub.content || "",
        category: pub.category,
        image: pub.imageUrl || pub.fileUrl,
        staticImage: pub.imageUrl || pub.fileUrl || "/placeholder.svg",
        imageUrl: pub.imageUrl,
        fileUrl: pub.fileUrl,
        audioUrl: pub.audioUrl,
        referenceNo: pub.referenceNo,
        createdAt: pub.createdAt,
        createdBy: pub.createdBy,
      }));

      setPublications(transformedPublications);
    } catch (err) {
      console.error("fetchPublications error:", err);
      setError("Failed to load publications. Please try again later.");
      setPublications([]);
    } finally {
      setLoading(false);
    }
  }, [category]); // Only category in dependencies

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]); // Now includes fetchPublications

  return (
    <>
      <Navbar />
      {/* Banner */}
      <Banner
        header="Publications"
        description="News & Articles || Everything from articles to letters. All that you need to know happening around the ACU Space."
        image={BannerImg}
      />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row bg-white">
        {/* Categories */}
        <div className="basis-[20%] flex lg:flex-col lg:py-17.5 lg:px-4 items-center lg:items-stretch gap-4 lg:gap-0 font-rubik">
          {Categories.map((item) => (
            <button
              key={item.id}
              className={`lg:pb-3 lg:border-b border-r border-l lg:border-r-0 lg:border-l-0 px-1 text-left lg:pl-2 cursor-pointer lg:text-[16px] text-[14px] ${
                item.category === category ? "text-main" : ""
              }`}
              onClick={() => setCategory(item.category)}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Publications */}
        <div className="basis-[80%] bg-[#F0EAEA]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : publications.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600">
                No {category.toLowerCase()} available yet.
              </p>
            </div>
          ) : (
            <PaginatedItems
              itemsPerPage={3}
              currentItems={publications}
              category={category}
            />
          )}
        </div>
      </div>
    </>
  );
}