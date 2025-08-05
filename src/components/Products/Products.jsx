import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';
import ProductPagination from '../Pagination/ProductPagination';
import ProductsHeader from './ProductsHeader';
function Products({ limit = 0 }) {
  const [chairs, setChairs] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  const url = `http://127.0.0.1:8000/api/products/?page=${currentPage}`
  setLoading(true)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setCount(data.count)
      setChairs(data.results)
      setLoading(false)
    })
    .catch(err => console.error("Error fetching chairs:", err));
}, [currentPage]); // <-- include `limit` if it's a prop or state

  return loading ? <h1 className='text-xl text-center pt-10'>Loading...</h1> : (
    <section className='container'>
      <ProductsHeader />
      <main>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {
            chairs.map((item,idx) => <ProductCard key={idx} item={item} />)
          }
        </div>
      </main>
          <div className='w-full mt-5'>
            <ProductPagination setCurrentPage={setCurrentPage} currentPage={currentPage} count={count} />
          </div>
    </section>
  )
}

export default Products