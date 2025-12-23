import { ArrowRight } from "lucide-react";
import Link from 'next/link'


export default function Details() {
    return (
        <>
              <div className="p-7.5 space-y-9">
      {/*  */}
      {/* Top */}
      <div className="flex justify-between items-center ">
        <Link
          href={`/publication`}
          className="flex items-center px-5 py-1.25 gap-2 text-white bg-[#0C1657] rounded-[5px]"
        >
          <ArrowRight /> Back
        </Link>
      </div>
      {/* Top */}

      {/*  */}

      {/*  */}
      <div className="space-y-3">
        <div className="flex items-center justify-center flex-col">
          <h2 className="font-rubik font-extrabold text-[30px] ">
            APPOINTMENT AS ATTORNEY GENERAL OF ACUSA
          </h2>
          <p className="text-red-500 font-grotesk font-semibold">Written By: </p>
        </div>

        <div className="font-grotesk leading-7.5 space-y-4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
            harum quo iusto omnis temporibus aspernatur deserunt fugit tempora
            aliquam cum, asperiores in dolorem maxime ratione sapiente fuga
            officia magnam, impedit magni unde! Quis necessitatibus architecto
            quidem quaerat magnam accusantium, maxime at doloribus aperiam,
            officiis debitis suscipit non placeat eius, natus ullam quas optio
            numquam quam minima odio autem nobis earum in! Debitis minus natus,
            placeat impedit deleniti deserunt harum illum veniam dolorem
            dignissimos facere cupiditate? Ullam sed autem magni veniam
            voluptate sequi facere quaerat eum vero maxime ipsa, culpa in beatae
            neque ad doloremque doloribus aut, non vitae? Laboriosam sit sunt
            ullam excepturi maiores! Vel modi nisi, in consectetur est
            asperiores dolore debitis laboriosam cum. Accusantium culpa pariatur
            sit explicabo veniam, nesciunt aperiam ad, corporis aliquid impedit
            minima odit temporibus libero blanditiis ut non dicta vero?
            Asperiores, incidunt dolorem.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
            harum quo iusto omnis temporibus aspernatur deserunt fugit tempora
            aliquam cum, asperiores in dolorem maxime ratione sapiente fuga
            officia magnam, impedit magni unde! Quis necessitatibus architecto
            quidem quaerat magnam accusantium, maxime at doloribus aperiam,
            officiis debitis suscipit non placeat eius, natus ullam quas optio
            numquam quam minima odio autem nobis earum in! Debitis minus natus,
            placeat impedit deleniti deserunt harum illum veniam dolorem
            dignissimos facere cupiditate? Ullam sed autem magni veniam
            voluptate sequi facere quaerat eum vero maxime ipsa, culpa in beatae
            neque ad doloremque doloribus aut, non vitae? Laboriosam sit sunt
            ullam excepturi maiores! Vel modi nisi, in consectetur est
            asperiores dolore debitis laboriosam cum. Accusantium culpa pariatur
            sit explicabo veniam, nesciunt aperiam ad, corporis aliquid impedit
            minima odit temporibus libero blanditiis ut non dicta vero?
            Asperiores, incidunt dolorem.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, ea
            harum quo iusto omnis temporibus aspernatur deserunt fugit tempora
            aliquam cum, asperiores in dolorem maxime ratione sapiente fuga
            officia magnam, impedit magni unde! Quis necessitatibus architecto
            quidem quaerat magnam accusantium, maxime at doloribus aperiam,
            officiis debitis suscipit non placeat eius, natus ullam quas optio
            numquam quam minima odio autem nobis earum in! Debitis minus natus,
            placeat impedit deleniti deserunt harum illum veniam dolorem
            dignissimos facere cupiditate? Ullam sed autem magni veniam
            voluptate sequi facere quaerat eum vero maxime ipsa, culpa in beatae
            neque ad doloremque doloribus aut, non vitae? Laboriosam sit sunt
            ullam excepturi maiores! Vel modi nisi, in consectetur est
            asperiores dolore debitis laboriosam cum. Accusantium culpa pariatur
            sit explicabo veniam, nesciunt aperiam ad, corporis aliquid impedit
            minima odit temporibus libero blanditiis ut non dicta vero?
            Asperiores, incidunt dolorem.
          </p>
        </div>
      </div>
      {/*  */}
    </div>
        </>
    )
}