import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router';
import { useMessage } from '../../context/MessageProvider';

export default function LoginForm({ setMode, setError }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const { updateUser, setCarts, setWishlist } = useContext(AppContext)
    const {updateMessage} = useMessage()
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
            const res = await fetch("http://127.0.0.1:8000/api/account/login/", {
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
            console.log('after login your data is ',data)
            // Redirect to original page or home
            // show message
            updateMessage({ 'text': 'Login successful', 'status': 'success' })
            setTimeout(()=>{
                updateMessage(null)
            }, 2000)
            navigate(from, { replace: true });
            // Clear input fields
            setFormData({ username: "", password: "" })
        } catch (err) {
            setError("Network error");
        }
        finally{
            setLoading(false)
        }
    };
    return (
        <form onSubmit={handleLogin}>
            <h2 className='text-xl pb-5 font-bold text-center'>Sign In</h2>
            
            <input onChange={(e) => handleChange(e)} className='form_input' type="text" name="username" placeholder='Username' required />
            <input onChange={(e) => handleChange(e)} className='form_input' type="password" name="password" placeholder='password' required />
            {
                loading?<p className='block mt-5 w-full btn_disable' >Submitting...</p>
                :<button className='block mt-5 w-full btn' type="submit">Login</button>
            }
            <p className='my-4 text-center'>Don't have account? <span onClick={() => setMode('signup')} className='text_hl'>Sign Up</span></p>
        </form>
    )
}
