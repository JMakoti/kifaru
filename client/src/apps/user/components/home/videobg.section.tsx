// src/components/OpenCallSection.tsx
import React from 'react'

const OpenCallSection: React.FC = () => {
  // Create the grid of numbers 1-10
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Rotated number grid background */}
      <div className="absolute inset-0 overflow-hidden -rotate-45 opacity-10">
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-12 p-12">
          {numbers.map((num) => (
            <div
              key={num}
              className="flex items-center justify-center"
            >
              <span className="text-white text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter">
                {num}
              </span>
            </div>
          ))}
        </div>
        
        {/* Additional rotated grid lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Diagonal pattern overlay */}
      <div 
        className="absolute inset-0 rotate-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(74, 222, 128, 0.05) 20px,
            rgba(74, 222, 128, 0.05) 40px
          )`,
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Large OPEN text with gradient shadow */}
        <div className="relative inline-block mb-[-0.1em]">
          {/* Gradient glow effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-xl blur-2xl opacity-20 animate-pulse-slow" />
          
          {/* Main OPEN text */}
          <h1 
            className="relative text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-tight leading-[0.85] text-white"
            style={{
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            OPEN
          </h1>
        </div>
        
        {/* Call text and subtitle */}
        <div className="mt-[-0.3em]">
          <h2 
            className="text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-tight leading-[0.85] text-white mb-2"
            style={{
              textShadow: '0 8px 16px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Call
          </h2>
          
          {/* Subtitle */}
          <div className="mt-6 md:mt-10 lg:mt-12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-gray-300 tracking-wider uppercase">
              for waste management startups
            </p>
          </div>
        </div>
        
        {/* Decorative elements matching the rotated theme */}
        <div className="mt-16 flex flex-col items-center">
          {/* Rotated decorative line */}
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rotate-45 mb-8" />
          
          {/* Decorative dots in diagonal pattern */}
          <div className="flex space-x-6 rotate-45">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Rotated gradient orbs */}
      <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-400/5 to-green-500/10 blur-3xl animate-float-slow -rotate-45" />
      <div className="absolute bottom-1/4 right-[15%] w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400/10 via-green-500/5 to-emerald-400/10 blur-3xl animate-float-slower rotate-45" />
      
      {/* Diagonal cut corners */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-green-500/30" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-black to-transparent" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-emerald-400/30" />
      </div>
      
      {/* Edge gradients with diagonal orientation */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent rotate-1 origin-top" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent -rotate-1 origin-bottom" />
    </div>
  )
}

export default OpenCallSection