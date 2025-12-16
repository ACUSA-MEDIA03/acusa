
interface BannerProps {
  image: string;
  header: string;
  description: string;
}

export default function Banner({ image, header, description }: BannerProps): JSX.Element {
  return (
    <div
      className="lg:h-[50lvh] lg:p-0 px-1.25 bg-[#0C1657] text-white bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-[#0c165791] h-full flex lg:items-start items-center lg:justify-end justify-center flex-col lg:px-[90px] lg:py-[25px] py-[90px]">
        <h2 className="font-rubik font-bold text-[40px]">{header}</h2>
        <p className="font-grotesk tracking-[0.9px] lg:text-start text-center border lg:w-[50%]">
          {description}
        </p>
      </div>
    </div>
  );
};
