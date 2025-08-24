import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import NotFound from '../../Notfound/NotFound'
import LOGO from '../../Navbar/LOGO'

function Invoice() {
    const [order, setOrder] = useState({})
    const invoiceRef = useRef()
    let { id } = useParams()
    id = parseInt(id)
    if (!id) return <NotFound />
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
        const element = invoiceRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${order.id}.pdf`);
    };

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: `invoice_${order.id}`,
    });
    return (
        <main>
            <div className='mb-10 flex gap-3 justify-center items-center'>
                <button onClick={handleDownload} className='btn_outline text-sm'>Download as pdf</button>
                <button onClick={handlePrint} className='btn_outline text-sm'>Print</button>
            </div>
            <section ref={invoiceRef} className='max-w-[500px] print:max-w-none border_bg text-xs mx-auto shadow-lg print:shadow-none rounded-xl overflow-hidden print:bg-[#fff] print:text-[#000] print:text-base print:flex print:flex-col print:justify-between print:h-full'>
                <header className='bg flex justify-between items-center padding py-5'>
                    <LOGO />
                    <aside className='uppercase text-end '>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>invoice no: #{order.id}</p>
                        <p className='font-bold'>Status: {order.status}</p>
                    </aside>
                </header>
                <main className=''>
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
                                        order.is_paid ? <span className='bg-[#008000] px-2 p-1 rounded'>Paid</span> : <>
                                            <span className='text-[#FF0000] '>Not Paid</span>
                                            <Link to={`/payment/stripe/${order.id}`} className='block btn'>Pay Now</Link>
                                        </>
                                    }
                                </p>
                                {
                                    order.is_paid && <>
                                        <h5 className='font-bold'>Pyment status</h5>
                                        <p>{order.is_paid ? "Paid" : "Unpaid"}</p>
                                    </>
                                }
                            </div>
                        </section>
                    </header>
                    <section className='padding py-5'>
                        <table className='text-center w-full'>
                            <thead className=''>
                                <tr className=' bg'>
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
                                <tr className='text-end border-b border-[var(--bg)]'>
                                    <td className="py-1 font-bold" colSpan={5}>Sub Total : ${order.sub_total}</td>
                                </tr>
                                <tr className='text-end border-b border-[var(--bg)]'>
                                    <td className="py-1 font-bold" colSpan={5}>Shipping ({order.shipping_method}): ${order.shipping_cost}</td>
                                </tr>
                                <tr className='text-end border-b border-[var(--bg)]'>
                                    <td className="py-1 font-bold" colSpan={5}>Grand Total : ${order.total}</td>
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