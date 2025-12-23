import Button2 from "@/containers/common/Button2/Button2";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Forside() {
  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row items-center place-items-center justify-between px-6 md:px-12 py-12 bg-white">
        <div>
          <Image
            src="https://i.ibb.co.com/rGK71c2g/Whats-App-Image-2025-12-20-at-03-48-59.jpg"
            alt="Work bags"
            width={640}      // set an appropriate width
            height={640}     // set an appropriate height
            quality={70}     // compress to save bandwidth
            className="w-[40rem] h-auto"
          />
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl mb-4">
           Ny Morgen work bags
          </h2>
          <p className="font-sans mb-6">
            Our work bags combine the best of ny morgen design, where functionality
            meets uncompromising quality. Perfect for your everyday life with
            space for all your necessities and a laptop.
          </p>
          <Link
            href={{
              pathname: "/allproducts",
              query: { take: "/men/Bags/all" },
            }}
          >
            <Button2 text="See More" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forside;
