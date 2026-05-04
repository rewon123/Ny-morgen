"use client";

import { useEffect } from "react";
import Image from "next/image";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "./SliderComponent.css";
import {
  getSafeImageSrc,
  shouldBypassNextImageOptimization,
} from "@/utils/imageUtils";

const SliderComponent = ({ images }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // }
      const main = new Splide("#main-slider", {
        type: "",
        height: "60vh",
        pagination: false,
        arrows: false,
        cover: true,
        breakpoints: {
          1024: {
            height: "70vh",
          },
          640: {
            height: "50vh",
          },
        },
      });

      const thumbnails = new Splide("#thumbnail-slider", {
        rewind: true,
        fixedWidth: 104,
        height: "10vh",
        isNavigation: true,
        gap: 10,
        arrows: false,
        focus: "center",
        pagination: false,
        cover: true,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
        breakpoints: {
          1024: {
            fixedWidth: 80,
            height: "10vh",
          },
          640: {
            fixedWidth: 60,
            gap: 5,
            height: "8vh",
          },
        },
      });

      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();
    }
  }, [images]);

  return (
    <div>
      <div id="main-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((image, index) => (
              <li className="splide__slide" key={`main-${index}`}>
                {(() => {
                  const imageSrc = getSafeImageSrc(image);
                  return (
                <div className="relative h-full w-full">
                  <Image
                    src={imageSrc}
                    alt={`Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    unoptimized={shouldBypassNextImageOptimization(imageSrc)}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="thumbnail-slider" className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((image, index) => (
              <li className="splide__slide" key={`thumbnail-${index}`}>
                {(() => {
                  const imageSrc = getSafeImageSrc(image);
                  return (
                    <div className="relative h-full w-full">
                      <Image
                        src={imageSrc}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        unoptimized={shouldBypassNextImageOptimization(imageSrc)}
                        sizes="104px"
                        className="object-cover"
                      />
                    </div>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
