"use client"

import { useState } from "react"
import Navbar from "../component/Navbar"
import Banner from "../component/Banner"
import { Categories, Publication } from "@/assets/data/Publication"
import PaginatedItems from "";


/* ---------------- Types ---------------- */

type CategoryType = {
  id: number;
  category: string;
};

type PublicationItem = {
  id: number;
  header: string;
  date: string;
  author?: string;
  description: string;
  image?: string;
};

type PublicationGroup = {
  id: number;
  category: string;
  publications: PublicationItem[];
};

/* ---------------- Component ---------------- */

const PublicationPage = () => {
  const [category, setCategory] = useState<string>("Articles");

  const publicationGroup = (Publication as PublicationGroup[]).filter(
    (item) => item.category === category
  );

  const publications: PublicationItem[] =
    publicationGroup.length > 0 ? publicationGroup[0].publications : [];

  return (
    <>
      <Navbar />

      {/* Banner */}
      <Banner
        header="Publications"
        description="News & Articles || Everything from articles to letters. All that you need to know happening around the ACU Space."
        image="/Banner/banner.jpg"
      />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row bg-white">
        {/* Categories */}
        <div className="basis-[20%] flex lg:flex-col lg:py17.5] lg:px-4 items-center lg:items-stretch gap-4 lg:gap-0 font-rubik">
          {(Categories as CategoryType[]).map((item) => (
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
          <PaginatedItems
            itemsPerPage={3}
            currentItems={publications}
            category={category}
          />
        </div>
      </div>
    </>
  );
};

export default PublicationPage;
