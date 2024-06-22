// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';

// const AllTests = () => {
//     const axiosSecure = useAxiosSecure()
//     const axiosPublic = useAxiosPublic()
//     const Navigate=useNavigate()

//     const [selectedDate, setSelectedDate] = useState(null);

//     const { data: allTests = [], refetch } = useQuery({
//         queryKey: ["allTests"],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/alltest')
//             return res.data
//         }
//     })

//     const [searchTest, setSearchTest] = useState()

//     const handleSearch = (e) => {
//         e.preventDefault()
//         const getdate = e.target.date.value
//         let tosplitDate = getdate.split('-')

//         let date = parseInt(tosplitDate[2])
//         let month = parseInt(tosplitDate[1])
//         let year = parseInt(tosplitDate[0])
//         console.log(`${date}-${month}-${year}`);

//         axiosSecure.get(`/search-test/${date}/${month}/${year}`)
//             .then(res => {
//                 console.log(res.data);
//                 setSearchTest(res.data)
//             })
//     }
//     console.log('gggg', searchTest);

//     const handleAlltests = () => {
//         window.location.reload()
//         // Navigate('/allTests')
//         // return <Link to={'/allTests'}></Link>
//     }

//     const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

//     return (
//         <div>
//             <div className='flex justify-center items-center gap-14 my-10'>
//                 <div>
//                     <form action="" onSubmit={handleSearch} className='flex gap-2'>
//                         <input
//                             type="date"
//                             name='date'
//                             placeholder='Select date'
//                             className="input input-bordered w-full max-w-xs"
//                             min={today}  // Set the min attribute to today's date
//                         />
//                         <input type="submit" value="Search" className='btn' />
//                     </form>
//                 </div>
//                 {/* <div><p className='btn' onClick={handleAlltests}>See all tests </p></div> */}
//             </div>
//             <div className='flex justify-center '>
//                 {
//                     searchTest ? <>
//                         <div className=' grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-5'>
//                             {searchTest?.map(test =>
//                                 <div key={test._id} className="card w-96 bg-base-100 shadow-xl my-5 border-2">
//                                     <div className=''>
//                                         <img className='h-[200px] rounded-md' src={test.image} alt="Shoes" />
//                                     </div>
//                                     <div className="card-body">
//                                         <div className='flex justify-between'>
//                                             <h2 className="card-title">{test.name}</h2>
//                                             <h2 className="card-title">${test.price}</h2>
//                                         </div>
//                                         <p className='text-center'>{test.shortDes}</p>
//                                         <div className="card-actions justify-between items-center">
//                                             <Link to={`/details/${test._id}`}><button className="btn btn-primary">See Details</button></Link>
//                                             <p className='bg-green-400 bg-opacity-40 rounded-sm'>Available Slot : {test.slot}</p>
//                                         </div>
//                                         <div>
//                                             <p className='text-[1.1rem] bg-yellow-400 font-semibold py-3 rounded-md'>Test Date : {test.date}/{test.month}/{test.year}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </> : <>
//                         <div className=' grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-5'>
//                             {allTests?.map(test =>
//                                 <div key={test._id} className="card w-96 bg-base-100 shadow-xl my-5 border-2">
//                                     <div className=''>
//                                         <img className='h-[200px] rounded-md' src={test.image} alt="Shoes" />
//                                     </div>
//                                     <div className="card-body">
//                                         <div className='flex justify-between'>
//                                             <h2 className="card-title">{test.name}</h2>
//                                             <h2 className="card-title">${test.price}</h2>
//                                         </div>
//                                         <p className='text-center'>{test.shortDes}</p>
//                                         <div className="card-actions justify-between items-center">
//                                             <Link to={`/details/${test._id}`}><button className="btn btn-primary">See Details</button></Link>
//                                             <p className='bg-green-400 bg-opacity-40 rounded-sm'>Available Slot : {test.slot}</p>
//                                         </div>
//                                         <div>
//                                             <p className='text-[1.1rem] bg-yellow-400 font-semibold py-3 rounded-md'>Test Date : {test.date}/{test.month}/{test.year}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 }
//             </div>
//         </div>
//     );
// };

// export default AllTests;


// ----------------------------------------------------------------------------------


import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const AllTests = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { data: allTests = [], refetch } = useQuery({
        queryKey: ["allTests"],
        queryFn: async () => {
            const res = await axiosSecure.get('/alltest');
            return res.data;
        }
    });

    const [searchTest, setSearchTest] = useState();

    const handleSearch = (e) => {
        e.preventDefault();
        const getdate = e.target.date.value;
        let tosplitDate = getdate.split('-');

        let date = parseInt(tosplitDate[2]);
        let month = parseInt(tosplitDate[1]);
        let year = parseInt(tosplitDate[0]);
        console.log(`${date}-${month}-${year}`);

        axiosSecure.get(`/search-test/${date}/${month}/${year}`)
            .then(res => {
                console.log(res.data);
                setSearchTest(res.data);
                setCurrentPage(1); // Reset to first page after search
            });
    };

    const handleAllTests = () => {
        window.location.reload();
    };

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTests = (searchTest || allTests).slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = (searchTest || allTests).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className='flex justify-center items-center gap-14 my-10'>
                <div>
                    <form action="" onSubmit={handleSearch} className='flex gap-2'>
                        <input
                            type="date"
                            name='date'
                            placeholder='Select date'
                            className="input input-bordered w-full max-w-xs"
                            min={today} // Set the min attribute to today's date
                        />
                        <input type="submit" value="Search" className='btn' />
                    </form>
                </div>
                {/* <div><p className='btn' onClick={handleAllTests}>See all tests </p></div> */}
            </div>
            <div className='flex justify-center '>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {currentTests.map(test => (
                        <div key={test._id} className="card w-96 bg-base-100 shadow-xl my-5 border-2">
                            <div>
                                <img className='h-[200px] rounded-md' src={test.image} alt="Shoes" />
                            </div>
                            <div className="card-body">
                                <div className='flex justify-between'>
                                    <h2 className="card-title">{test.name}</h2>
                                    <h2 className="card-title">${test.price}</h2>
                                </div>
                                <p className='text-center'>{test.shortDes}</p>
                                <div className="card-actions justify-between items-center">
                                    <Link to={`/details/${test._id}`}><button className="btn btn-primary">See Details</button></Link>
                                    <p className='bg-green-400 bg-opacity-40 rounded-sm'>Available Slot : {test.slot}</p>
                                </div>
                                <div>
                                    <p className='text-[1.1rem] bg-yellow-400 font-semibold py-3 rounded-md'>Test Date : {test.date}/{test.month}/{test.year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pagination Controls */}
            <div className='flex justify-center my-5'>
                <div className="btn-group">
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => handleClick(number + 1)}
                            className={`btn mx-3 ${currentPage === number + 1 ? 'btn-active' : ''}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTests;
