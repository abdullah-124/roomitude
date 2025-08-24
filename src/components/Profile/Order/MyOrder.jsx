import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

function MyOrder() {
  const [orders, setOrders] = useState([])
  const [laoding, setLoading] = useState(true)
  async function load_orders() {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/order/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await res.json()
      setOrders(data.orders)
    } catch (err) {
      throw new Error(err.message, 'Something went wrong')
    }
    finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    }
  }
  // calling the function by use effect
  useEffect(() => {
    load_orders()
  }, [])

  if (laoding) return <p className='p-5 text-lg animate-pulse'>Loading</p>
  if (!orders?.length) return <h3 className='p-4 text-xl'>You have no order yet</h3>
  return (
    <main className=''>
      <header>
        <h2>My Orders <span className='font-semibold'>({orders?.length})</span></h2>
      </header>
      <section className='py-5 w-full overflow-x-scroll'>
        <table className="w-full text-center">
          <thead className="">
            <tr className='text-center text-xs font-medium text-gray-500 uppercase'>
              <th className="px-6 py-3 tracking-wider">Order</th>
              <th className="px-6 py-3 tracking-wider">Date</th>
              <th className="px-6 py-3 tracking-wider">Status</th>
              <th className="px-6 py-3 tracking-wider">Payment</th>
              <th className="px-6 py-3 tracking-wider">Paid</th>
              <th className="px-6 py-3 tracking-wider">Total</th>
              <th className="px-6 py-3 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              orders.map(order => (
                <tr key={order.id} className="hover:bg-[var(--bg)]/70">
                  <td className="px-6 py-4  text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4  text-sm text-gray-500">{
                    new Date(order.created_at).toLocaleDateString()
                  }</td>
                  <td className="px-6 py-4 ">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">{order.status}</span>
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">{order.payment_method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white font-semibold text-sm ">
                    {
                      order.is_paid ? <span className='bg-[#008000] px-2 p-1 rounded'>Paid</span> : <span className='bg-[#FF0000] p-1 rounded'>Not Paid</span>
                    }
                  </td>
                  <td className="px-6 py-4  text-sm font-medium text-gray-900">${order.total} for {order?.items.length} item</td>
                  <td className="px-6 py-4  text-sm flex items-center gap-1 flex-wrap">
                    <Link to={`${order.id}/`} className="text-blue-600 hover:text-blue-900 font-medium">View</Link>
                    {!order.is_paid && <Link to={`/payment/stripe/${order.id}`} className='block btn'>Pay Now</Link>}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default MyOrder