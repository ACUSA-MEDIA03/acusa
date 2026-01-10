"use client";

interface PodcastCardProps {
  audioSource: string;
}

const PodcastCard = ({ audioSource }: PodcastCardProps) => {
  return (
    <div className="lg:w-[70%] w-full p-4 border border-red-500 rounded-[20px] flex space-x-5">
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
    </div>
  );
};

export default PodcastCard;
