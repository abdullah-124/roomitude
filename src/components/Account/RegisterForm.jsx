// src/pages/Register.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Register = ({ setMode }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false)
    const password = watch('password', '');

    const onSubmit = async (data) => {
        const { confirm_password, ...payload } = data;
        setLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:8000/api/account/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                navigate('/verify_email')
            } else {
                alert(result.detail || 'Registration failed.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className="rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space">
                {/* First Name */}
                <div className='flex gap-2'>
                    <input
                        type="text"
                        placeholder="First Name"
                        className='form_input'
                        {...register('first_name', { required: 'First name is required' })}
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                    {/* Last Name */}
                    <input
                        type="text"
                        placeholder="Last Name"
                        className='form_input'
                        {...register('last_name', { required: 'Last name is required' })}
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                </div>



                {/* Username */}
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        className='form_input'
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className='form_input'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className='form_input'
                        {...register('phone_number', { required: 'Phone number is required' })}
                    />
                    {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className='form_input'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className='form_input'
                        {...register('confirm_password', {
                            required: 'Confirm password is required',
                            validate: value => value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                </div>

                {/* Submit */}
                {
                    loading ? <p className='btn block w-full mt-5'>Submiting...</p> :
                        <button
                            type="submit"
                            className="btn block w-full mt-5"
                        >
                            Register
                        </button>
                }
            </form>
            <h5 className='py-3 text-center'>Already have an account? <span className='cursor-default font-bold text_hl' onClick={() => setMode('signin')}>sign in</span></h5>
        </div>
    );
};

export default Register;
