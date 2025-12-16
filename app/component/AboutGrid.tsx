export default function AboutGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start  gap-5 py-6">
      {/* First */}
      <div className="flex flex-col lg:justify-start justify-end gap-6 lg:h-[80lvh] h-[70lvh]">
        <div className="border border-white basis-[25%] rounded-[10px] w-[45%] bg-[#505786]"></div>
        <div className="border border-white basis-[50%] rounded-[10px] bg-[#0C1657] "></div>
      </div>
      {/* First */}

      {/* Second */}
      <div className="bg-[#0C1657] rounded-[10px] lg:h-[80lvh] h-[70lvh] "></div>
      {/* Second */}

      {/* Third */}
      <div className="flex flex-col gap-6 lg:h-[80lvh] h-[70lvh]">
        <div className="border border-white basis-[50%] rounded-[10px] bg-[#D49906] text-white flex items-center px-4">
          <p className="font-sora text-[23px]">{`"ACUSA is a student led organization that is committed to promoting the interests of students in this university."`}</p>
        </div>
        <div className="border border-white basis-[25%] rounded-[10px] w-[45%] bg-[#505786]"></div>
      </div>
      {/* Third */}

    </div>
  );
}

