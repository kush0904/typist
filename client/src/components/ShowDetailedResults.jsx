import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar/Navbar';
import Loader from './Loader';
import { Drawer } from './Drawer';
import { FaHome } from "react-icons/fa";


export default function ShowDetailedResults() {
    const [data, setData] = useState([]);
    const { userId } = useParams();
    const [showLoader, setShowLoader] = useState(true);

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/results/${userId}`);
                console.log(response.data);

                const modifiedData = response.data.data.map(item => ({
                    ...item,
                    time: new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    date: new Date(item.createdAt).toLocaleDateString(),
                }));
                setData(modifiedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userId]);   

     useEffect(() => {
        setShowLoader(false); 
    }, []); 

    return (
        <>
        {showLoader ? ( 
                <Loader />
            ) : (


        <>
        <NavBar />
        <div className="p-8">

        <div className="flex justify-between items-center">
    <h1 className="text-white text-3xl font-bold">Results</h1>
    <div className="flex items-center"> 
        <Link to="/" className="text-white text-lg flex items-center">Back to Home <FaHome  className='mx-4'/></Link>
    </div>
</div>

            {data.length > 0 ? (

                
                <div className="grid gap-6">
                    {data.map((result, index) => (
                        <div key={index} className="bg-gray-900 rounded-lg p-6">
                            <div className="flex flex-col">
                                <div className="bg-gray-800 text-white text-lg font-bold rounded-md py-2 px-4 mb-2">
                                    <span className="font-bold mr-6">{result.date}</span>
                                    <span className="font-bold mr-3">{result.time}</span> 
                                </div>
                                <div className="flex text-white text-lg mb-2">
                                    <div className="w-1/4 flex flex-col items-center pr-2 border-r border-gray-700">
                                        <span className="font-bold mb-2">Accuracy</span>
                                        <div className='text-green-500'>{(result.accuracy.toFixed(2))*100}%</div>
                                    </div>
                                    <div className="w-1/4 flex flex-col items-center pr-2 border-r border-gray-700">
                                        <span className="font-bold mb-2">CPM</span>
                                        <div>{result.cpm}</div>
                                    </div>
                                    <div className="w-1/4 flex flex-col items-center pr-2 border-r border-gray-700">
                                        <span className="font-bold mb-2">Errors</span>
                                        <div className='text-red-400'>{result.error}</div>
                                    </div>
                                    <div className="w-1/4 flex flex-col items-center">
                                        <span className="font-bold mb-2">Typed</span>
                                        <div>{result.typed}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='h-full mt-8'>
                <Drawer />
                </div>
            )}
        </div>
        </>
        )};
        </>
    );
}
