import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { FaUser } from 'react-icons/fa'
import blank_user from '/images/blank_user.png'
import { PiNotePencilThin } from "react-icons/pi";
import { useMessage } from '../../context/MessageProvider';

function Account() {
  const { user, updateUser } = useContext(AppContext)
  const {updateMessage} = useMessage()
  const [formData, setFormData] = useState(user)
  // track if has any change
  const [isChange, setIsChange] = useState(false)
  const [preview, setPreview] = useState(formData.profile_image || null);
  useEffect(() => {
    setIsChange(JSON.stringify(formData) !== JSON.stringify(user));
  }, [formData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_image: file });
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    for (let key in formData) {
      if (key === "profile_image" && !(formData[key] instanceof File)) continue; // skip if not a file
      formDataToSend.append(key, formData[key] ?? "");
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/account/update/", {
        method: "PUT", // or POST
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // after successfull response
      if (res.ok) {
        const data = await res.json();
        console.log("Updated:", data);
        updateUser(data.user)
        updateMessage(data.message)
        setTimeout(() => {
          updateMessage(null);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='w-full py-5 grid lg:grid-cols-3 grid-cols-1 gap-5'>
        <div className='lg:order-2 w-full flex justify-center items-center'>
          <div className='border-2 border-[var(--sbg)] p-1 rounded-full relative'>
            <img
              src={preview ? preview : blank_user}
              alt="Profile"
              className="w-50 h-50 mx-auto rounded-full object-cover"
            />
            <input
              name='profile_image'
              id='profile_image'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label className='px-2 py-[2px] border absolute bottom-0 right-5 bg-[var(--sbg)] rounded text-white hover:border-[var(--sbg)] font-medium' htmlFor="profile_image">Edit</label>
          </div>
        </div>
        <div className='w-full col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2'>
          {/* username */}
          <div className='col-span-2'>
            <label htmlFor="username" className='input_label'>Username:</label>
            <input disabled className='input_bg' type="text" name='username' placeholder='Type Here...' value={formData?.username} />
          </div>
          {/* email */}
          <div className='col-span-2'>
            <label htmlFor="email" className='input_label'>Eamil:</label>
            <input disabled className='input_bg ' type="email" name='email' placeholder='Type Here...' value={formData?.email} />
          </div>
          {/* firstname */}
          <div className='col-span-2'>
            <label htmlFor="first_name" className='input_label'>First Name:</label>
            <input
              onChange={handleChange}
              className='input_bg' type="text" name='first_name' placeholder='Type Here...'
              value={formData?.first_name} />
          </div>
          {/* last name */}
          <div className='col-span-2'>
            <label htmlFor="last_name" className='input_label'>Last Name:</label>
            <input
              onChange={handleChange}
              className='input_bg' type="text" name='last_name' placeholder='Type Here...'
              value={formData?.last_name} />
          </div>
          {/* phone number */}
          <div className='col-span-2'>
            <label htmlFor="phone_number" className='input_label'>Phone Number:</label>
            <input
              onChange={handleChange}
              className='input_bg ' type="tel" name='phone_number' placeholder='Type Here...'
              value={formData?.phone_number}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          {/* address */}
          <div className='col-span-2'>
            <label htmlFor="address" className='input_label'>Address:</label>
            <input
              onChange={handleChange}
              className='input_bg ' type="text" name='address' placeholder='Type Here...'
              value={formData?.address || ''} />
          </div>
          {/* date of birth */}
          <div className='col-span-2'>
            <label htmlFor="date_of_birth" className='input_label'>Date of birth:</label>
            <input
              onChange={handleChange}
              className='input_bg ' type="date" name='date_of_birth' placeholder='Choose Date...'
              value={formData?.date_of_birth || ' '} />
          </div>
          <div className='col-span-4'>
            <button disabled={!isChange} type="submit" className={`${isChange ? 'btn' : 'btn_disable'} text-sm flex gap-2 items-center mt-5`}><PiNotePencilThin className='text-xl' />Update Changes</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Account