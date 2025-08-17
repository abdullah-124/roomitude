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
  }, [currentPage, query]);

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
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-5 gap-y-5'>
        <ProductFilter_Sidebar setQuery={setQuery} />
        <div className="lg:col-span-3 md:col-span-2">
          {
            loading ? <h1 className='text-xl text-center pt-10'>Loading...</h1>
              : !count ? <h3 className='text-lg p-4'>No Products Found</h3> :
                <ProductsGridView products={products} />
          }
          {
            pagination && <div className='w-full mt-5'>
              <ProductPagination setCurrentPage={setCurrentPage} currentPage={currentPage} count={count} />
            </div>
          }
        </div>

      </div>

    </section>
  )
}

export default Products