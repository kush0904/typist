import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ShowDetailedResults() {
    const [data, setData] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/results/${userId}`);
                console.log(response.data); // Check the response data structure
                setData(response.data.data); // Set response.data.data instead of response.data
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userId]);   

    return (
        <div>
            <h1>Results</h1>

            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Accuracy</th>
                            <th>CPM</th>
                            <th>Errors</th>
                            <th>Typed</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((result, index) => (
                            <tr key={index}>
                                <td>{result.accuracy}</td>
                                <td>{result.cpm}</td>
                                <td>{result.error}</td>
                                <td>{result.typed}</td>
                                <td>{result.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
