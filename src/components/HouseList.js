import React, { useContext } from 'react';

// Import Context
import { HouseContext } from './HouseContext';

// Import Components
import House from './House';

// Import Link
import { Link } from 'react-router-dom';

// Import Icons
import { ImSpinner2 } from 'react-icons/im';




const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  // If Loading is true
  if (loading) {
    return (<ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4xl mt-[200px]' />
    );
  }
  

  if (houses.length < 1){
    return <div className='text-center text-3xl text-gray-400 mt-48'>Sorry, Nothing Found</div>
  }

  return ( 
    <section className='mb-20'>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
            {houses.map((house, index) => {
              return(
                <Link to={`/property/${house.id}`} key= {index}>
                  <House house={house} />
                </Link>
              );
            })}
          </div>
        </div>
    </section>
  );  
};

export default HouseList;
