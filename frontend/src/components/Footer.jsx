import React from 'react'

const Footer = () => {

  return (
    <div className='flex justify-end items-end h-2/5'>
      <div className='bg-gray-900 h-full w-full'>

        <div className='flex flex-col md:flex-row justify-between p-6 gap-6'>

          <div className='flex-1'>
            <h2 className='text-blue-50 font-bold text-lg'>About Us</h2>
            <p className='text-blue-50'>We provide excellent services to <br />help you achieve your goals.</p>
          </div>

          <div className='flex-1'>
            <h2 className='text-blue-50 font-bold text-lg'>Quick Links</h2>
            <ul>
              <li className='text-blue-50'><a href='/'>Home</a></li>
              <li className='text-blue-50'><a href='/aboutus'>About</a></li>
              <li className='text-blue-50'><a href='/contact'>Contact</a></li>
            </ul>
          </div>


          <div className='flex-1'>
            <h2 className='text-blue-50 font-bold text-lg'>Contact Us</h2>
            <p className='text-blue-50'>Email: careerdepott@hotmail.com</p>
            <p className='text-blue-50'>Phone: +91 99999 99991</p>
          </div>
        </div>

        <div className='text-center py-4 border-t border-gray-700'>
          <p className='text-blue-50'>&copy; 2025 Your Company. All Rights Reserved. <br />Made with ❤️ by <a href='https://github.com/PrithviSChauhan' target="_blank" rel="noopener noreferrer">Prithvi</a></p>
        </div>
      </div>
    </div>
  )
}

export default Footer
