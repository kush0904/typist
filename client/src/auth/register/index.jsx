import React, { useState, useRef, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../../components/utils";
import Loader from '../../components/Loader';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoader, setShowLoader] = useState(true); 

    const { userLoggedIn } = useAuth();

    useEffect(() => {
        const loaderTimeout = setTimeout(() => {
            setShowLoader(false);
        }, 5000);

        return () => clearTimeout(loaderTimeout);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/login');
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsRegistering(false);
            }
        }
    };

    return (
        <div className="relative">
            {showLoader && <Loader />}

            <Canvas
                camera={{
                    position: [10, -7.5, -5],
                }}
                style={{ height: "100vh" }}
                className={`bg-black ${showLoader ? 'opacity-0' : 'opacity-100'}`} 
            >
                <OrbitControls maxDistance={20} minDistance={10} />
                <directionalLight />
                <pointLight position={[-30, 0, -30]} power={10.0} />
                <PointCircle />
            </Canvas>

            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-medium">
                <div>
                    {userLoggedIn && <Navigate to={'/home'} replace={true} />}

                    <main className="w-full h-screen flex self-center place-content-center place-items-center">
                        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                            <div className="text-center mb-6">
                                <div className="mt-2">
                                    <h3 className="text-white text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                                </div>
                            </div>
                            <form onSubmit={onSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-white font-bold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        autoComplete='email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-white font-bold">
                                        Password
                                    </label>
                                    <input
                                        disabled={isRegistering}
                                        type="password"
                                        autoComplete='new-password'
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border shadow-sm rounded-lg transition duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-white font-bold">
                                        Confirm Password
                                    </label>
                                    <input
                                        disabled={isRegistering}
                                        type="password"
                                        autoComplete='off'
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                    />
                                </div>

                                {errorMessage && (
                                    <span className='text-red-600 font-bold'>{errorMessage}</span>
                                )}

                                <button
                                    type="submit"
                                    disabled={isRegistering}
                                    className={`w-full px-4 py-2 text-black font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-black hover:text-white hover:border-white border transition duration-300'}`}
                                >
                                    {isRegistering ? 'Signing Up...' : 'Sign Up'}
                                </button>

                                <div className="text-sm text-center text-white">
                                    Already have an account? {'   '}
                                    <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const PointCircle = () => {
    const ref = useRef(null);

    useFrame(({ clock }) => {
        if (ref.current?.rotation) {
            ref.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={ref}>
            {pointsInner.map((point) => (
                <Point key={point.idx} position={point.position} color={point.color} />
            ))}
            {pointsOuter.map((point) => (
                <Point key={point.idx} position={point.position} color={point.color} />
            ))}
        </group>
    );
};

const Point = ({ position, color }) => {
    return (
        <Sphere position={position} args={[0.1, 10, 10]}>
            <meshStandardMaterial
                emissive='#AA336A'
                emissiveIntensity={0.5}
                roughness={0.5}
                color='#AA336A'
            />
        </Sphere>
    );
};

export default Register;
