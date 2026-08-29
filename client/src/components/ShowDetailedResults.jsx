import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import { Drawer } from './Drawer';
import { motion } from "framer-motion";
import { FiTrendingUp, FiTarget, FiActivity, FiArrowLeft } from "react-icons/fi";

export default function ShowDetailedResults() {
    const [data, setData] = useState([]);
    const { userId } = useParams();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
                const response = await axios.get(`${serverUrl}/results/user/${userId}`);

                const modifiedData = response.data.data.map(item => ({
                    ...item,
                    wpm: Math.round(item.cpm / 5),
                    time: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    date: new Date(item.createdAt).toLocaleDateString(),
                }));
                setData(modifiedData);
            } catch (error) {
                console.error(error);
            } finally {
                setShowLoader(false);
            }
        };

        fetchData();
    }, [userId]);

    // Aggregate Stats
    const maxWpm = data.length > 0 ? Math.max(...data.map(d => d.wpm)) : 0;
    const avgAcc = data.length > 0 ? (data.reduce((acc, curr) => acc + curr.accuracy, 0) / data.length * 100).toFixed(0) : 0;
    const totalGames = data.length;

    // Chart Data (Last 15 games)
    const chartData = [...data].slice(0, 15).reverse().map(d => d.wpm);
    const chartMax = chartData.length > 0 ? Math.max(50, ...chartData) * 1.2 : 100;

    return (
        <div className="min-h-screen bg-black/90 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            {showLoader ? (
                <Loader />
            ) : (
                <div className="max-w-7xl mx-auto p-6 pt-24 pb-20">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent mb-2">Performance Dashboard</h1>
                            <p className="text-zinc-400">Track your typing speed and accuracy over time.</p>
                        </div>
                        <Link to="/" className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all px-5 py-2.5 rounded-full text-sm font-medium">
                            <FiArrowLeft className="text-zinc-400 group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                    </div>

                    {data.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/20 p-6 rounded-2xl flex items-center gap-5">
                                    <div className="p-4 bg-indigo-500/10 rounded-xl text-indigo-400"><FiTrendingUp size={28} /></div>
                                    <div>
                                        <div className="text-zinc-400 text-sm mb-1">Peak Speed</div>
                                        <div className="text-3xl font-bold">{maxWpm} <span className="text-base text-indigo-400 font-normal">WPM</span></div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-5">
                                    <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400"><FiTarget size={28} /></div>
                                    <div>
                                        <div className="text-zinc-400 text-sm mb-1">Avg Accuracy</div>
                                        <div className="text-3xl font-bold">{avgAcc}<span className="text-base text-emerald-400 font-normal">%</span></div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-950/40 to-black border border-purple-500/20 p-6 rounded-2xl flex items-center gap-5">
                                    <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400"><FiActivity size={28} /></div>
                                    <div>
                                        <div className="text-zinc-400 text-sm mb-1">Total Sessions</div>
                                        <div className="text-3xl font-bold">{totalGames} <span className="text-base text-purple-400 font-normal">Races</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Trend Chart */}
                            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 md:p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-white mb-1">Recent Speed Trend</h2>
                                    <p className="text-zinc-500 text-sm">Your WPM history over the last {chartData.length} sessions</p>
                                </div>
                                <div className="flex items-end justify-between h-48 gap-1 md:gap-3">
                                    {chartData.map((wpm, i) => (
                                        <div key={i} className="relative group flex-1 bg-zinc-950/50 rounded-t-md h-full flex items-end overflow-visible">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(wpm / chartMax) * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                                                className="w-full bg-gradient-to-t from-indigo-900/50 to-indigo-500 hover:to-indigo-400 rounded-t-md relative cursor-crosshair transition-colors"
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 border border-zinc-700 text-xs px-2.5 py-1.5 rounded-md text-white z-10 whitespace-nowrap shadow-xl">
                                                    <span className="font-bold">{wpm}</span> WPM
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* History Grid */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-6">Session History</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {data.map((result, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="bg-zinc-900/30 border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900/50 transition-all rounded-xl p-5"
                                        >
                                            <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800/50">
                                                <span className="text-zinc-400 text-sm font-medium">{result.date}</span>
                                                <span className="text-zinc-600 text-xs bg-zinc-950 px-2 py-1 rounded-md">{result.time}</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-4xl font-black tracking-tight">{result.wpm}</div>
                                                    <div className="text-xs text-indigo-400/70 font-semibold tracking-wider mt-1 uppercase">WPM</div>
                                                </div>
                                                <div className="text-right flex flex-col gap-1">
                                                    <div className="bg-emerald-500/10 px-2 py-1 rounded text-emerald-400 font-bold text-sm">
                                                        {(result.accuracy * 100).toFixed(0)}% <span className="text-[10px] text-emerald-400/50 font-medium ml-1">ACC</span>
                                                    </div>
                                                    <div className="bg-red-500/10 px-2 py-1 rounded text-red-400 font-bold text-sm">
                                                        {result.error} <span className="text-[10px] text-red-400/50 font-medium ml-1">ERR</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    ) : (
                        <div className="h-[60vh] flex items-center justify-center">
                            <Drawer />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
