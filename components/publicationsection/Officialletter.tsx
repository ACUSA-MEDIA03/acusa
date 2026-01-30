import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

// Publication type definition
interface Publication {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl: string | null;
  fileUrl: string | null;
  referenceNo: string | null;
  fileSize: number | null;
  author: string | null;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface OfficialLetterProps {
  publication: Publication;
}

export default function OfficialLetter({ publication }: OfficialLetterProps) {
  // Format the date
  const formattedDate = new Date(publication.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Format file size
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return null;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <>
     <div className="p-4 sm:p-6 md:p-7.5 space-y-6 sm:space-y-9">
  {/* Header Section */}
  <div className="space-y-4 sm:space-y-5 font-grotesk">
    {/* Top Bar */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
      <Link
        href={`/publications`}
        className="flex items-center px-4 sm:px-5 py-1.25 gap-2 text-white bg-[#0C1657] rounded-[5px] text-sm sm:text-base"
      >
        <BiArrowBack className="w-4 h-4 sm:w-5 sm:h-5" /> Back
      </Link>
      {publication.referenceNo && (
        <p className="font-medium text-[#0C1657] text-sm sm:text-base break-all">
          Ref: {publication.referenceNo}
        </p>
      )}
    </div>

    {/* Date and Author Info */}
    <div className="space-y-1.5 sm:space-y-2">
      <p className="text-xs sm:text-sm text-gray-600">{formattedDate}</p>
      {publication.author && (
        <p className="text-xs sm:text-sm text-gray-600">
          Published by: {publication.author}
        </p>
      )}
      {!publication.author && publication.createdBy?.name && (
        <p className="text-xs sm:text-sm text-gray-600">
          Published by: {publication.createdBy.name}
        </p>
      )}
      {publication.fileSize && (
        <p className="text-xs sm:text-sm text-gray-600">
          File Size: {formatFileSize(publication.fileSize)}
        </p>
      )}
    </div>
  </div>

  {/* Title */}
  <div className="space-y-3 sm:space-y-4 px-2">
    <h2 className="font-rubik font-extrabold text-xl sm:text-2xl md:text-[30px] text-center leading-tight">
      {publication.title}
    </h2>

    {/* Description */}
    {publication.description && (
      <div className="font-grotesk leading-6 sm:leading-7.5">
        <p className="text-base sm:text-lg text-gray-700 text-center">
          {publication.description}
        </p>
      </div>
    )}
  </div>

  {/* Document Display */}
  {publication.fileUrl && (
    <div className="w-full max-w-4xl mx-auto">
      {/* Check if it's an image */}
      {publication.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
        <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={publication.fileUrl}
            alt={publication.title}
            width={800}
            height={1000}
            className="w-full h-auto"
            priority
          />
        </div>
      ) : (
        // PDF or other document
        <div className="space-y-3 sm:space-y-4">
          <iframe
            src={publication.fileUrl}
            className="w-full h-[60vh] sm:h-[70vh] md:h-200 border rounded-lg"
            title={publication.title}
          />
          <div className="text-center">
            <a
              href={publication.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0C1657] text-white rounded-lg hover:bg-[#0C1657]/90 transition text-sm sm:text-base"
            >
              Download Document
            </a>
          </div>
        </div>
      )}
    </div>
  )}

  {/* Alternative: Display imageUrl if fileUrl is not available */}
  {!publication.fileUrl && publication.imageUrl && (
    <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={publication.imageUrl}
        alt={publication.title}
        width={800}
        height={1000}
        className="w-full h-auto"
        priority
      />
    </div>
  )}

  {/* Content (if any) */}
  {publication.content && (
    <div className="font-grotesk leading-6 sm:leading-7.5 space-y-4 max-w-4xl mx-auto">
      <div
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: publication.content }}
      />
    </div>
  )}
</div>
    </>
  );
}