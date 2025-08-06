// src/pages/VerifyEmail.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setStatus("no token found.");
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/account/verify-email/?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          // Save JWT tokens and user data to localStorage (or cookie)
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          localStorage.setItem('user', JSON.stringify(data.user));

          setStatus("Email verified! Redirecting...");
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
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
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyEmail;
