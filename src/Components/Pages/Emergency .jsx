import React from 'react';
import { PiAmbulanceFill } from "react-icons/pi";
import { FiPhoneCall } from "react-icons/fi";

const Emergency  = () => {
    return (
        <div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
	<div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
		<h1 className="text-5xl font-bold leading-none text-center text-red-500">Emergency Service</h1>
		<p className="text-xl font-medium text-center">At a  Optimizing Resource Allocation and Multi-Disciplinary Collaboration for Effective Emergency Response and Patient Safety,Timely Diagnosis, Treatment, and Patient-Centered Care Delivery Across Specialties</p>
		<div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
			<button className="px-8 py-3 text-lg font-semibold rounded bg-violet-600 text-gray-50"><PiAmbulanceFill className='inline-block text-3xl mr-5'/> Ambulance </button>
			<button className="px-8 py-3 text-lg font-normal border rounded bg-gray-800 text-gray-50 dark:border-gray-700"><FiPhoneCall className='inline-block text-3xl mr-5'/> Direct Contact</button>
		</div>
	</div>
</section>
        </div>
    );
};

export default Emergency ;