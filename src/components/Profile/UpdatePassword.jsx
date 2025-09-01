import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useMessage } from '../../context/MessageProvider';

function UpdatePassword() {
  const apiURL = import.meta.env.VITE_API_URL
  const {setToast} = useMessage()
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const handle_change = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handle_submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Handle form submission
    // console.log(formData);
    try {
      const res = await fetch(`${apiURL}/api/account/change-password/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        throw new Error('Failed to update password');
      }
      // if success
      const data = await res.json();
      setToast(data.message, 'success', 2000)
      
    } catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false)
    }
  };
  return (
    <main className='pb-10'>
      <section className='border_bg md:w-2/3 lg:w-1/2 w-full mx-auto p-5 rounded'>
        <form action="" onSubmit={(e) => handle_submit(e)}>
          <h3 className='text-xl font-semibold mb-5 text-center'>Change Password</h3>
          {error && <div className='text-red-500 bg-red-300 p-2 rounded flex justify-between items-center'>
            <p >{error}</p>
            <button className='text-2xl hover:bg-red-400 rounded' onClick={() => setError(null)}><IoCloseSharp /></button>
          </div>}

          <div className='mt-2'>
            <label className='input_label' htmlFor="current_password">Current Password</label>
            <input required className="form_input" type="password" id="current_password" value={formData.current_password} onChange={handle_change} />
          </div>
          <div className='mt-2'>
            <label className='input_label' htmlFor="new_password">New Password</label>
            <input required className="form_input" type="password" id="new_password" value={formData.new_password} onChange={handle_change} />
          </div>
          <div className='mt-2'>
            <label className='input_label' htmlFor="confirm_password">Confirm Password</label>
            <input required className="form_input" type="password" id="confirm_password" value={formData.confirm_password} onChange={handle_change} />
          </div>
          <button disabled={loading} type='submit' className='btn w-full mt-5'>Update Password</button>
        </form>
      </section>
    </main>
  )
}

export default UpdatePassword