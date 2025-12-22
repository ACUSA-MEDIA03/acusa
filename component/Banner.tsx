import Image from "next/image";

interface BannerProps {
  image: string;
  header: string;
  description: string;
}

export default function Banner({ image, header, description }: BannerProps) {
  return (
    <section className="relative h-[40vh] lg:h-[50vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={header}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0C1657]/70 flex items-center">
        <div className="px-6 lg:px-16 max-w-4xl space-y-4 text-white">
          <h1 className="text-3xl lg:text-5xl font-bold">
            {header}
          </h1>
          <p className="text-sm lg:text-base text-[#D3AE1A]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
