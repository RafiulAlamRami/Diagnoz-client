import React from 'react';
import { Link } from 'react-router-dom';

const Carrer = () => {
    return (
        <div>
            <div className='my-9'>
                <p className='text-center text-2xl font-bold my-3'>Welcome to Diagnoz Career</p>
                <p className='text-center font-semibold'>Lets some career opportunities for you</p>
            </div>

            <div>
            <ul className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
	<li>
		<article>
			<a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-50">
				<h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Histotechnologist</h3>
				<time  className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600">Oct 13, 2024</time>
				<p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">Histotechnologists prepare tissue samples obtained from surgeries or biopsies for microscopic examination by pathologists. They embed tissue specimens in wax blocks, cut thin sections, and stain them for microscopic analysis. Histotechnologists ensure the quality and integrity of tissue ..... <span className=''><Link to={'#'} className='underline'>Apply Now</Link></span> </p>
			</a>
		</article>
	</li>
	<li>
		<article>
			<a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-50">
				<h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Cardiac Sonographer</h3>
				<time  className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600">Oct 13, 2024</time>
				<p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">Cardiac Sonographers use ultrasound equipment to create images of the heart and blood vessels. They assess cardiac function, identify abnormalities such as valve defects or heart disease, and assist cardiologists in diagnosing and monitoring patients. Cardiac ..... <span className=''><Link to={'#'} className='underline'>Apply Now</Link></span> </p>
			</a>
		</article>
	</li>
	<li>
		<article>
			<a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-50">
				<h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Clinical Laboratory Scientist</h3>
				<time  className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600">Oct 13, 2024</time>
				<p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">Clinical Laboratory Scientists perform complex tests on blood, bodily fluids, and tissue samples using sophisticated laboratory equipment. They analyze and interpret test results, ensuring accuracy and reliability in diagnosing medical conditions. ..... <span className=''><Link to={'#'} className='underline'>Apply Now</Link></span></p>
			</a>
		</article>
	</li>
	<li>
		<article>
			<a rel="noopener noreferrer" href="#" className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-50">
				<h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">Cytogenetic Technologist</h3>
				<time  className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-600">Oct 13, 2020</time>
				<p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-700">Cytogenetic Technologists analyze genetic material (chromosomes and DNA) from patient samples to detect abnormalities associated with genetic disorders or cancers. They use specialized laboratory techniques such as karyotyping and fluorescence in situ hybridization ..... <span className=''><Link to={'#'} className='underline'>Apply Now</Link></span> </p>
			</a>
		</article>
	</li>
</ul>
            </div>
        </div>
    );
};

export default Carrer;