interface CardProps {
  white?: boolean;
  number: number;
  title: string;
  text: string;
}

export default function Card({ white, number, title, text }: CardProps): JSX.Element {
  return (
    <>
      <div className={`basis-[50%] rounded-[10px] ${white ? 'bg-[white]' : 'glass'} flex flex-col p-6.25 justify-center space-y-3`}>
        <span
          id="ripple"
          className={`w-11.25 h-11.25 ${number === 1 ? 'bg-main' : 'bg-white text-main'} grid place-content-center rounded-full font-rubik-dirt font-[400] text-[20px]`}
        >
          {number}
        </span>

        <b className={`${number === 1 ? 'text-main' : 'text-white'} font-rubik text-[20px]`}>
          {title}
        </b>

        <p className={`${number === 1 ? 'text-main' : 'text-white'} text-[13px] font-grotesk`}>
          {text}
        </p>
      </div>
    </>
  );
}