import { Clock12, MapPin, Calendar } from "lucide-react";
import { formatEventDate } from "@/lib/utlis/date";
import { Card, CardContent } from "../ui/card";
import { ReactNode } from "react";

interface EventCardProps {
  id: string;
  startDateTime: string;
  location: string;
  title: string;
  description: string;
  published: boolean;
  createdBy: {
    name: string;
    email: string;
  };
  actions?: ReactNode;
}

export default function EventCard({
  startDateTime,
  location,
  title,
  description,
  published,
  createdBy,
  actions,
}: EventCardProps) {
  const { date, suffix, month, year, time } =
    formatEventDate(startDateTime);

  return (
    <Card className="border border-border/60 shadow-sm hover:shadow-md transition">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-3 font-mono">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Calendar className="h-5 w-5 text-main" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-sub">
                    {title}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="flex items-center gap-1 text-sm text-main">
                  <Clock12 className="h-4 w-4" />
                  {time} • {date}
                  {suffix} {month} {year}
                </p>

                <p className="text-xs text-black">
                  Created by{" "}
                  <span className="font-mediu-main">
                    {createdBy.name}
                  </span>
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm leading-relaxed text-main">
              {description}
            </p>

            {/* LOCATION */}
            <p className="flex items-center gap-1 text-sm text-main">
              <MapPin className="h-4 w-4" />
              {location}
            </p>
          </div>

          {/* ACTIONS */}
          {actions && (
            <div className="flex shrink-0 gap-2">
              {actions}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
