import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import ProductPagination from '../Pagination/ProductPagination';
import ProductsHeader from './ProductsHeader';
import ProductsGridView from './ProductsGridView';
import ProductFilter_Sidebar from './ProductFilter_Sidebar';

// main funciton
function Products({ pagination = true }) {
  // state vairable 
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(new URLSearchParams(location.search))

  useEffect(() => {
    fetch_products()
  }, [currentPage]); // <-- include `limit` if it's a prop or state

  // after 3 second of filtering
  useEffect(() => {
    setTimeout(() => {
      fetch_products()
    }, 3000);
  }, [query])
  // function for fetchig product
  const fetch_products = async () => {
    // add param to the main url
    let url = `http://127.0.0.1:8000/api/products/?page=${currentPage}`
    if (query) {
      console.log('string', query.toString())
      url += '&' + query.toString()
      // console.log(url);
    }
    setLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      setCount(data.count)
      setProducts(data.results)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <section className='container mb-10'>
      <ProductsHeader setQuery={setQuery} />
      <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5 gap-y-5'>
        <ProductFilter_Sidebar setQuery={setQuery} />
        {
          loading ? <h1 className='text-xl text-center pt-10'>Loading...</h1>
            : !count ? <h3 className='text-lg p-4'>No Products Found</h3> :
              <ProductsGridView products={products} />
        }
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