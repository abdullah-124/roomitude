import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toPng } from 'html-to-image';
import { useReactToPrint } from "react-to-print";
import NotFound from '../../Notfound/NotFound'
import LOGO from '../../Navbar/LOGO'

function Invoice() {
    const navigate = useNavigate()
    const [order, setOrder] = useState({})
    const invoiceRef = useRef()
    let { id } = useParams()
    id = parseInt(id)
    if (!id) return <NotFound />
    useEffect(() => {
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }, [])
    async function load_order_by_id(id) {
        const res = await fetch(`http://127.0.0.1:8000/api/order/${id}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const data = await res.json();
        setOrder(data)
    }
    useEffect(() => { load_order_by_id(id) }, [])
    const handleDownload = async () => {
        const node = document.getElementById('invoice');
        node.style.fontFamily = "Arial, sans-serif";
        const dataUrl = await toPng(node, { cacheBust: true, skipFonts: true });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'invoice.png';
        link.click();
    };

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: `invoice_${order.id}`,
    });
    function navigate_to_payment(id) {
        navigate(`/payment/stripe/${id}`, { state: { fromOrderPage: true } })
    }
    return (
        <main>
            <div className='mb-10 flex gap-3 justify-between items-center'>
                <div className='flex gap-3'>
                    <button onClick={handleDownload} className='btn_outline text-sm'>Download Invoice</button>
                <button onClick={handlePrint} className='btn_outline text-sm'>Print</button>
                </div>
                {
                    order.is_paid? <span className='text-green-500 font-bold'>Payment: Paid</span> : <button onClick={() => navigate_to_payment(order.id)} className='print:hidden block ms-auto btn'>Pay Now</button>
                }
            </div>
            <section id='invoice' ref={invoiceRef} className='bg-white border_bg rounded-lg overflow-hidden print:flex print:flex-col print:h-[297mm] print:justify-between'>
                <header className='bg flex justify-between items-center padding py-5'>
                    <LOGO />
                    <aside className='uppercase text-end '>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>invoice no: #{order.id}</p>
                        <p className='font-bold'>Status: {order.status}</p>
                    </aside>
                </header>
                <main className='h-full'>
                    <header className='padding py-3 border-b border-[var(--bg)]'>
                        <section className='leading-4 flex justify-between items-start'>
                            <aside>
                                <h5 className='font-bold'>Invoice To</h5>
                                <p>{order.full_name}</p>
                                <p>{order.phone_number}</p>
                                <p>{order.email}</p>
                                <p>{order.address}</p>
                                <p>Postal Code : {order.postal_code}, City: {order.city}</p>
                                <p></p>
                            </aside>
                            <aside className='text-end'>
                                <h5 className='font-bold'>Bill To</h5>
                                <p>Roomitude</p>
                                <p>roomitude@gmail.com</p>
                                <p>PO BOX 3113, Sylhet, Bangladesh</p>
                                <p></p>
                            </aside>
                        </section>
                        <section className='py-2 flex justify-between'>
                            <div>
                                <h5 className='font-bold'>Transaction Id</h5>
                                <p>{order.transaction_id || 'NULL'}</p>
                            </div>
                            <div className='text-end'>
                                <h5 className='font-bold'>Pyment status</h5>
                                <p className='text-white font-bold'>
                                    {
                                        order.is_paid ? <span className='bg-[#008000] px-2 p-1 rounded'>Paid</span> : <span className='text-[#FF0000] '>Not Paid</span>
                                    }
                                </p>
                            </div>
                        </section>
                    </header>
                    <section className='padding py-5'>
                        <table className='text-center w-full'>
                            <thead className=''>
                                <tr className='border-b border-[var(--bg)] '>
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
                </main>
                <footer className=''>
                    <div className='padding pb-5'>
                        <h5 className='font-bold uppercase'>important notice</h5>
                        <ul className='list-disc ps-3'>
                            <li>All amounts shown in this invoide are in US dollers</li>
                            <li>Once order done, money can't refund</li>
                            <li>Delevery might delay due to some external dependency</li>
                        </ul>
                    </div>
                    <div className='text-center bg py-2'>
                        <p className='text_hl font-medium'>Thank you for stay with us</p>
                        <p className='font-bold'>Roomitude</p>
                    </div>
                </footer>
            </section>

        </main>
    )
}

export default Invoice