import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiArmchairThin } from "react-icons/pi";
import CategoryCard from "../Cards/CategoryCard";
import { AppContext } from "../../context/AppContext";


const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow cursor-pointer hover:bg-[var(--bg)]"
  >
    <FaChevronLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow cursor-pointer hover:bg-[var(--bg)]"
  >
    <FaChevronRight />
  </div>
);

const TopCategories = () => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 1000,
    arrows: true,
    infinite: true,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
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
  const {categories } = useContext(AppContext)

  return (
    <div className="container relative mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mx-auto w-full md:w-1/2 pb-10">
              <PiArmchairThin className="text-8xl text_hl"/>
              <h3 className="text-3xl font-bold">Product Category</h3>
              <p className="text-sm leading-5">Explore our curated selection of premium products, tailored to suit every need and taste. From essentials to indulgences, find your perfect fit..</p>
            </div>
      <Slider {...settings}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Slider>
    </div>
  );
};

export default TopCategories;
