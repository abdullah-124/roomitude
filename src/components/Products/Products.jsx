import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import ProductPagination from '../Pagination/ProductPagination';
import ProductsHeader from './ProductsHeader';
import ProductsGridView from './ProductsGridView';
import ProductFilter_Sidebar from './ProductFilter_Sidebar';
import ProductLoaderSkaleton from './ProductLoaderSkaleton';

// main funciton
function Products({ pagination = true }) {
  // state vairable 
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(null)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(new URLSearchParams())
  const { category } = useParams();

  let url = `http://127.0.0.1:8000/api/products/?page=${currentPage}&`

  useEffect(() => {
    if (category) {
      url += `categories=${category}&`
    }
    else url = `http://127.0.0.1:8000/api/products/?page=${currentPage}&`
    if (query) {
      url += query.toString()
      console.log(url)
    }
    window.scrollTo({
      left: 0,
      top: 200,
      behavior: "smooth"
    })
    fetch_products()
  }, [currentPage, query]);

  // function for fetchig product
  const fetch_products = async () => {
    setLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      setCount(data.count)
      setProducts(data.results)
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
      <ProductsHeader setQuery={setQuery} setTitle={setTitle} />
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-5 gap-y-5'>
        <ProductFilter_Sidebar setPage={setCurrentPage} setQuery={setQuery} setTitle={setTitle} />
        <div className="flex flex-col justify-between lg:col-span-3 md:col-span-2">
          <div>
            <div>
              {
                loading ? <ProductLoaderSkaleton />
                  : !count ? <h3 className='text-lg p-4'>No Products Found</h3> :
                    <div className='capitalize pb-5 flex justify-between'>
                      <div>
                        {title && <h3 className='font-semibold'>{title}</h3>}
                        <p className='text-sm'>we found<span className='px-1 font-bold'>{count}</span>items for you!</p>
                      </div>
                      <p className='text-xs'>Page {currentPage} of {Math.ceil(count / 12)}</p>
                    </div>
              }
            </div>
            {
              !loading && products && <ProductsGridView products={products} />
            }
          </div>
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