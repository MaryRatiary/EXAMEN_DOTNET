import React from 'react'
import '../Search/style.css'
import { FaSearch } from "react-icons/fa";
import Button from '@mui/material/Button';

const Search
 = () => {
  return (
   <div className='SearchBox w-full h-[50px] bg-gray-200 rounded-[5px] relative p-2 margin-[0px]'> 
    <input type='text' placeholder='Search for products...' 
    className='w-full h-full focus:outline-none bg-inherit p-2 text-[15px]' ></input>
    <Button className='!absolute top-[7px] right-[5px] z-50 !w-[65px] !m-w[35px] h-[35px] !rounded-full !text-black'>
        <FaSearch  className=' text-blue-400 text-[22px]'/></Button>


   </div>
  )
}
export default Search;
