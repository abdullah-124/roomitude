import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';

function Products() {
  const [chairs, setChairs] = useState([]);
  useEffect(()=>{
    fetch('/chair.json')
    .then(res => res.json())
    .then(data => setChairs(data))
  },[])
  return (
    <section className='container'>
      <div>
        <h2 className='text-xl text-center font-medium'>Our Products</h2>
      </div>
        <main>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {
              chairs.map((chair=>{
                <ProductCard key={chair.id} item={chair} />
              }))
            }
          </div>
        </main>
      
    </section>
  )
}

export default Products