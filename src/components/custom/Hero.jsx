"use client";
import React from 'react'
import { AuroraText, InteractiveHoverButton } from '@/index'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 text-center'>
      <h1 className='font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-8 leading-tight'>
        Plan your next adventure with AI: <br />
        <AuroraText>Personalized itineraries at your fingertips</AuroraText>
      </h1>
      <p className='text-gray-500 mt-4 text-base sm:text-lg max-w-2xl'>
        Your personal trip planner and travel curator, creating custom 
        itineraries tailored to your interests and budget.
      </p>
      <Link to={'/initialise-trip'}>
        <InteractiveHoverButton className='mt-8 text-base sm:text-lg'>Get Started</InteractiveHoverButton>
      </Link>

      <img src="/LandingPage.png" className="-mt-20"  />
    </div>
  )
}

export default Hero
