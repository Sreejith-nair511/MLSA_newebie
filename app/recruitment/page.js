'use client';

import { useState, useEffect, useRef } from "react";

export default function RecruitmentForm() {
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        branch: '',
        semester: '',
        email: '',
        phone: '',
        teams: {
            technical: false,
            curation: false,
            design: false,
            socialMedia: false
        },
        motivation: '',
        collaboration: '',
        creativeIdea: '',
        teamInterest: ''
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
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('teams.')) {
            const teamName = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                teams: {
                    ...prevState.teams,
                    [teamName]: checked
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name || !formData.usn || !formData.branch || 
            !formData.semester || !formData.email || !formData.phone ||
            (!formData.teams.technical && !formData.teams.curation && 
             !formData.teams.design && !formData.teams.socialMedia) ||
            !formData.motivation || !formData.collaboration || 
            !formData.creativeIdea || !formData.teamInterest) {
            setShowToast({ message: 'Please fill in all required fields', type: 'error' });
            return;
        }

        // Check if semester is valid (3rd or MCA)
        if (formData.semester !== '3' && formData.semester !== 'MCA') {
            setShowToast({ message: 'Only 3rd semester or MCA students can apply', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Prepare data for submission
            const submissionData = {
                ...formData,
                teams: Object.keys(formData.teams).filter(team => formData.teams[team]).join(', ')
            };
            
            const response = await fetch('/api/submitRecruitmentForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit recruitment form');
            }

            // Reset form
            setFormData({
                name: '',
                usn: '',
                branch: '',
                semester: '',
                email: '',
                phone: '',
                teams: {
                    technical: false,
                    curation: false,
                    design: false,
                    socialMedia: false
                },
                motivation: '',
                collaboration: '',
                creativeIdea: '',
                teamInterest: ''
            });
            
            setShowToast({ message: 'Recruitment form submitted successfully!', type: 'success' });
        } catch (error) {
            setShowToast({ message: error.message || 'Error submitting form. Please try again later.', type: 'error' });
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
                            Volunteer Recruitment Form
                        </span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-400">
                        Curation & Documentation - Team 3.0
                    </h2>
                    <p className="text-lg font-medium text-indigo-400 mb-8">
                        Thank you for your interest in joining the Microsoft Learn Student Ambassadors – CIT Chapter
                    </p>
                    <div className="bg-gray-900 bg-opacity-30 backdrop-blur-lg rounded-xl p-6 mb-8 text-left">
                        <p className="mb-4">
                            We're looking for passionate, curious, and creative individuals to join us in shaping 
                            the club's next chapter. Whether you're into design, tech, storytelling, strategy, or social 
                            media—there's a space for you to grow, contribute, and co-create.
                        </p>
                        <p>
                            This form is your chance to show us who you are beyond the resume. We want to know 
                            what excites you, how you think, and where you shine. Your responses will help the team 
                            spot the spark that makes you different and create amazing experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="relative z-20 py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-30 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">1. Name (required)</label>
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

                        {/* USN */}
                        <div>
                            <label htmlFor="usn" className="block text-sm font-medium text-white mb-2">2. USN (required)</label>
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

                        {/* Branch */}
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium text-white mb-2">3. Branch (required)</label>
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
                            <label className="block text-sm font-medium text-white mb-2">4. Semester (required)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="semester3"
                                        name="semester"
                                        value="3"
                                        checked={formData.semester === '3'}
                                        onChange={(e) => setFormData(prev => ({ 
                                            ...prev, 
                                            semester: e.target.checked ? '3' : '' 
                                        }))}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="semester3" className="text-white">Only 3rd</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="semesterMCA"
                                        name="semester"
                                        value="MCA"
                                        checked={formData.semester === 'MCA'}
                                        onChange={(e) => setFormData(prev => ({ 
                                            ...prev, 
                                            semester: e.target.checked ? 'MCA' : '' 
                                        }))}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="semesterMCA" className="text-white">MCA</label>
                                </div>
                            </div>
                        </div>

                        {/* Official Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">5. Official mail Id (required)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your official email"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">6. Phone number (required)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Teams */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">7. Which team would you like to be a part of? (Select one or more) (required)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="technical"
                                        name="teams.technical"
                                        checked={formData.teams.technical}
                                        onChange={handleInputChange}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="technical" className="text-white">Technical</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="curation"
                                        name="teams.curation"
                                        checked={formData.teams.curation}
                                        onChange={handleInputChange}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="curation" className="text-white">Curation & Documentation</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="design"
                                        name="teams.design"
                                        checked={formData.teams.design}
                                        onChange={handleInputChange}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="design" className="text-white">Design</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="socialMedia"
                                        name="teams.socialMedia"
                                        checked={formData.teams.socialMedia}
                                        onChange={handleInputChange}
                                        className="mr-2 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="socialMedia" className="text-white">Social Media</label>
                                </div>
                            </div>
                        </div>

                        {/* Motivation */}
                        <div>
                            <label htmlFor="motivation" className="block text-sm font-medium text-white mb-2">
                                8. What excites you about being part of MLSA, and how would you like to contribute this term? (required)
                            </label>
                            <p className="text-sm text-gray-400 mb-2">
                                Purpose: Reveals motivation, alignment with club culture, and initiative.
                            </p>
                            <textarea
                                id="motivation"
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Share what excites you about MLSA and how you'd like to contribute..."
                                required
                            ></textarea>
                        </div>

                        {/* Collaboration */}
                        <div>
                            <label htmlFor="collaboration" className="block text-sm font-medium text-white mb-2">
                                9. Tell us about a time you collaborated on a project or event. What role did you play, and what did you learn? (required)
                            </label>
                            <p className="text-sm text-gray-400 mb-2">
                                Purpose: Highlights teamwork, adaptability, and reflection—key for all teams.
                            </p>
                            <textarea
                                id="collaboration"
                                name="collaboration"
                                value={formData.collaboration}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Describe a collaboration experience and what you learned..."
                                required
                            ></textarea>
                        </div>

                        {/* Creative Idea */}
                        <div>
                            <label htmlFor="creativeIdea" className="block text-sm font-medium text-white mb-2">
                                10. If you had to pitch a creative idea for a club activity, campaign, or post, what would it be? (required)
                            </label>
                            <p className="text-sm text-gray-400 mb-2">
                                Purpose: Surfaces originality, relevance, and understanding of club vibe.
                            </p>
                            <textarea
                                id="creativeIdea"
                                name="creativeIdea"
                                value={formData.creativeIdea}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Pitch your creative idea for a club activity, campaign, or post..."
                                required
                            ></textarea>
                        </div>

                        {/* Team Interest */}
                        <div>
                            <label htmlFor="teamInterest" className="block text-sm font-medium text-white mb-2">
                                11. Which team(s) are you most interested in joining, and what strengths would you bring to that space? (required)
                            </label>
                            <p className="text-sm text-gray-400 mb-2">
                                Purpose: Helps leads spot fit and self-awareness.
                            </p>
                            <textarea
                                id="teamInterest"
                                name="teamInterest"
                                value={formData.teamInterest}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Tell us which team(s) interest you most and what strengths you'd bring..."
                                required
                            ></textarea>
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
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
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