import React, { useRef, useState, useContext } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./RelatedSlider.css";
import Image from "next/image";
import Link from "next/link";
import { SettingsContext } from "@/hooks/SettingsProvider";
import { getCurrencySymbol, convertPrice } from "@/utils/currencyUtils";
import {
  getSafeImageSrc,
  shouldBypassNextImageOptimization,
} from "@/utils/imageUtils";

const RelatedProductSlider = ({ productInfo, pictures }) => {
  const { country, settings } = useContext(SettingsContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const splideRef = useRef(null);

  const handlePrev = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  const handleNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  const getFormattedPrice = (price) => {
    const convertedPrice = convertPrice(price, country, settings);
    return Number.isInteger(convertedPrice) 
      ? `${convertedPrice}.00`
      : convertedPrice.toFixed(2);
  };

  const getDiscountAmount = (product) => {
    const discountAmount = (product.discount / 100) * product.askingPrice;
    return convertPrice(discountAmount, country, settings);
  };

  return (
    <div className="mt-10 relative !z-40">
      <Splide
        ref={splideRef}
        options={{
          type: "loop",
          perPage: 4,
          pagination: false,
          gap: 20,
          arrows: false,
          autoplay: true,
          breakpoints: {
            1200: { perPage: 4 },
            1024: { perPage: 3 },
            768: { perPage: 1 },
          },
        }}
        aria-label="Image Slider"
      >
        {pictures.map((src, index) => {
          const product = productInfo[index];
          const imageSrc = getSafeImageSrc(
            hoveredIndex === index ? src?.[1] || src?.[0] : src?.[0]
          );
          const currencySymbol = getCurrencySymbol(country);
          const originalPrice = getFormattedPrice(product?.askingPrice);
          const discountedPrice = getFormattedPrice(
            product?.askingPrice - (product?.discount / 100) * product?.askingPrice
          );
          const discountAmount = getDiscountAmount(product);

          return (
            <SplideSlide key={index}>
              <div>
                <Link
                  href={{
                    pathname: `/singleproduct`,
                    query: {
                      color: product?.color,
                      id: product?._id,
                    },
                  }}
                  className="flex justify-center cursor-pointer relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-[25rem] w-full overflow-hidden rounded-sm shadow-sm">
                    <Image
                      src={imageSrc}
                      alt={`Slide ${index + 1}`}
                      fill
                      unoptimized={shouldBypassNextImageOptimization(imageSrc)}
                      sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 90vw"
                      className="object-cover transition-opacity duration-300"
                      style={{
                        opacity: hoveredIndex === index ? 0.9 : 1,
                      }}
                    />
                  </div>
                  {product?.discount > 0 && (
                    <div
                      style={{ backgroundColor: "#be834f" }}
                      className="absolute tracking-widest top-2 left-2 text-white text-xs font-thin px-2 py-1 rounded-sm"
                    >
                      SAVE {currencySymbol} {discountAmount.toFixed(2)}
                    </div>
                  )}
                </Link>
                <div>
                  <p className="text-transform: uppercase tracking-widest text-gray-600 text-center pt-3 text-sm">
                    {product?.productName}
                  </p>
                  <div className="text-center pt-1 text-xs">
                    {product?.discount > 0 ? (
                      <div>
                        <span style={{ color: "#be834f" }}>
                          {currencySymbol} {discountedPrice}
                        </span>
                        <span className="line-through text-gray-400 ml-2">
                          {currencySymbol} {originalPrice}
                        </span>
                      </div>
                    ) : (
                      <p className="text-transform: uppercase tracking-widest text-gray-600">
                        {currencySymbol} {originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>

      <button
        className="custom-arrow left-arrow"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </button>
      <button
        className="custom-arrow right-arrow"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default RelatedProductSlider;
