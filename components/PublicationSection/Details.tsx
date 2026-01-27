// import { ArrowRight } from "lucide-react";
// import Link from 'next/link'


// export default function Details() {
//     return (
//         <>
//               <div className="p-7.5 space-y-9">
//       {/*  */}
//       {/* Top */}
//       <div className="flex justify-between items-center ">
//         <Link
//           href={`/publication`}
//           className="flex items-center px-5 py-1.25 gap-2 text-white bg-[#0C1657] rounded-[5px]"
//         >
//           <ArrowRight /> Back
//         </Link>
//       </div>
//       {/* Top */}

//       {/*  */}

//       {/*  */}
//       <div className="space-y-3">
//         <div className="flex items-center justify-center flex-col">
//           <h2 className="font-rubik font-extrabold text-[30px] ">
//             APPOINTMENT AS ATTORNEY GENERAL OF ACUSA
//           </h2>
//           <p className="text-red-500 font-grotesk font-semibold">Written By: </p>
//         </div>

//         <div className="font-grotesk leading-7.5 space-y-4">
//           <p>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
//             harum quo iusto omnis temporibus aspernatur deserunt fugit tempora
      
//           </p>
//           <p>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
         
//           </p>
//           <p>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
         
//           </p>
//         </div>
//       </div>
//       {/*  */}
//     </div>
//         </>
//     )
// }






import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

// Publication type definition
interface Publication {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string | null;
  images: string[];
  fileUrl: string | null;
  audioUrl: string | null;
  tags: string[];
  author: string | null;
  duration: number | null;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface DetailsProps {
  publication: Publication;
}

export default function Details({ publication }: DetailsProps) {
  // Format the date
  const formattedDate = new Date(publication.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format duration for podcasts
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const isPodcast = publication.category === "PODCAST";

  return (
    <>
      <div className="p-7.5 space-y-9">
        {/* Top */}
        <div className="flex justify-between items-center">
          <Link
            href={`/publications`}
            className="flex items-center px-5 py-1.25 gap-2 text-white bg-[#0C1657] rounded-[5px]"
          >
            <ArrowRight /> Back
          </Link>
          
          {/* Meta Info */}
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{formattedDate}</span>
            {publication.duration && (
              <span>Duration: {formatDuration(publication.duration)}</span>
            )}
          </div>
        </div>
        {/* Top */}

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-center flex-col">
            <h2 className="font-rubik font-extrabold text-[30px]">
              {publication.title}
            </h2>
            
            {/* Author */}
            {(publication.author || publication.createdBy?.name) && (
              <p className="text-red-500 font-grotesk font-semibold">
                Written By: {publication.author || publication.createdBy?.name}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {publication.imageUrl && (
            <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden my-6">
              <Image
                src={publication.imageUrl}
                alt={publication.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {publication.description && (
            <div className="font-grotesk leading-7.5">
              <p className="text-lg font-semibold mb-4">{publication.description}</p>
            </div>
          )}

          {/* Audio Player for Podcasts */}
          {isPodcast && publication.audioUrl && (
            <div className="w-full max-w-4xl mx-auto my-6">
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Listen to this podcast:
                </p>
                <audio controls className="w-full">
                  <source src={publication.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          {/* Main Content */}
          {publication.content && (
            <div className="font-grotesk leading-7.5 space-y-4">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: publication.content }}
              />
            </div>
          )}

          {/* Additional Images Gallery */}
          {publication.images && publication.images.length > 0 && (
            <div className="my-8">
              <h3 className="text-2xl font-semibold mb-4 font-rubik">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publication.images.map((img, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border border-gray-200"
                  >
                    <Image
                      src={img}
                      alt={`${publication.title} - Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-grotesk"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}