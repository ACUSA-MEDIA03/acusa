"use client";

interface PodcastCardProps {
  title: string;
  description: string;
  author?: string | null;
  date: string;
  audioSource: string;
}

const PodcastCard = ({ title, description, author, date, audioSource }: PodcastCardProps) => {
  return (
    <div className="lg:w-[70%] w-full p-4 border border-red-500 rounded-4xl flex space-x-5">
      {/* Icon / Avatar */}
      <div className="rounded-full border w-17.5 h-17.5 bg-red-500 grid place-content-center items-center">
        {/* optional podcast icon */}
      </div>

      {/* Audio Player */}
      <div className="basis-[90%] flex items-center">
        <audio
          src={audioSource}
          controls
          className="w-full border"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col space-y-2 basis-[90%]">
        <h2 className="font-rubik font-semibold text-lg">{title}</h2>
        <p className="font-rubik text-sm text-gray-600">{description}</p>
        {author && <p className="font-rubik text-sm text-gray-500">By {author}</p>}
        <p className="font-rubik text-sm text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default PodcastCard;
