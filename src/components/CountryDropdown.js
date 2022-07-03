import React, { useState, useContext } from 'react';

// Import Icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine  } from 'react-icons/ri';

// Import Headless ui components
import { Menu } from '@headlessui/react';

// Import House Context
import { HouseContext } from './HouseContext';

const CountryDropdown = () => {
  const {country, setCountry, countries} = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button 
      onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiMapPinLine className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{country}</div>
          <div className='text-[13px]'>Select Your Place</div>
        </div>  
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary'/>
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>

      <Menu.Items className='dropdown-menu'>
        {countries.map((country, index) => {
          return (
            <Menu.Item
              as='li' 
              onClick={() => setCountry(country)}
              className='cursor-pointer hover:text-violet-700 transition' 
              key={index}>
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
