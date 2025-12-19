export interface ProfileCardProps {
  image: string;
  name: string;
  position: string;
}

export default function ProfileCard({ image, name, position }: ProfileCardProps) {
  return (
    <div
      className="rounded-[20px] relative lg:h-100 h-67.5 justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className="top-0 left-0 absolute h-full w-full p-2 flex items-end"
        style={{ background: `rgba(0,0,0,0.3)` }}
      >
        <div className="border flex items-center flex-col border-white w-full py-2.5 px-2.75 lg:py-3.75 lg:px-4 glassmorphism_white rounded-[7px] lg:rounded-bl-[13px] lg:rounded-tr-[13px] bottom-0">
          <b className="font-rubik text-main text-[16px] lg:text-[20px]">{name}</b>
          <p className="font-grotesk text-black text-[8px] lg:text-[15px]">{position}</p>
        </div>
      </div>
    </div>
  );
}
