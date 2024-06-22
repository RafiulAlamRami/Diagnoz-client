import React from 'react';

const Blog = () => {
    let date=new Date()
    let day=date.getDate()
    let month=date.getMonth()
    let year=date.getYear()
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800 my-10">
                <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
                    <a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                        <img src={'https://i.ibb.co/0XF2vCH/national-cancer-institute-Xknu-Bmnjb-Kg-unsplash.jpg'} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
                        <div className="p-6 space-y-2 lg:col-span-5">
                            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">Top Health Tests You Shouldnt Skip Ensuring a Healthy Future</h3>
                            <span className="text-xs dark:text-gray-600">February 19, 2021</span>
                            <p>Discover essential health tests that can detect early signs of diseases and ensure your well-being. From routine blood work to specific screenings like cholesterol and cancer tests, learn which exams are vital for maintaining optimal health and preventing future complications. Prioritize your health today!</p>
                        </div>
                    </a>
                    <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/QYcpmh1/cdc-IFp-Qtennlj8-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Must-Have Health Tests for Every Age: Stay Ahead of Health Issues</h3>
                                <span className="text-xs dark:text-gray-600">January 21, 2021</span>
                                <p>Understand the importance of regular health tests tailored to your age group. From cholesterol checks to bone density scans, these exams are critical for early detection and prevention of diseases. Keep track of your health with these essential tests and stay ahead of potential issues.</p>
                            </div>
                        </a>
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/kK1GRpv/mufid-majnun-ewtk-O-zv-YXw-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Critical Health Tests: Safeguard Your Health with These Screenings</h3>
                                <span className="text-xs dark:text-gray-600">January 22, 2021</span>
                                <p>Identify and understand crucial health tests like lipid profiles, blood pressure monitoring, and cancer screenings. These tests help detect early signs of potential health issues, ensuring timely treatment and better outcomes. Stay vigilant and prioritize these screenings.</p>
                            </div>
                        </a>
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/LtzDzdZ/mufid-majnun-Ax-YHp-LH3-U0-Q-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Vital Health Screenings: Detecting Problems Before They Start</h3>
                                <span className="text-xs dark:text-gray-600">January 23, 2021</span>
                                <p>Uncover the importance of vital health screenings to catch problems early. Regular exams like thyroid tests, bone density scans, and blood glucose monitoring are essential for preventing severe health issues. Ensure your well-being with these key tests.</p>
                            </div>
                        </a>
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/hDVsQQG/jc-gellidon-x-X0-NVb-Jy8a8-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Stay Ahead of Health Issues: Top 10 Essential Health Tests</h3>
                                <span className="text-xs dark:text-gray-600">January 24, 2021</span>
                                <p>MDiscover the top 10 essential health tests to stay ahead of potential health issues. From routine blood tests to specific screenings like colonoscopies and heart health checks, these exams are crucial for early detection and effective prevention. Prioritize your health today.</p>
                            </div>
                        </a>
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/Wzv5ms9/mufid-majnun-a-NEa-Wq-Vo-T0g-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Health Monitoring: Key Tests for Early Disease Detection</h3>
                                <span className="text-xs dark:text-gray-600">January 25, 2021</span>
                                <p>Regular health monitoring through key tests is vital for early disease detection. Learn about important screenings like hypertension checks, cholesterol levels, and cancer markers. Staying informed and proactive with these tests ensures better health outcomes.</p>
                            </div>
                        </a>
                        <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
                            <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={'https://i.ibb.co/d0YPRp3/national-cancer-institute-m-VV0s8-Zv-Em4-unsplash.jpg'} />
                            <div className="p-6 space-y-2">
                                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Essential Health Screenings: Key Tests for Every Stage of Life</h3>
                                <span className="text-xs dark:text-gray-600">January 26, 2021</span>
                                <p>Understand the importance of essential health screenings tailored for different life stages. Regular exams like cardiovascular tests, hormone panels, and diabetes screenings help detect health issues early. Prioritize these screenings for a healthier and longer life.</p>
                            </div>
                        </a>
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default Blog;