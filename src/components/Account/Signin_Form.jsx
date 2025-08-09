import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router';

export default function Signin_Form({ setMode }) {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const { updateUser, updateMessage } = useContext(AppContext)
    const [error, setError] = useState('')
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
                setError(errorData.detail || "Login failed");
                updateMessage({ 'text': error, 'status': 'error' })
                return;
            }
            //  AFTER SUCCESFUL LOGIN
            const data = await res.json();
            // console.log(data)
            // Save tokens in localStorage
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            updateUser(data.user)
            // Redirect to original page or home
            navigate(from, { replace: true });
            // show message
            updateMessage({ 'text': 'Login successful', 'status': 'success' })
            setInterval(() => {
                updateMessage(null)
            }, 2000);
            // Clear input fields
            setFormData({ username: "", password: "" })
        } catch (err) {
            setError("Network error");
        }
    };
    return (
        <form onSubmit={handleLogin}>
            <h2 className='text-xl pb-5 font-bold text-center'>Sign In</h2>
            <input onChange={(e) => handleChange(e)} className='form_input' type="text" name="username" placeholder='Username' required />
            <input onChange={(e) => handleChange(e)} className='form_input' type="password" name="password" placeholder='password' required />
            {
                <button className='block mt-5 w-full btn' type="submit">Login</button>
            }
            <p className='my-4 text-center'>Don't have account? <span onClick={() => setMode('signup')} className='text_hl'>Sign Up</span></p>
        </form>
    )
}
