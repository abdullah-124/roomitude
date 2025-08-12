import React, { useEffect, useState } from 'react'
import ProductCard from '../Cards/ProductCard';
import ProductPagination from '../Pagination/ProductPagination';
import ProductsHeader from './ProductsHeader';
import ProductsGridView from './ProductsGridView';
import ProductFilter_Sidebar from './ProductFilter_Sidebar';
import objectToQueryString from '../../utils/object_to_params';


// main funciton
function Products({ pagination = true }) {
  // state vairable 
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    let url = `http://127.0.0.1:8000/api/products/?page=${currentPage}`
    // add param to the main url
    if (params) {
      url += '&' + objectToQueryString(params)
      console.log(url);
    }
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCount(data.count)
        setProducts(data.results)
        setLoading(false)
        setFilter(false)
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [currentPage, filter]); // <-- include `limit` if it's a prop or state

  return (
    <section className='container mb-10'>
      <ProductsHeader setFilter={setFilter} setParams={setParams} />
      <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5 gap-y-5'>
        <ProductFilter_Sidebar params={params} setParams={setParams} setFilter={setFilter} />
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