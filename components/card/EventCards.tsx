import { Clock, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/utlis/date";

interface EventCardsProps {
  id: string;
  startDateTime: string;
  location: string;
  title: string;
  description: string;
}

export default function EventCards({
  startDateTime,
  location,
  title,
  description,
}: EventCardsProps) {
  const { date, suffix, month, year, time } = formatEventDate(startDateTime);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Date Header Section */}
      <div className="bg-linear-to-r from-[#0C1657] to-[#0C1657]/90 text-white p-6">
        <div className="flex items-center gap-4">
          {/* Date Badge */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex-shrink-0 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-sub font-rubik">
                {date}
                <span className="text-xl align-super">{suffix}</span>
              </div>
              <div className="text-sm font-semibold text-blue-100 mt-1 font-rubik">
                {month} {year}
              </div>
            </div>
          </div>

          {/* Time and Location */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-blue-100">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-sub" />
              </div>
              <span className="text-sm font-medium font-mont">
                {time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-sub" />
              </div>
              <span className="text-sm font-medium font-[family-name:var(--font-mont)] line-clamp-1">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#0C1657] mb-3 line-clamp-2 group-hover:text-sub transition-colors duration-200 font-grotesk">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[#808080] text-sm leading-relaxed line-clamp-3 font-mont">
            {description}
          </p>
        )}

        {/* Divider */}
        {/* <div className="mt-4 pt-4 border-t border-slate-100"> */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#808080]">
              <Calendar className="w-4 h-4 text-sub" />
              <span className="font-medium">Event Details</span>
            </div>
            <div className="w-2 h-2 bg-sub rounded-full animate-pulse"></div>
          </div> */}
        {/* </div> */}
      </div>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1657]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>


  );
}