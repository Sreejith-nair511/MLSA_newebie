'use client';

import { useState, useEffect, useRef } from "react";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        usn: '',
        branch: '',
        semester: '',
        section: '',
        college: '',
    });
    
    const [showToast, setShowToast] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const xPercent = (clientX / width) * 100;
            const yPercent = (clientY / height) * 100;

            if (backgroundRef.current) {
                backgroundRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.usn ||
            !formData.branch ||
            !formData.semester ||
            !formData.section ||
            !formData.college
        ) {
            setShowToast({ message: 'Please fill in all fields', type: 'error' });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/submitRegistrationForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit registration');
            }

            setFormData({
                name: '',
                email: '',
                usn: '',
                branch: '',
                semester: '',
                section: '',
                college: '',
            });
            setShowToast({ message: 'Registration submitted successfully!', type: 'success' });
        } catch (error) {
            setShowToast({ message: error.message || 'Error submitting Registration Form. Please try again later.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen text-white overflow-hidden bg-black bg-opacity-50">
            {/* Background Animation */}
            <div
                ref={backgroundRef}
                className="absolute inset-0"
                style={{
                    backgroundImage: `
              radial-gradient(circle, rgba(0, 34, 85, 0.8), transparent 60%),
              radial-gradient(circle, rgba(0, 51, 102, 0.6), transparent 70%),
              linear-gradient(to bottom, #000428, #00102a)
            `,
                    backgroundSize: "400% 400%",
                }}
            />

            {/* Header Section */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16">
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Event Registration
                        </span>
                    </h1>
                    <p className="text-lg font-medium text-indigo-400 mb-8">
                        Register for our upcoming Microsoft Learn Student Ambassadors events
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="relative z-20 py-8 px-4 md:px-8">
                <div className="max-w-2xl mx-auto bg-gray-900 bg-opacity-30 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-400">
                        Registration Form
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* USN */}
                        <div>
                            <label htmlFor="usn" className="block text-sm font-medium text-white mb-2">USN *</label>
                            <input
                                type="text"
                                id="usn"
                                name="usn"
                                value={formData.usn}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your USN"
                                required
                            />
                        </div>

                        {/* Branch Selection (Dropdown) */}
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium text-white mb-2">Branch *</label>
                            <select
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select your branch</option>
                                <option value="ise">ISE</option>
                                <option value="cse">CSE</option>
                                <option value="cse-iot">CSE IOT</option>
                                <option value="aiml">AIML</option>
                                <option value="ece">ECE</option>
                                <option value="eee">EEE</option>
                                <option value="mech">Mech</option>
                                <option value="civil">Civil</option>
                            </select>
                        </div>

                        {/* Semester */}
                        <div>
                            <label htmlFor="semester" className="block text-sm font-medium text-white mb-2">Semester *</label>
                            <select
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select your semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>

                        {/* Section */}
                        <div>
                            <label htmlFor="section" className="block text-sm font-medium text-white mb-2">Section *</label>
                            <select
                                id="section"
                                name="section"
                                value={formData.section}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select your section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>

                        {/* College */}
                        <div>
                            <label htmlFor="college" className="block text-sm font-medium text-white mb-2">College *</label>
                            <input
                                type="text"
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your college name"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-4 text-lg font-medium text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                    isSubmitting 
                                        ? 'bg-gray-600 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300'
                                }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Toast Notification */}
            {showToast.message && (
                <div
                    className={`fixed bottom-4 right-4 text-white text-sm py-2 px-4 rounded-md shadow-md ${
                        showToast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                    role="alert"
                >
                    {showToast.message}
                </div>
            )}
        </div>
    );
}