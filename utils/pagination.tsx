
// "use client";

// import { useState } from "react";
// import ReactPaginate from "react-paginate";
// import PublicationCard from "@/components/Card/PublicationCard";
// import PodcastCard from "@/components/Card/PodcastCard";
// import Link from "next/link";

// export interface PublicationItem {
//   id: string; // Changed from number to string for API compatibility
//   header: string;
//   title: string;
//   date: string;
//   description: string;
//   author?: string;
//   image?: string;
//   audioSource?: string;
//   category: string; // Added category field
//   audioUrl?: string | null;
//   fileUrl?: string | null;
//   imageUrl?: string | null;
//   referenceNo?: string | null;
// }

// interface ItemsProps {
//   currentItems: PublicationItem[];
//   category: string;
// }

// interface PaginatedItemsProps {
//   itemsPerPage: number;
//   currentItems: PublicationItem[];
//   category: string;
// }

// /*  Items Component  */

// function Items({ currentItems, category }: ItemsProps) {
//   // Helper function to convert category to URL-friendly format
//   const getCategorySlug = (pub: PublicationItem) => {
//     return pub.category.toLowerCase().replace("_", "-");
//   };

//   return (
//     <div className="w-full space-y-4 flex flex-col justify-center items-center">
//       {currentItems.map((item) =>
//         category === "Podcasts" ? (
//           <Link
//             key={item.id}
//             href={`/publications/podcast/${item.id}`}
//             className="w-full"
//           >
//             <PodcastCard
//               audioSource={item.audioUrl || item.audioSource || ""}
//               title={item.header || item.title}
//               description={item.description}
//               author={item.author}
//               date={item.date}
//             />
//           </Link>
//         ) : (
//           <Link
//             key={item.id}
//             href={`/publications/${getCategorySlug(item)}/${item.id}`}
//             className="w-full"
//           >
//             <PublicationCard
//               header={item.header || item.title}
//               date={item.date}
//               description={item.description}
//               image={item.image || item.imageUrl || item.fileUrl || undefined}
//               author={item.author}
//             />
//           </Link>
//         )
//       )}
//     </div>
//   );
// }

// /*  Pagination Component  */

// export default function PaginatedItems({
//   itemsPerPage,
//   currentItems,
//   category,
// }: PaginatedItemsProps) {
//   const [itemOffset, setItemOffset] = useState<number>(0);

//   const endOffset = itemOffset + itemsPerPage;
//   const currentPageItems = currentItems.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(currentItems.length / itemsPerPage);

//   const handlePageClick = (event: { selected: number }) => {
//     const newOffset = (event.selected * itemsPerPage) % currentItems.length;
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center lg:px-12.5 px-2 py-12.5 h-125 overflow-auto no-scrollbar divide-y divide-yellow-950">
//         <Items currentItems={currentPageItems} category={category} />
//       </div>

//       {pageCount > 1 && (
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="Next >"
//           previousLabel="< Previous"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={5}
//           pageCount={pageCount}
//           containerClassName="flex items-center px-15 gap-4 py-5 font-grotesk text-[14px]"
//           pageClassName="flex items-center justify-center h-[25px] w-[25px] rounded-full"
//           pageLinkClassName="w-full h-full flex items-center border rounded-full justify-center cursor-pointer bg-[whitesmoke]"
//           activeClassName="text-[#0C1657]"
//           previousClassName="flex items-center justify-center rounded-md cursor-pointer"
//           nextClassName="flex items-center justify-center rounded-md cursor-pointer"
//           disabledClassName="opacity-50 cursor-not-allowed"
//           activeLinkClassName="font-bold"
//         />
//       )}
//     </>
//   );
// }

// export { Items };



"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";
import PublicationCard from "@/components/Card/PublicationCard";
import PodcastCard from "@/components/Card/PodcastCard";
import Link from "next/link";

export interface PublicationItem {
  id: string;
  header: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
  audioSource?: string;
  category: string;
  audioUrl?: string | null;
  fileUrl?: string | null;
  imageUrl?: string | null;
  referenceNo?: string | null;
}

interface ItemsProps {
  currentItems: PublicationItem[];
  category: string;
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  currentItems: PublicationItem[];
  category: string;
}

/*  Items Component  */

function Items({ currentItems, category }: ItemsProps) {
  // Helper function to convert category to URL-friendly format
  const getCategorySlug = (pub: PublicationItem) => {
    // Map database categories to URL slugs
    const categoryMap: { [key: string]: string } = {
      "ARTICLE": "article",
      "NEWSLETTER": "newsletter",
      "OFFICIAL_LETTER": "official-letter",
      "PODCAST": "podcast",
    };
    return categoryMap[pub.category] || pub.category.toLowerCase().replace("_", "-");
  };

  return (
    <div className="w-full space-y-4 flex flex-col justify-center items-center">
      {currentItems.map((item) =>
        category === "Podcasts" ? (
          <Link
            key={item.id}
            href={`/publications/${getCategorySlug(item)}/${item.id}`}
            className="w-full"
          >
            <PodcastCard 
              audioSource={item.audioUrl || item.audioSource || ""}
              title={item.header || item.title}
              description={item.description}
              author={item.author}
              date={item.date}
            />
          </Link>
        ) : (
          <Link
            key={item.id}
            href={`/publications/${getCategorySlug(item)}/${item.id}`}
            className="w-full"
          >
            <PublicationCard
              header={item.header || item.title}
              date={item.date}
              description={item.description}
              image={item.image || item.imageUrl || item.fileUrl || undefined}
              author={item.author}
            />
          </Link>
        )
      )}
    </div>
  );
}

/*  Pagination Component  */

export default function PaginatedItems({
  itemsPerPage,
  currentItems,
  category,
}: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState<number>(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentPageItems = currentItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col items-center lg:px-12.5 px-2 py-12.5 h-125 overflow-auto no-scrollbar divide-y divide-yellow-950">
        <Items currentItems={currentPageItems} category={category} />
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          previousLabel="< Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          containerClassName="flex items-center px-15 gap-4 py-5 font-grotesk text-[14px]"
          pageClassName="flex items-center justify-center h-[25px] w-[25px] rounded-full"
          pageLinkClassName="w-full h-full flex items-center border rounded-full justify-center cursor-pointer bg-[whitesmoke]"
          activeClassName="text-[#0C1657]"
          previousClassName="flex items-center justify-center rounded-md cursor-pointer"
          nextClassName="flex items-center justify-center rounded-md cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeLinkClassName="font-bold"
        />
      )}
    </>
  );
}

export { Items };