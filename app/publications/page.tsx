"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import PaginatedItems from "@/utils/Pagination";
import BannerImg from "@/assets/Banner/banner.jpg";
import Banner from "@/components/Banner";

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
  author?: string | null;
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
        (cat) => cat.category === category,
      );
      const apiCategory = selectedCategory?.apiValue || "";

      // Built the API URL with category filter
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

      const transformedPublications: PublicationItem[] = data.publications.map(
        (pub: {
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
        }),
      );

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
        {/* Categories - Mobile: Horizontal Scroll, Desktop: Sidebar */}
        <div className="lg:basis-[20%] w-full lg:w-auto">
          {/* Mobile: Horizontal scrollable */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-2 p-4 min-w-max font-rubik">
              {Categories.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                    item.category === category
                      ? "bg-main text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCategory(item.category)}
                >
                  {item.category}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Vertical sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:py-17.5 lg:px-4 font-rubik">
            {Categories.map((item) => (
              <button
                key={item.id}
                className={`pb-3 border-b text-left pl-2 cursor-pointer text-base transition-colors ${
                  item.category === category
                    ? "text-main font-semibold"
                    : "text-gray-700 hover:text-main"
                }`}
                onClick={() => setCategory(item.category)}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="lg:basis-[80%] w-full bg-[#F0EAEA] min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16 lg:py-20">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-main"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12 px-4">
              <p className="text-red-600 text-center text-sm sm:text-base">
                {error}
              </p>
            </div>
          ) : publications.length === 0 ? (
            <div className="flex items-center justify-center py-12 px-4">
              <p className="text-gray-600 text-center text-sm sm:text-base">
                No {category.toLowerCase()} available yet.
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 lg:p-8">
              <PaginatedItems
                itemsPerPage={3}
                currentItems={publications}
                category={category}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
