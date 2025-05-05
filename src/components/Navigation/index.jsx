import Button from '@mui/material/Button';
import React, {useState} from 'react'
import { RiMenu2Fill } from 'react-icons/ri';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';
import "./style.css";

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
   
  const openCategoryPanel = () => {
    setIsOpenCatPanel(true)
  }

  return (
    <>
    <nav className='py-2'>
      <div className='container flex items-center justify-end'>
        <div className='col_1 w-[30%]'>
          <Button className='!text-black gap-2' onClick={openCategoryPanel}>
            <RiMenu2Fill className='text-[18px]' />
            Shop By Categories 
            <TfiAngleDoubleDown className='ml-auto text-[13px] font-bold cursor-pointer'/>
          </Button>
        </div>
        <div className='col_2 w-[60%] text-[15px]'>
          <ul className='flex items-center gap-5 nav'>
            <li className='list-none'>
              <Link to='/' className='link transition !font-[500]'> 
                <Button className='link transition !text-[rgba(0,0,0,1)] hover:!text-blue-800'>Accueil</Button>
              </Link>
            </li>
              
            <li className='list-none relative'>
              <Link to='/products' className='link transition'>
                <Button className='link transition !text-[rgba(0,0,0,1)] hover:!text-blue-800'>Pierres Précieuses</Button>
              </Link>
              <div className='submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all'>
                <ul>
                  <li className='list-none w-full'>
                    <Link to="/products/saphirs" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Saphirs</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/products/rubis" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Rubis</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/products/emeraudes" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Émeraudes</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/products/tourmalines" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Tourmalines</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>|

            <li className='list-none relative'>
              <Link to='/jewelry' className='link transition'> 
                <Button className='link transition !text-[rgba(0,0,0,1)] hover:!text-blue-800'>Bijouterie</Button>
              </Link>
              <div className='submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all'>
                <ul>
                  <li className='list-none w-full'>
                    <Link to="/jewelry/bagues" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Bagues</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/jewelry/colliers" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Colliers</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/jewelry/bracelets" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Bracelets</Button>
                    </Link>
                  </li>
                  <li className='list-none w-full'>
                    <Link to="/jewelry/boucles" className="w-full">
                      <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>Boucles d'oreilles</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>|

            <li className='list-none'>
              <Link to='/about' className='link transition'> 
                <Button className='link transition !text-[rgba(0,0,0,1)] hover:!text-blue-800'>À Propos</Button>
              </Link>
            </li>

            <li className='list-none'>
              <Link to='/contact' className='link transition'> 
                <Button className='link transition !text-[rgba(0,0,0,1)] hover:!text-blue-800'>Contact</Button>
              </Link>
            </li>
          </ul>
        </div>

        <div className='col_2 w-[20%]'>
          <p className='text-[14px] font-[500] flex items-center mb-0 mt-0 gap-3 text-blue-800'> 
            <GoRocket className='text-[18px] text-red-800'/>
            Livraison internationale gratuite
          </p>
        </div>
      </div>
    </nav>

    <CategoryPanel 
      openCategoryPanel={openCategoryPanel} 
      isOpenCatPanel={isOpenCatPanel}
      setIsOpenCatPanel={setIsOpenCatPanel}
    />
    </>
  )   
}

export default Navigation;
