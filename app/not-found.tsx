import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FCFCFC] px-6">
      <section className="max-w-3xl w-full text-center relative">

        {/* Map-style dashed border */}
        <div className="absolute inset-0 border-2 border-dashed border-[#D3AE1A]/40 rounded-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative bg-white rounded-2xl shadow-lg p-10 md:p-14">

          {/* Location Pin */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#0C1657] flex items-center justify-center text-white text-2xl">
              📍
            </div>
          </div>

          <h1 className="text-6xl font-extrabold text-[#0C1657] mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#0C1657] mb-4">
            Location Not Found
          </h2>

          <p className="text-[#808080] max-w-xl mx-auto mb-6 leading-relaxed">
            The <span className="font-semibold text-[#0C1657]">ACUSA ARK</span> —
            the official vehicle of the Ajayi Crowther University Student Assembly —
            has arrived at this coordinate, but there’s nothing mapped here.
          </p>

          <p className="text-[#808080] max-w-xl mx-auto mb-10">
            You may have followed an outdated route or entered an incorrect campus path.
            Let’s guide you back to familiar grounds.
          </p>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0C1657] text-white font-medium hover:bg-[#0C1657]/90 transition"
            >
              Return to Campus Home
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#D3AE1A] text-[#0C1657] font-medium hover:bg-[#D3AE1A]/10 transition"
            >
              About ACUSA
            </Link>
          </div>

          {/* Footer hint */}
          <div className="mt-10 text-sm text-[#808080]">
            Ajayi Crowther University Student Assembly • Serving with Vision & Integrity
          </div>
        </div>
      </section>
    </main>
  );
}
