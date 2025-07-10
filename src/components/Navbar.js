import React from 'react';

const Navbar = ({ user, onSignIn, onSignUp, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-pink-600">Excel Analytics</div>
      <div>
        {!user ? (
          <>
            <button onClick={onSignIn} className="mr-4 px-4 py-2 bg-navy-500 text-white rounded hover:bg-navy-600">Sign In</button>
            <button onClick={onSignUp} className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Sign Up</button>
          </>
        ) : (
          <button onClick={onLogout} className="px-4 py-2 bg-navy-500 text-white rounded hover:bg-navy-600">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 