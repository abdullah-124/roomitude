import React from 'react'

function OrderInfo({ order }) {
  return (
    <div className='flex flex-col gap-5'>
      <header className='p-5 border_bg rounded-md'>
        <aside>
          <h5 className='font-bold'>Invoice To</h5>
          <p>{order.full_name}</p>
          <p>{order.phone_number}</p>
          <p>{order.email}</p>
          <p>{order.address}</p>
          <p>Postal Code : {order.postal_code}, City: {order.city}</p>
          <p></p>
        </aside>
      </header>
      <section className='border_bg rounded-md p-5'>
        <table className='text-center w-full'>
          <thead className=''>
            <tr className='bg'>
              <th className='py-1'>#</th>
              <th className='text-start'>Item Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th className='text-end pe-1'>Amount</th>
            </tr>
          </thead>
          <tbody >
            {
              order?.items?.map((item, idx) => (
                <tr key={item.id} className='border-b border-[var(--bg)]'>
                  <td className='p-1'>{idx + 1}</td>
                  <td className='text-start'>{item.product_name}</td>
                  <td>${item.product_price}</td>
                  <td>{item.quantity}</td>
                  <td className='text-end'>${item.total_price}</td>
                </tr>
              ))
            }
            <tr className='text-end border-b border-[var(--bg)]  font-bold text-sm whitespace-nowrap'>
              <td className="py-1" colSpan={4}>Sub Total : </td>
              <td>${order.sub_total}</td>
            </tr>
            <tr className='text-end border-b border-[var(--bg)] font-bold text-sm'>
              <td className="py-1" colSpan={4}>Discount: </td>
              <td>{order.discount}%</td>
            </tr>
            <tr className='text-end border-b border-[var(--bg)] font-bold text-sm'>
              <td className="py-1" colSpan={4}>Shipping ({order.shipping_method}): </td>
              <td>${order.shipping_cost}</td>
            </tr>
            <tr className='text-end border-b border-[var(--bg)] font-bold text-sm'>
              <td className="py-1" colSpan={4}>Grand Total : </td>
              <td>${order.total}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default OrderInfo    