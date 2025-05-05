import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa6";

import "../Navigation/style.css";
import { Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa6";


const CategoryPanel = (props) => {
    const [submenuIndex, SetSubmenuIndex] = useState(null);
    const [InnerSubmenuIndex, InnerSetSubmenuIndex] = useState(null);

    const toggleDrawer = (newOpen)=> () => {
        props.setIsOpenCatPanel(newOpen)
    };

const openSubmenu = (index) => {
  if(submenuIndex===index){
    SetSubmenuIndex(null);
  }else{
    SetSubmenuIndex(index);
  }
};
const openInnerSubmenu = (index) => {
  if(InnerSubmenuIndex===index){
    InnerSetSubmenuIndex(null);
  }else{
    InnerSetSubmenuIndex(index);
  }
};

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">

      <h3 className="p-3  font-[500] text-[18px] flex items-center justify-between top-strip border-t-[1px] border-b-amber-250 border-b-[1px]"> Acheter par catégorie 
         <IoCloseSharp onClick={toggleDrawer(false)} className='cursor-pointer text-[20px]' /> </h3>

    <div className="scroll">
      <ul className='w-full'>
        <li className='list-none flex items-center relative flex-col'>
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Pierres Précieuses
       </Button> </Link>
       {submenuIndex=== 0 ? (
         
         <FaChevronUp className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(0)}/>
        ):(
          <FaChevronDown className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(0)}/>
      ) 
       }
       
        {
          submenuIndex===0 &&

          <ul className='inner_submenu  w-full pl-3 '>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Diamants</Button> </Link>
             {InnerSubmenuIndex=== 0 ? (
         
         < FaChevronUp className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(0)}/>
       ):(
         < FaChevronDown className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openInnerSubmenu(0)}/>
     )
      } 
         
         {
          InnerSubmenuIndex===0 &&

          <ul className='submenu w-full pl-3 flex-col'>
          <li className='list-none relative mb-1 '>
          <Link to="/" className='link w-full !text-left !justify-start !px-3 transition text-[14px] ' >
           Rubis</Link>
          </li>
          
          <li className='list-none relative mb-1'>
          <Link to="/" className='link w-full !text-left !justify-start !px-3 transition text-[14px] ' >
           Saphir</Link>
          </li>

          <li className='list-none relative mb-1'>
          <Link to="/" className='link w-full !text-left !justify-start !px-3 transition text-[14px] ' >
           Émeraude</Link>
          </li>

          <li className='list-none relative mb-1'>
          <Link to="/" className='link w-full !text-left !justify-start !px-3 transition text-[14px] ' >
           Topaze</Link>
          </li>

          </ul>
}
          </li>

          </ul>
        
        
        }

       
         
        </li>

        {/* Bijouterie category */}
        <li className='list-none flex items-center relative flex-col'>
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Bijouterie
       </Button> </Link>
       {submenuIndex=== 1 ? (
         
          <FaChevronUp className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(1)}/>
        ):(
          < FaChevronDown className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(1)}/>
      )
       }
       
        {
          submenuIndex===1 &&

          <ul className='inner_submenu  w-full pl-3 '>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Colliers</Button> </Link>
          </li>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Bagues</Button> </Link>
          </li>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Bracelets</Button> </Link>
          </li>
          </ul>
        }
        </li>

        {/* Produits Artisanal category */}
        <li className='list-none flex items-center relative flex-col mb-5' >
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Produits Artisanal
       </Button> </ Link>
       {submenuIndex=== 2 ? (
         
          <FaChevronUp className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(2)}/>
        ):(
          <FaChevronDown className='absolute top-[10px] right-[15px] cursor-pointer' onClick={()=>openSubmenu(2)}/>
      )
       }
       
        {
          submenuIndex===2 &&

          <ul className='inner_submenu  w-full pl-3 '>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Bijoux Artisanaux</Button> </Link>
          </li>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Sculptures</Button> </Link>
          </li>
          <li className='list-none relative'>
         <Link to="/" className='w-full'>
          <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)] text-[16px] ' >
             Peintures</Button> </Link>
          </li>
          </ul>
        }
        </li>

        {/* Other categories */}
        <li className='list-none flex items-center relative flex-col'>
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Contact
       </Button> </Link>
       </li>
       <li className='list-none flex items-center relative flex-col'>
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Email
       </Button> </Link>
       </li>
       <li className='list-none flex items-center relative flex-col'>
              <Link to="/" className="w-full ">
       <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,1)] ' > Spam
       </Button> </Link>
       </li>

      </ul>
    </div>
     
    </Box>
  );

  return (
    <>
    
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
    </>
  )
}

export default CategoryPanel;
