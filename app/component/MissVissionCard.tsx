export interface MissVisionProps{
    header: string;
    description: string;
}
export default function MissVisionCard({  header, description }: MissVisionProps): JSX.Element {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex  flex-col space-y-4 text-center lg:text-start">
      <h4 className="text-main text-[20px] font-rubik-dirt lg:text-[36px] font-normal">
       {header}
      </h4>
      <p className="text-[#aaaaaa] text-center lg:text-start leading-6.75 font-light text-[16px] font-rubik ">
        {description}
      </p>
    </div>
)
}   

