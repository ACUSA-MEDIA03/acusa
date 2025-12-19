// import { Clock12, MapPin} from "lucide-react"
// export default function EventCards(e)  {
//   return (
//     <>
//       <div className="lg:flex grid lg:divide-x lg:p-2 p-4 divide-[#ebebebb8] drop-shadow-lg  bg-white text-main rounded-[15px] ">
//         <div className="basis-[30%]  lg:p-5 lg:grid flex gap-3 items-center lg:place-content-center lg:items-center">
//           <b className="font-rubik font-extrabold lg:text-4xl text-[27px]">
//             {e.date}
//             <span className="lg:text-[25px] text-[20px] font-normal">
//               {e.suffix}
//             </span>{" "}
//           </b>
//           <p className="font-rubik font-semibold lg:text-[17px] text-[13px]">
//             {e.month}, {e.year}
//           </p>
//         </div>

//         <div className="basis-[70%] flex flex-col justify-center lg:p-5 pt-3 gap-y-3">
//           <div className="flex justify-start gap-4 font-rubik">
//             <p className="flex items-center gap-1">
//               <Clock12 />
//               {e.time}
//             </p>
//             <p className="flex items-center gap-1">
//               <MapPin />
//               {e.location}
//             </p>
//           </div>

//           <p className="font-rubik font-bold lg:text-[30px]">{e.eventTitle}</p>
//         </div>
//       </div>
//     </>
//   );
// };


import { Clock12, MapPin } from "lucide-react"

interface EventCardsProps {
  date: string | number;
  suffix: string;
  month: string;
  year: string | number;
  time: string;
  location: string;
  eventTitle: string;
}

export default function EventCards({ 
  date, 
  suffix, 
  month, 
  year, 
  time, 
  location, 
  eventTitle 
}: EventCardsProps) {
  return (
    <>
      <div className="lg:flex grid lg:divide-x lg:p-2 p-4 divide-[#ebebebb8] drop-shadow-lg bg-white text-main rounded-[15px]">
        <div className="basis-[30%] lg:p-5 lg:grid flex gap-3 items-center lg:place-content-center lg:items-center">
          <b className="font-rubik font-extrabold lg:text-4xl text-[27px]">
            {date}
            <span className="lg:text-[25px] text-[20px] font-normal">
              {suffix}
            </span>{" "}
          </b>
          <p className="font-rubik font-semibold lg:text-[17px] text-[13px]">
            {month}, {year}
          </p>
        </div>

        <div className="basis-[70%] flex flex-col justify-center lg:p-5 pt-3 gap-y-3">
          <div className="flex justify-start gap-4 font-rubik">
            <p className="flex items-center gap-1">
              <Clock12 />
              {time}
            </p>
            <p className="flex items-center gap-1">
              <MapPin />
              {location}
            </p>
          </div>

          <p className="font-rubik font-bold lg:text-[30px]">{eventTitle}</p>
        </div>
      </div>
    </>
  );
}