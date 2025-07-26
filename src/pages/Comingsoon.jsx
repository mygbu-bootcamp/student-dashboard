import React, { useState, useEffect } from 'react';

// Main App component for the Coming Soon page
const App = () => {
  // State to hold the remaining time for the countdown
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // State for the email input field
  const [email, setEmail] = useState('');
  // State for the submission message (e.g., success or error)
  const [message, setMessage] = useState('');

  // Effect hook to update the countdown every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timeout if the component unmounts or timeLeft changes
    return () => clearTimeout(timer);
  });

  // Function to calculate the remaining time until the target date
  function calculateTimeLeft() {
    // Set your target date here (e.g., August 1, 2025)
    // Adjust the month (0-indexed) and day as needed
    const targetDate = new Date('2025-08-01T00:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // If the target date has passed, set all to 0
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (email && email.includes('@') && email.includes('.')) {
      // In a real application, you would send this email to your backend
      // For this example, we'll just show a success message
      setMessage('Thank you for signing up for updates!');
      setEmail(''); // Clear the email field
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  // Render the countdown timer elements
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && interval !== 'seconds') {
      return null; // Don't render if value is 0 and it's not seconds
    }

    return (
      <span key={interval} className="text-4xl md:text-5xl font-bold text-indigo-600 mx-2">
        {String(timeLeft[interval]).padStart(2, '0')} <span className="block text-base font-normal text-gray-600 uppercase">{interval}</span>
      </span>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          We're Launching Soon!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Get ready for something amazing. We're working hard to bring you a fantastic experience.
        </p>

        {/* Countdown Timer Section */}
        <div className="flex justify-center items-center mb-12">
          {timerComponents.length ? timerComponents : <span className="text-4xl md:text-5xl font-bold text-indigo-600">Launching Now!</span>}
        </div>

        {/* Email Signup Form */}
        <div className="max-w-md mx-auto">
          <p className="text-md md:text-lg text-gray-700 mb-4">
            Want to be notified when we launch? Enter your email below!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={handleEmailChange}
              className="flex-grow p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-lg"
            >
              Notify Me
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-md font-medium text-indigo-700">
              {message}
            </p>
          )}
        </div>

        {/* Social Media Links (Optional) */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Facebook</a>
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;