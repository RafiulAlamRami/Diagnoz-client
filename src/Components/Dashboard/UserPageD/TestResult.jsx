import React, { useEffect } from 'react';
import print from 'print-js'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';



const TestResult = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { data: reports = [], refetch } = useQuery({
        queryKey: ["delivery-report", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/delivery-test-report/${user.email}`)
            return res.data
        }
    })

    console.log(reports);


    return (
        <div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Name</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reports?.map((report,index) =>
                                <tr key={report._id} className="">
                                    <td>{index+1}</td>
                                    <td>{report.testName}</td>
                                    <td><Link to={`${report.report}`} target="_blank" className='btn '>See report</Link></td>
                                </tr>
                            )
                        }
                        


                    </tbody>
                </table>
            </div>



            {/*  */}


        </div>
    );
};

export default TestResult;
