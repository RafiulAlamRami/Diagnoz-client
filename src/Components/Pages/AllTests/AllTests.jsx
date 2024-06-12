import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';



const AllTests = () => {
    const axiosSecure = useAxiosSecure()

    const [startDate, setStartDate] = useState(null);

    const { data: allTests = [], refetch } = useQuery({
        queryKey: ["allTests"],
        queryFn: async () => {
            const res = await axiosSecure.get('/alltest')
            return res.data
        }
    })

    const [a,seta]=useState()
    const [b,setb]=useState()
    const [c,setc]=useState()

    const handleDateChange=(test)=>{
        seta(test.startDate)
        setb(test.endDate-test.startDate)
        setc(test.startMonth)
    }
    

    // const enabledDates = [
    //     new Date(2024, 5, 15), // June 15, 2024
    //     new Date(2024, 5, 16), // June 16, 2024
    //     new Date(2024, 5, 17), // June 17, 2024
    //     new Date(2024, 5, 18), // June 18, 2024
    //     new Date(2024, 5, 19), // June 19, 2024

    // ];

    const enabledDates = Array.from({ length:b }, (_, index) => (
        new Date(new Date().getFullYear(), new Date().getMonth() , a + index) // June 15, 2024 to June 19, 2024
      ));
    
    const isDateEnabled = (date) => {
        return enabledDates.some(
            (enabledDate) =>
                enabledDate.getFullYear() === date.getFullYear() &&
                enabledDate.getMonth() === date.getMonth() &&
                enabledDate.getDate() === date.getDate()
        );
    };



    return (
        <div className='flex justify-center'>
            {/* {allTests.length} */}
            <div className=' grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3'>
                {allTests?.map(test =>
                    <div key={test._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className=''>
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
                            <div onClick={()=>handleDateChange(test)}>
                                    <DatePicker placeholderText='Click here to see date' className='btn outline-none'
                                        selected={startDate}
                                        filterDate={isDateEnabled}
                                        
                                    />
                                    {/* {startDate && (
                                                <div>
                                                    <h3>Selected Date:</h3>
                                                    <p>Date: {startDate.toDateString()}</p>
                                                    <p>Month (0-based): {startDate.getMonth()}</p>
                                                </div>
                                            )} */}
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTests;