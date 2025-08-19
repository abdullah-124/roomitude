import { MdClose } from "react-icons/md";
import useWishlist from '../../context/WishlistContext';
import { Link } from 'react-router';


function WishListMenu({ setWishListMenu }) {
  const { items_in_wishlist, items_count_in_wishlist, remove_item_from_wishlist } = useWishlist()
  return (
    <main onClick={() => setWishListMenu(false)} className='fixed w-full right-0 top-0 h-full pt-14 z-100'>
      <div onClick={(e) => e.stopPropagation()} className='w-[300px]  bg-white float-right mr-3 border border-[var(--sbg)]/40'>
        {
          items_in_wishlist.length ? <div className='text-sm'>
            <h3 className='text-lg font-medium px-5 py-2 shadow'>Wishlist (<span>{items_count_in_wishlist}</span>)</h3>
            <div className='px-5 flex flex-col max-h-[300px] overflow-y-scroll shadow'>
              {
                items_in_wishlist.map((item, idx) => (
                  <div key={idx} className='py-2 grid grid-cols-3 border-b border-[var(--bg)] cursor-pointer gap-x-2 items-center'>
                    <img src={item.product.image} alt="" />
                    <div className='col-span-2 '>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-bold text-base text_hl'>{item.product.exact_price}$</h3>
                        {/* delete wishlist item */}
                        <button
                          onClick={() => remove_item_from_wishlist(item.product.id)}
                          className='bg-[var(--bg)] text-lg text-white hover:bg-[var(--sbg)]'>
                          <MdClose />
                        </button>
                      </div>
                      <h3 className='py-1'>{item.product.name}</h3>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='px-5 py-1'>
              <Link to='/profile/wishlist/' className='block text-lg btn w-full my-3'>View All Wishlist</Link>
            </div>
          </div> : <h3 className='p-3 text-gray-500'>wishlist is empty</h3>
        }
      </div>
    </main>
  )
}

export default WishListMenu