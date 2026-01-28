"use client";

import Image from "next/image";

interface PublicationCardProps {
  header: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
}

export default function PublicationCard({
  header,
  date,
  description,
  author,
  image,
}: PublicationCardProps) {
  return (
    <div className="basis-[90%] flex lg:flex-row flex-col items-center border-b border-red-500">
      {/* Image */}
      {image && (
        <div className="basis-[40%] flex items-center justify-center">
          <Image
            src={image}
            alt={header}
            width={1260}
            height={750}
            className="object-contain w-full h-80"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`${
          image ? "basis-[60%]" : ""
        } flex flex-col justify-center p-4 space-y-5`}
      >
        <div>
          <h1 className="font-rubik font-bold text-[21px]">
            {header}
          </h1>
          <p className="font-grotesk tracking-[0.32px] text-[13px] text-red-500">
            {date}
            {author && ` || ${author}`}
          </p>
        </div>

        <p className="font-grotesk text-[14px] leading-6.5">
          {description}
        </p>
      </div>
    </div>
  );
}

