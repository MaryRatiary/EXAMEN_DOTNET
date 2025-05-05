import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaCartArrowDown } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation';
import CategoryPanel from './Navigation/CategoryPanel'; // Ensure this import

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const Header = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = React.useState(false);

  return (
   <header className='bg-white'>
    <div className='top-strip py-2 border-t-[1px] border-b-amber-250 border-b-[1px]'> 
    <div  className='container'> 
        <div className='flex items-center justify-between'> 
            <div className='col1 w-[50%]'>
                <p className="text-[15px] font-[300]">Retrouvez tous les produit fascinants de Madagscar avec les prix abordables!!</p>    
            </div>
            <div className='col2 flex items-center justify-end'>
                <ul className=' flex items-center gap-3'>
                    <li className='list-none'>
                        <Link to="/Home" className='link text-[13px] font-[500] transition'> Aide</Link> 
                    </li>|
                    <li className='list-none'>
                        <Link to="/order tracking" className='link text-[13px] font-[500] transition'> Recommandation</Link> 
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    <div className='top-strip py-2 border-t-[1px] border-b-amber-250 border-b-[1px] '>
        <div className=' container flex items-center gap-5 w-full '>
            <div className='col1 w-10% mr-3 '>     
                <Link to={"/"}><img src="logoo-removebg-preview.png" className='w-70 h-20 mt-3 !ml-0' ></img></Link>
            </div>
            <div className='col2 w-[55%]'>
                <Search/>
            </div>
            <div className='col3 w-[30%]flex items-center pl-7'>
                <ul className='flex items-center justify-end gap-5'>
                    <li className='list-none'>
                        <Link to="/login" className='link transition text-[15px] font-500'>Login</Link> | &nbsp;
                        <Link to="/register" className='link transition text-[15px] font-500'>Register</Link>
                    </li>
                    <li>
                        <Tooltip title="Compare">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="success">
                                    <IoGitCompare className='text-blue-600'/>
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Cart">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="success">
                                    <FaCartArrowDown className='text-blue-600'/>
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Wishlist">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="success">
                                    <FaRegHeart className='text-blue-600'/>
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <Navigation/>
    <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
   </header>
  )
}
export default Header;