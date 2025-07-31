import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../Cards/ProductCard";


const products = [
  { id: 1, name: "Chair 1", price: "$20", image: "/images/chair4.png", status:'New'},
  { id: 2, name: "Chair 2", price: "$25", image: "/images/chair1.png" },
  { id: 3, name: "Chair 3", price: "$30", image: "/images/chair6.png", status: 'Sales'},
  { id: 4, name: "Chair 4", price: "$35", image: "/images/chair7.png" },
  { id: 5, name: "Chair 5", price: "$40", image: "/images/chair8.png" },
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
  >
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
  >
    <FaChevronRight />
  </button>
);

const FeaturedProducts = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,       // 🔥 Only 1 item scrolls at a time
    infinite: false,
    arrows: true,
    swipeToSlide: true,      // ✅ Drag with mouse or touch
    draggable: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
      <Slider {...settings}>
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
