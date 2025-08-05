import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';

function Products({ limit = 0 }) {
  const [chairs, setChairs] = useState([]);
  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/products/')
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      if(limit)
        setChairs(data.slice(0,limit))
      else
        setChairs(data)
    })
    .catch(err => console.error("Error fetching chairs:", err));
}, [limit]); // <-- include `limit` if it's a prop or state

  return (
    <section className='container'>
      <div>
        <h2 className='text-xl text-center font-medium'>Our Products</h2>
        <ul className='flex justify-center flex-wrap my-3 text-sm'>
          <li><a className='navLink' href="">All</a></li>
          <li><a className='navLink' href="">Newest</a></li>
          <li><a className='navLink' href="">Trending</a></li>
          <li><a className='navLink' href="">Best Sellers</a></li>
          <li><a className='navLink' href="">Featured</a></li>
        </ul>
      </div>
      <main>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {
            chairs.map((item,idx) => <ProductCard key={idx} item={item} />)
          }
        </div>
      </main>

    </section>
  )
}

export default Products