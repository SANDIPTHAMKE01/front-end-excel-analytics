import React, { useState } from 'react';
import axios from 'axios';

const OTPVerification = ({ email, onVerification, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/verify-otp', {
        email: email,
        otp: otp
      });
      
      if (response.data.success) {
        onVerification(response.data.user, response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-navy-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-navy-600">
            We've sent a verification code to{' '}
            <span className="font-medium text-pink-600">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-navy-300 placeholder-navy-500 text-navy-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-navy-50"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-navy-700">
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              maxLength="6"
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-navy-300 placeholder-navy-500 text-navy-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-center text-2xl tracking-widest"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-2 px-4 border border-navy-300 rounded-md shadow-sm text-sm font-medium text-navy-700 bg-white hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-navy-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="font-medium text-pink-600 hover:text-pink-500"
              onClick={() => {
                // Resend OTP functionality
                console.log('Resend OTP');
              }}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification; 