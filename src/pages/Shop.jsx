import React from 'react'
import ProductCard from '../components/UI/ProductCard'
import Select from '../components/UI/Select'
import Button from '../components/UI/Button'
import { Link } from 'react-router'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { FaChevronDown } from 'react-icons/fa'

const Shop = () => {
    const Sortoption = [
        {
        value: "newest_item",
        label:"Newest Item"
    },
        {
        value: "lowest_item",
        label:"Lowest Item"
    },
        {
        value: "oldest_item",
        label:"Oldest Item"
    }
]
  const categories = [
      
        {
            title: "Men Fashion",
        },
        {
            title: "Kids Fashion",
        },
        {
            title: "Groceries",
        },
        {
            title: "Women’s Fashion",
        }
    ]
  return (
    <main className='py-13'>
        <div className="container grid grid-cols-12 gap-12">
            {/* SideBar */}
            <div className='col-span-3 bg-white py-6 px-5 h-fit sticky top-0 left-0'>
                 <h3 className='text-lg font-medium text-primary'>Related Categories</h3>
                    <div className='space-y-1.5'>
                        {
                            categories.map((item) => (
                                <Link to="/shop" key={item.title} className='block text-base text-secondary'>
                                    {item.title}
                                </Link>
                            ))
                        }
                    </div>
                    <div className='py-6 my-6 border-y-2 border-y-secondary/10'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-lg  font-medium text-primary'>Filter by Price</h3>
                            <FaChevronDown className='text-lg font-medium text-primary cursor-pointer'/>
                        </div>
                        <input type="range" name="" id="" className='w-full my-6 accent-rose-950'/>
                        <p>Price: ৳1000 - ৳2500 </p>
                    </div>
            </div>

            {/* Card */}
            <div className='col-span-9'>
                <div className='flex justify-between items-center'>
                    <p className='text-medium text-secondary/50'> Showing  <span className='text-primary text-lg'> 20 </span> of <span className='text-primary text-lg'> 160 </span> product </p>
                    <div className='flex items-center gap-3 w-fit'>
                        <p className='text-base text-secondary/50 whitespace-nowrap'>Sort By:</p>
                        <Select className='max-w-44' options={Sortoption}/>
                    </div>

                </div>
                <div className='pt-5 grid grid-cols-3 gap-6'>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-1.png" price="৳10500"/>
                    <ProductCard head="Women fashion dress set" img="Features-2.png" price="৳1000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-3.png" price="৳5000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-4.png" price="৳1000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-5.png" price="৳10500"/>
                    <ProductCard head="Women fashion dress set" img="Features-6.png" price="৳1000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-7.png" price="৳5000"/>
                    <ProductCard head="Women black dress and red hat collectio0" img="Features-8.png" price="৳1000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-9.png" price="৳10500"/>
                    <ProductCard head="Women fashion dress set" img="Features-10.png" price="৳1000"/>
                    <ProductCard head="Headrest Executive Mesh Office Chairset" img="Features-11.png" price="৳5000"/>
                    <ProductCard head="Women black dress and red hat collectio0" img="Features-12.png" price="৳1000"/>
                </div>
                <Link to="Shop" className='flex items-center justify-end gap-4 pt-10'>
                   <Button className='bg-white button-arrow  shadow flex items-center'>
                    <MdArrowBackIos />
                    Previous
                   </Button>
                     <div>
                       <Button className='rounded-r-none'>1</Button>
                       <Button className='bg-white  button-arrow shadow rounded-none'>2</Button>
                       <Button className='bg-white button-arrow  shadow rounded-l-none'>3</Button>
                     </div>
                   <Button className='bg-white button-arrow  shadow flex items-center'>
                    
                    Next
                    <MdArrowForwardIos />

                    </Button>  
                </Link>
            </div>
        </div>
    </main>
  )
}

export default Shop