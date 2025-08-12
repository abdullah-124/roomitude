import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

const items = [
    { id: 1, title: "Best Furniture Collection for your interior.",description: "wellcome to roomitude", image: 'images/banner_chair3.png' },
    { id: 2, title: "Crafted Comfort That Complements Every Modern Room",description: "Explore our top-rated chairs for every room.", image: 'images/banner_chair2.png'  },
    { id: 3, title: "Style Your Space with Signature Seating Solutions", description: "Premium chairs built to last.", image: 'images/banner_chair1.png' },
];

export default function HeroSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // hide arrows if you only want dots
        appendDots: dots => (
            <div>
                <ul className=" flex justify-center gap-2">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600 transition"></div>
        ),
    };

    return (
        <section className=" container">
            <div className="w-full rounded-lg bg-gray-200  pb-20">
                <Slider {...settings}>
                    {items.map(item => (
                        <div className="padding">
                            <section className='grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-5 items-center'>
                                <div className='md:order-1 order-2 md:text-start text-center'>
                                    <p className='uppercase pb-2'>{item.description}</p>
                                    <h1 className='lg:text-6xl text-4xl font-bold'>
                                        {item.title}
                                    </h1>
                                    <Link to={'/products/'} className='btn mt-3 inline-flex items-center gap-2'>Shop now
                                        <IoIosArrowRoundForward className='text-4xl' />
                                    </Link>
                                </div>
                                <div className='md:order-2 order-1'>
                                    <img src={item.image} alt="" />
                                </div>
                            </section>
                        </div>
                    ))}
                </Slider>
            </div>
            {/* <Features /> */}
        </section>
    );
}
