import React from 'react'
import { createPortal } from 'react-dom';
import { RiCloseCircleFill, RiEyeLine } from 'react-icons/ri'
import { BsGraphUpArrow } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import StarRating from '../Cards/StarRating';

function ProductQuickViewModal({ setModal, product }) {
    const { name, image, short_description, description, views, total_sales, total_review, rating, stock_quantity, materials, dimensions, weight, price, discount, exact_price } = product
    return createPortal(
        <section onClick={() => setModal(false)} className='p-5 fixed inset-0 bg-black/50 z-[999] flex items-center justify-center overflow-hidden'>
            <div onClick={(e) => e.stopPropagation()} className='lg:w-1/2 md:w-2/3 w-full md: mx-auto bg-white overflow-y-scroll h-[70vh]'>
                <header onClick={() => setModal(false)} className='sticky top-0 flex justify-between items-center px-5 p-2 shadow-lg backdrop-blur-2xl'>
                    <h6 className='text-sm'>{name}</h6>
                    <RiCloseCircleFill onClick={()=>setModal(false)} className='text-red-500 hover:text-red-600 text-2xl' />
                </header>
                <main className='p-5'>
                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
                        {/* image */}
                        <img className='w-full h-full object-cover' src={image} alt="" />
                        {/* product info */}
                        <div className='flex flex-col justify-evenly'>
                            <div>
                                <h3 className='text-xl font-semibold text_hl'>{name}</h3>
                                {rating && <StarRating className='text-sm text-orange-500' rating={rating} />}
                            </div>
                            {short_description && <p className='text-sm font-medium'>{short_description}</p>}
                            <div className='flex gap-2 items-center'>
                                <h3 className='text-5xl font-bold text_hl tracking-[-3px]'>{exact_price}$</h3>
                                {
                                    discount && <div className='leading-[1] flex flex-col justify-evenly'>
                                        <p className='text-sm text-red-500'>{discount}% off</p>
                                        <del className='text-xl text-gray-700 font-medium'>{price}</del>
                                    </div>
                                }
                            </div>
                            <div className='inline-flex flex-wrap gap-2 py-2'>
                                {views && <div className='badge_icon text-blue-500'><RiEyeLine />{views} views</div>}
                                {total_sales && <div className='badge_icon text-indigo-500'><BsGraphUpArrow />{total_sales} sold</div>}
                                {total_review && <div className='badge_icon text-orange-500'><CiStar />{total_review} reviews</div>}
                            </div>
                            <div className='text-sm'>
                                {stock_quantity ? <div>In Stock: {stock_quantity}</div> : <div>Out of Stock</div>}
                                {weight && <p>Weight: {weight}KG</p>}
                                {dimensions && <p>Dimensions: {dimensions}</p>}
                                {materials && <p>Materials Used: {materials}</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className='py-1 pt-3 font-bold'>Description</h5>
                        <p className='text-sm'>{description}</p>
                    </div>
                </main>
            </div>
        </section>, document.body
    );
};

export default ProductQuickViewModal