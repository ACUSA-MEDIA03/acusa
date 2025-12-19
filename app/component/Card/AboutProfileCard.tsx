import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  image: string;
  name: string;
  position: string;
  fullImage?: string;
  tag?: string;
  department?: string;
  faculty?: string;
  level?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export default function ProfileCard({
  image,
  name,
  position,
  fullImage,
  tag,
  department,
  faculty,
  level,
  email,
  phone,
  facebook,
  x,
  instagram,
  linkedin,
}: ProfileCardProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const openModal = (): void => setIsModalOpen(true);
    const closeModal = (): void => setIsModalOpen(false); 

  return (
    <>
      {/* ---------- PROFILE CARD ---------- */}
      <div
              // onClick={() => setIsModalOpen(true)}
              onClick={openModal}
        className="group relative h-105 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4">
          <div className="backdrop-blur-md bg-white/80 rounded-xl px-4 py-3 text-center transition-all duration-300 group-hover:bg-white">
            <h3 className="font-rubik text-main text-lg font-semibold">
              {name}
            </h3>
            <p className="font-grotesk text-sm text-gray-700">
              {position}
            </p>
          </div>
        </div>
      </div>

      {/* MODAL  */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
           onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 shadow hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Header Image */}
            <div className="relative h-85">
              <Image
                src={fullImage || image}
                alt={name}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h2 className="text-3xl font-bold text-white">{name}</h2>
                <p className="text-sub text-lg">{position}</p>

                {tag && (
                  <span className="mt-3 w-fit rounded-full bg-white/20 px-4 py-1 text-sm text-white backdrop-blur">
                    {tag}
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Academic Info */}
              {(faculty || department || level) && (
                <section>
                  <h4 className="mb-3 text-lg font-semibold text-gray-900">
                    Academic Information
                  </h4>
                  <div className="space-y-1 text-gray-700">
                    {faculty && <p><b>Faculty:</b> {faculty}</p>}
                    {department && <p><b>Department:</b> {department}</p>}
                    {level && <p><b>Level:</b> {level}</p>}
                  </div>
                </section>
              )}

              {/* Contact */}
              {(email || phone) && (
                <section>
                  <h4 className="mb-3 text-lg font-semibold text-gray-900">
                    Contact
                  </h4>
                  <div className="space-y-3">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-emerald-600"
                      >
                        <Mail className="h-5 w-5" />
                        {email}
                      </a>
                    )}
                    {phone && (
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-emerald-600"
                      >
                        <Phone className="h-5 w-5" />
                        {phone}
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* Socials */}
              {(facebook || x || instagram || linkedin) && (
                <section>
                  <h4 className="mb-3 text-lg font-semibold text-gray-900">
                    Social Media
                  </h4>
                  <div className="flex gap-4">
                    {facebook && <SocialIcon href={facebook} color="bg-blue-600"><Facebook /></SocialIcon>}
                    {x && <SocialIcon href={x} color="bg-black"><X /></SocialIcon>}
                    {instagram && <SocialIcon href={instagram} color="bg-pink-600"><Instagram /></SocialIcon>}
                    {linkedin && <SocialIcon href={linkedin} color="bg-blue-700"><Linkedin /></SocialIcon>}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Social Icon ---------- */
function SocialIcon({
  href,
  color,
  children,
}: {
  href: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 ${color} text-white rounded-full transition-all hover:scale-110 hover:shadow-lg`}
    >
      {children}
    </a>
  );
}
