"use client";

import { useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
/* TYPES */

interface EventImage {
  id: string;
  url: string;
  alt: string;
}

interface Event {
  id: string;
  title: string;
  category: string;
  images: EventImage[];
}

interface Category {
  id: string;
  name: string;
  images: EventImage[];
}

/* COMPONENTS  */

const ImageCarousel: React.FC<{ images: EventImage[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative h-64 overflow-hidden">
      <Image
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        fill
        className="object-cover"
      />

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-main/50 text-sub px-3 py-1 rounded"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-main/50 text-sub px-3 py-1 rounded"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <ImageCarousel images={event.images} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {event.title}
        </h3>
        <p className="text-sm text-gray-500">{event.category}</p>
      </div>
    </div>
  );
};

/*  PAGE */

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const heroImages: EventImage[] = [
    { id: "hero-1", url: "/Gallery/fc1.jpeg", alt: "Freshers Conference" },
    { id: "hero-2", url: "/Gallery/9.jpg", alt: "Conference" },
    { id: "hero-3", url: "/Gallery/11.jpg", alt: "Conference" },
  ];

  const events: Event[] = [
    {
      id: "1",
      title: "Freshers Conference 2026",
      category: "Conference",
      images: [
        { id: "img1", url: "/Gallery/fc1.jpeg", alt: "FC 1" },
        { id: "img2", url: "/Gallery/cm4.jpeg", alt: "FC 2" },
      ],
    },
    {
      id: "2",
      title: "ACUSA Outreach Program",
      category: "Community",
      images: [
        { id: "img3", url: "/Gallery/9.jpg", alt: "Outreach 1" },
        { id: "img4", url: "/Gallery/cm1.jpeg", alt: "Outreach 2" },
      ],
    },
  ];

  const categories: Category[] = [
    {
      id: "cat-1",
      name: "Social Events",
      images: [
        { id: "1", url: "/Gallery/fc1.jpeg", alt: "Social 1" },
        { id: "2", url: "/Gallery/fc1.jpeg", alt: "Social 2" },
      ],
    },
    {
      id: "cat-2",
      name: "Community",
      images: [
        { id: "3", url: "/Gallery/cm1.jpeg", alt: "Community 1" },
        { id: "4", url: "/Gallery/cm4.jpeg", alt: "Community 2" },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* HERO */}
            <section className="relative min-h-screen overflow-hidden bg-main ">
          <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10 mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              
              {/* LEFT CONTENT */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-grotesk text-white leading-tight">
                  ACUSA Gallery
                </h1>
                <p className="text-xl text-sub max-w-xl leading-relaxed font-mont">
                  Explore our memorable moments as a community — events, activities,
                  and achievements that define our vibrant campus life.
                </p>
              </div>

              {/* RIGHT IMAGE GRID */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* IMAGE 1 */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={heroImages[0].url}
                    alt={heroImages[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>

                {/* IMAGE 2 */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={heroImages[1].url}
                    alt={heroImages[1].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* IMAGE 3 */}
                <div className="relative col-span-2 h-80 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={heroImages[2].url}
                    alt={heroImages[2].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-5xl font-grotesk text-center mb-12 text-main">
              EVENTS HIGHLIGHTS
             
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <div className="flex justify-center gap-4 flex-wrap mb-12">
              {["All", "Social Events", "Formal Events", "Community"].map(
                (cat) => (
                  <Button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? "bg-main text-white"
                        : "bg-gray-200 text-par"
                    }
                  >
                    {cat}
                  </Button>
                )
              )}
            </div>

            {categories
              .filter(
                (cat) =>
                  selectedCategory === "All" ||
                  cat.name === selectedCategory
              )
              .map((category) => (
                <div key={category.id} className="mb-16">
                  <h3 className="text-3xl font-bold mb-6">
                    {category.name}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.images.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-4/3 overflow-hidden rounded-xl"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
