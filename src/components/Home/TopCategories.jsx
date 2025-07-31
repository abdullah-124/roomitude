import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CategoryCard from "../Cards/CategoryCard";

const categories = [
  {
    id: 1,
    title: "Wing Chair",
    count: "5,043 Products",
    image: "/images/category1.png",
  },
  {
    id: 2,
    title: "Wooden Chair",
    count: "670 Products",
    image: "/images/category2.png",
  },
  {
    id: 3,
    title: "Desk Chair",
    count: "54 Products",
    image: "/images/category3.png",
  },
  {
    id: 4,
    title: "Park Bench",
    count: "203 Products",
    image: "/images/category4.png",
  },
  {
    id: 5,
    title: "Recliner Chair",
    count: "137 Products",
    image: "/images/category5.png",
  },
  {
    id: 6,
    title: "Dining Chair",
    count: "890 Products",
    image: "/images/category6.png",
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow cursor-pointer hover:bg-gray-200"
  >
    <FaChevronLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow cursor-pointer hover:bg-gray-200"
  >
    <FaChevronRight />
  </div>
);

const TopCategories = () => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    swipeToSlide: true,
    draggable: true,
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

  return (
    <div className="container relative mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-6">Top Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Slider>
    </div>
  );
};

export default TopCategories;
