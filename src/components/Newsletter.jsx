import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };




  const subscribe = async () => { 
   await fetch('https://urban-space-backend.onrender.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        console.log('Subscription successful!')
        toast("Email Sent!");
        setEmail("")
        if (response.ok) {
          setSubscriptionStatus('Subscription successful!');
          console.log('Subscription successful!')
        } else {
          setSubscriptionStatus('Subscription failed. Please try again later.');
          console.log('Subscription failed. Please try again later.')
        }
      })
      .catch((error) => {
        console.error('Error subscribing to newsletter:', error);
        console.log(error)
        setSubscriptionStatus('Subscription failed. Please try again later.');
      });
  };


  

  // const notify = () => toast("Wow so easy!");
  // useEffect(()=>{
  //   toast("Email Sent!");
  // },[])

  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Get notified about offers and discounts on services!
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={handleEmailChange}
              
            />
            <button
              className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'
              onClick={subscribe}
            >
              Notify Me
            </button>
          </div>
          {subscriptionStatus && <p style={{
            color:'white'
          }}>{subscriptionStatus}</p>}
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-[#00df9a]'>Privacy Policy.</span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Newsletter;
