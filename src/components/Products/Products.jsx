import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';
import ProductPagination from '../Pagination/ProductPagination';
import ProductsHeader from './ProductsHeader';
import ProductsGridView from './ProductsGridView';
import ProductFilter_Sidebar from './ProductFilter_Sidebar';
function Products({ pagination = true }) {
  const [products, setProducts] = useState([]);
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
        setProducts(data.results)
        setLoading(false)
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [currentPage]); // <-- include `limit` if it's a prop or state

  return loading ? <h1 className='text-xl text-center pt-10'>Loading...</h1> : (
    <section className='container mb-10'>
      <ProductsHeader />
      <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5 gap-y-5'>
        <ProductFilter_Sidebar />
        <ProductsGridView products={products} />
      </div>
      {
        pagination && <div className='w-full mt-5'>
          <ProductPagination setCurrentPage={setCurrentPage} currentPage={currentPage} count={count} />
        </div>
      }
    </section>
  )
}

export default Products