import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function Products({ limit = 0 }) {
  const [chairs, setChairs] = useState([]);
  useEffect(() => {
    fetch('/chairs.json')
      .then(res => res.json())
      .then(data => {
        if (limit) {
          const randomItem = getRandomItems(data, limit);
          setChairs(randomItem)
        }
        else {
          setChairs(data);
        }
      })
      .catch(err => console.error("Error fetching chairs:", err));
  }, []);
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
            chairs.map(item => <ProductCard key={item.name} item={item} />)
          }
        </div>
      </main>

    </section>
  )
}

export default Products