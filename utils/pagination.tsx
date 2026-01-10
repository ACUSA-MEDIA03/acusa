"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";
import PublicationCard from "@/components/Card/PublicationCard";
import PodcastCard from "@/components/Card/PodcastCard";
import Link from "next/link";

export interface PublicationItem {
  id: number;
  header: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
   audioSource?: string;
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
  return (
    <div className="w-full space-y-4 flex flex-col justify-center items-center">
      {currentItems.map((item) =>
        category === "Podcasts" ? (
          <PodcastCard key={item.id} audioSource={item.audioSource!}/>
        ) : (
          <Link
            key={item.id}
            href={`/publication/${category}/${item.id}`}
            className="w-full"
          >
            <PublicationCard
              header={item.header}
              date={item.date}
              description={item.description}
              image={item.image}
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
    const newOffset =
      (event.selected * itemsPerPage) % currentItems.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col items-center lg:px-12.5 px-2 py-12.5 h-125 overflow-auto no-scrollbar divide-y divide-yellow-950">
        <Items currentItems={currentPageItems} category={category} />
      </div>

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
    </>
  );
}

export { Items };
