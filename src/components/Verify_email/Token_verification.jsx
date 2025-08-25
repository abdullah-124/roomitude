// src/pages/VerifyEmail.js
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AppContext } from '../../context/AppContext';
import { useMessage } from '../../context/MessageProvider';

const VerifyEmail = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {updateUser} = useContext(AppContext)
  const {updateMessage} = useMessage()
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const uid = queryParams.get('uid');

      if (!token || !uid) {
        setStatus("Something missing !!!");
        return;
      }

      try {
        // this will make an request to my backend 
        const res = await fetch(`${apiUrl}/api/account/verify-email/?uid=${uid}&token=${token}`);
        const data = await res.json();

        if (res.ok) {
          // Save JWT tokens and user data to localStorage (or cookie)
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          updateUser(data.user);
          updateMessage(null)
          setStatus("Email is verified! Redirecting...");
          setTimeout(() => {
            navigate('/profile/account');
          }, 2000);
        } else {
          setStatus(data.detail || "Verification failed.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div className='text-center p-10'>
      <h2 className="font-medium text_hl animate-pulse">{status}</h2>
    </div>
  );
};

export default VerifyEmail;
