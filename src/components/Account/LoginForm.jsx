import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { useMessage } from '../../context/MessageProvider';
import NotFound from '../Notfound/NotFound';

export default function LoginForm() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const { user, updateUser, setCarts, setWishlist } = useContext(AppContext)
    const { updateMessage } = useMessage()
    const [formData, setFormData] = useState({ username: "", password: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,  // dynamically update the correct field
        }));
    };
    const handleLogin = async (e) => {
        console.log(formData)
        e.preventDefault();
        setError("");
        setLoading(true)
        try {
            const res = await fetch(`${apiUrl}/api/account/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || "Login failed");
                return;
            }
            //  AFTER SUCCESFUL LOGIN
            const data = await res.json();
            // console.log(data)
            // Save tokens in localStorage
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            updateUser(data.user);
            setCarts(data.cart);
            setWishlist(data.wishlist)
            console.log('after login your data is ', data)
            // Redirect to original page or home
            // show message
            updateMessage({ 'text': 'Login successful', 'status': 'success' })
            setTimeout(() => {
                updateMessage(null)
            }, 2000)
            navigate(from, { replace: true });
            // Clear input fields
            setFormData({ username: "", password: "" })
        } catch (err) {
            setError("Network error");
        }
        finally {
            setLoading(false)
        }
    };
    if (user) return <NotFound />
    return (
        <section className='container'>
            <div className='pt-10  sm:w-2/3 md:w/1/2 lg:w-1/3 mx-auto p-5 shadow-2xl rounded-lg mb-10'>
                {
                    // error message 
                    error && <div className='mb-2 px-2 rounded flex items-center justify-between p-1 bg-red-300 text-red-600'>
                        <p>{error}</p>
                        <IoMdClose onClick={() => setError('')} className='text-2xl hover:border hover:border-red-400 rounded' />
                    </div>
                }
                <form onSubmit={handleLogin}>
                    <h2 className='text-xl pb-5 font-bold text-center'>Sign In</h2>

                    <input onChange={(e) => handleChange(e)} className='form_input' type="text" name="username" placeholder='Username' required />
                    <input onChange={(e) => handleChange(e)} className='form_input' type="password" name="password" placeholder='password' required />
                    {
                        loading ? <p className='block mt-5 w-full btn_disable' >Submitting...</p>
                            : <button className='block mt-5 w-full btn' type="submit">Login</button>
                    }
                    <p className='my-4 text-center'>Don't have account? <Link to='/account/register' className='text_hl'>Sign Up</Link></p>
                </form>
            </div>
        </section>
    )
}
