import Image from "next/image";

export default function TestPage() {
  return (
    <div className="relative w-max">
      <Image
        className="vector w-[155px] lg:w-[288px] lg:left-[230px] md:left-[125px] left-[135px] absolute md:top-[-12px] top-[-10px]"
        src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='278'%20height='92'%20viewBox='0%200%20278%2092'%20fill='none'%20%3e%3cpath%20d='M39.1993%2091.2654L239.894%2079.5383C263.996%2078.13%20281.206%2055.6194%20276.244%2031.9919C272.135%2012.4251%20254.053%20-0.985374%20234.136%200.763132L33.8691%2018.3445C12.4428%2020.2255%20-2.73845%2040.1053%201.08824%2061.2708C4.37835%2079.4684%2020.7382%2092.3441%2039.1993%2091.2654Z'%20fill='%23D6FFD1'%20/%3e%3c/svg%3e"
        alt="green text background"
        width={278}
        height={92}
      />

      <h2 className="w-[320px] lg:w-[831px] text-center text-[40px] leading-[40px] lg:text-[64px] font-bold lg:leading-[60px] tracking-[-1.28px] relative z-10">
        Boost{" "}
        <span className="relative z-30 italic italic underlined-text underlined-checkout-text">revenue</span> using our suite of
        seamless & secure payment solutions.
      </h2>
    </div>
  );
}
