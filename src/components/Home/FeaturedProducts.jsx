import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import ProductCard from "../Cards/ProductCard";
import { AppContext } from "../../context/AppContext";


const dummy_products = [
  { id: 1, name: "Chair 1", price: "$20", image: "/images/chair4.png", status: 'New' },
  { id: 2, name: "Chair 2", price: "$25", image: "/images/chair1.png" },
  { id: 3, name: "Chair 3", price: "$30", image: "/images/chair6.png", status: 'Sales' },
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
  // load products from appcontext 
  const {featuredProducts} = useContext(AppContext)



  return (
    <main className="relative container py-10 padding">
      <div className="flex flex-col items-center text-center mx-auto w-full md:w-1/2 pb-10">
        <LiaBedSolid className="text-8xl text_hl"/>
        <h3 className="text-3xl font-bold">Featured Products</h3>
        <p className="text-sm leading-5">Discover our handpicked selection of standout products. Elevate your lifestyle with our top picks that combine quality, style, and innovation.</p>
      </div>
      <Slider {...settings}>
        {featuredProducts.map((item) => (
          <div className="p-2" key={item.id} ><ProductCard item={item} /></div>
        ))}
      </Slider>
    </main>
  );
};

export default FeaturedProducts;
