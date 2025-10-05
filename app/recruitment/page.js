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
        // Technical team specific questions
        technicalExperience: '',
        techLanguages: '',
        techProjects: '',
        problemSolving: '',
        techInterests: '',
        learningApproach: '',
        // Curation team specific questions
        writingPreference: '',
        proudContent: '',
        reelCaption: '',
        documentationDetails: '',
        learningInterest: '',
        otherClub: '',
        socialLinks: '',
        resume: null,
        // Social Media team specific questions
        unlimitedResources: '',
        technicalTopic: '',
        socialMediaRole: '',
        studentCommunity: '',
        marketingCampaign: '',
        // Design team specific questions
        designChoice: '',
        designSoftware: '',
        designConflict: '',
        designExperience: '',
        designProcess: '',
        portfolio: ''
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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name || !formData.usn || !formData.branch || 
            !formData.semester || !formData.email || !formData.phone ||
            (!formData.teams.technical && !formData.teams.curation && 
             !formData.teams.design && !formData.teams.socialMedia)) {
            setShowToast({ message: 'Please fill in all required fields', type: 'error' });
            return;
        }

        // Check if semester is valid (3rd)
        if (formData.semester !== '3') {
            setShowToast({ message: 'Only 3rd semester students can apply', type: 'error' });
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
                technicalExperience: '',
                techLanguages: '',
                techProjects: '',
                problemSolving: '',
                techInterests: '',
                learningApproach: '',
                writingPreference: '',
                proudContent: '',
                reelCaption: '',
                documentationDetails: '',
                learningInterest: '',
                otherClub: '',
                socialLinks: '',
                resume: null,
                unlimitedResources: '',
                technicalTopic: '',
                socialMediaRole: '',
                studentCommunity: '',
                marketingCampaign: '',
                designChoice: '',
                designSoftware: '',
                designConflict: '',
                designExperience: '',
                designProcess: '',
                portfolio: ''
            });
            
            setShowToast({ message: 'Recruitment form submitted successfully!', type: 'success' });
        } catch (error) {
            setShowToast({ message: error.message || 'Error submitting form. Please try again later.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check which teams are selected to show team-specific questions
    const selectedTeams = Object.keys(formData.teams).filter(team => formData.teams[team]);

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
                        Microsoft Learn Student Ambassadors – CIT Chapter
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

                        {/* Technical Team Specific Questions */}
                        {selectedTeams.includes('technical') && (
                            <>
                                <div>
                                    <label htmlFor="technicalExperience" className="block text-sm font-medium text-white mb-2">
                                        8. What technical experience do you have? (Web development, App development, etc.) (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Understanding your technical background.
                                    </p>
                                    <textarea
                                        id="technicalExperience"
                                        name="technicalExperience"
                                        value={formData.technicalExperience}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about your technical experience..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="techLanguages" className="block text-sm font-medium text-white mb-2">
                                        9. Which programming languages or technologies are you most comfortable with? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Identifying your technical strengths.
                                    </p>
                                    <textarea
                                        id="techLanguages"
                                        name="techLanguages"
                                        value={formData.techLanguages}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="List programming languages and technologies you're comfortable with..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="techProjects" className="block text-sm font-medium text-white mb-2">
                                        10. Describe a technical project you've worked on that you're proud of. What challenges did you face and how did you overcome them? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Assessing problem-solving skills and project experience.
                                    </p>
                                    <textarea
                                        id="techProjects"
                                        name="techProjects"
                                        value={formData.techProjects}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about a technical project you're proud of..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="problemSolving" className="block text-sm font-medium text-white mb-2">
                                        11. How do you approach solving a technical problem you've never encountered before? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Understanding your problem-solving approach.
                                    </p>
                                    <textarea
                                        id="problemSolving"
                                        name="problemSolving"
                                        value={formData.problemSolving}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Explain your approach to solving new technical problems..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="techInterests" className="block text-sm font-medium text-white mb-2">
                                        12. What technical areas are you most interested in exploring or learning more about? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Identifying learning interests and growth areas.
                                    </p>
                                    <textarea
                                        id="techInterests"
                                        name="techInterests"
                                        value={formData.techInterests}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about technical areas you want to explore..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="learningApproach" className="block text-sm font-medium text-white mb-2">
                                        13. How do you typically approach learning new technologies or programming languages? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Understanding your learning methodology.
                                    </p>
                                    <textarea
                                        id="learningApproach"
                                        name="learningApproach"
                                        value={formData.learningApproach}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Explain your approach to learning new technologies..."
                                        required
                                    ></textarea>
                                </div>
                            </>
                        )}

                        {/* Curation Team Specific Questions */}
                        {selectedTeams.includes('curation') && (
                            <>
                                <div>
                                    <label htmlFor="writingPreference" className="block text-sm font-medium text-white mb-2">
                                        8. What kind of writing do you enjoy—storytelling, summarizing, captioning, or formal communication? Tell us why. (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Helps place them in roles they'll enjoy and thrive in.
                                    </p>
                                    <textarea
                                        id="writingPreference"
                                        name="writingPreference"
                                        value={formData.writingPreference}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about your writing preferences..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="proudContent" className="block text-sm font-medium text-white mb-2">
                                        9. What's one piece of content (a post, caption, or write-up) you've created that you're proud of? Tell us why. (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Surfaces expressive confidence and self-awareness.
                                    </p>
                                    <textarea
                                        id="proudContent"
                                        name="proudContent"
                                        value={formData.proudContent}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Share a piece of content you're proud of..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="reelCaption" className="block text-sm font-medium text-white mb-2">
                                        10. Write a short caption (1–2 lines) for a reel celebrating a team member's achievements. (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Reveals tone sensitivity and expressive style.
                                    </p>
                                    <textarea
                                        id="reelCaption"
                                        name="reelCaption"
                                        value={formData.reelCaption}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Write a short caption..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="documentationDetails" className="block text-sm font-medium text-white mb-2">
                                        11. While documenting an event, what details do you think are most important to include—and why? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Reveals their instinct for relevance and clarity.
                                    </p>
                                    <textarea
                                        id="documentationDetails"
                                        name="documentationDetails"
                                        value={formData.documentationDetails}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about important documentation details..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="learningInterest" className="block text-sm font-medium text-white mb-2">
                                        12. What's one thing you'd love to learn or improve this term—writing, organizing, designing, or something else? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Surfaces growth mindset.
                                    </p>
                                    <textarea
                                        id="learningInterest"
                                        name="learningInterest"
                                        value={formData.learningInterest}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us what you'd like to learn or improve..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="otherClub" className="block text-sm font-medium text-white mb-2">
                                        13. Are you currently a member of any other club? If so, please specify the club and your role within it. (required)
                                    </label>
                                    <textarea
                                        id="otherClub"
                                        name="otherClub"
                                        value={formData.otherClub}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about other clubs you're part of..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="socialLinks" className="block text-sm font-medium text-white mb-2">
                                        14. Please provide a Linktree with all your social handles, if available, or alternatively, links to your LinkedIn profile, relevant social media, and portfolio. (required)
                                    </label>
                                    <input
                                        type="text"
                                        id="socialLinks"
                                        name="socialLinks"
                                        value={formData.socialLinks}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your social media links..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-white mb-2">
                                        15. Attach your resume or CV. (required)
                                    </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Social Media Team Specific Questions */}
                        {selectedTeams.includes('socialMedia') && (
                            <>
                                <div>
                                    <label htmlFor="unlimitedResources" className="block text-sm font-medium text-white mb-2">
                                        Imagine MLSA had unlimited resources for one social media campaign—what would you create to make the community go viral? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Tests creativity & platform understanding.
                                    </p>
                                    <textarea
                                        id="unlimitedResources"
                                        name="unlimitedResources"
                                        value={formData.unlimitedResources}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Describe your dream social media campaign..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="technicalTopic" className="block text-sm font-medium text-white mb-2">
                                        How would you turn a technical topic (like cloud computing or AI) into a fun, relatable post or reel for students? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Checks ability to simplify complex concepts.
                                    </p>
                                    <textarea
                                        id="technicalTopic"
                                        name="technicalTopic"
                                        value={formData.technicalTopic}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Explain how you would simplify a technical topic..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="socialMediaRole" className="block text-sm font-medium text-white mb-2">
                                        Which part of a social media role—content creation, analytics, engagement, or trend spotting—excites you the most and why? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Reveals strengths & interest area.
                                    </p>
                                    <textarea
                                        id="socialMediaRole"
                                        name="socialMediaRole"
                                        value={formData.socialMediaRole}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us which social media role excites you..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="studentCommunity" className="block text-sm font-medium text-white mb-2">
                                        In your opinion, what makes student-led communities like MLSA different from regular college clubs, and how should marketing reflect that? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Tests strategic thinking & understanding of brand identity.
                                    </p>
                                    <textarea
                                        id="studentCommunity"
                                        name="studentCommunity"
                                        value={formData.studentCommunity}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Share your thoughts on student-led communities..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="marketingCampaign" className="block text-sm font-medium text-white mb-2">
                                        Which recent marketing or promotional campaign (from any brand or community) inspired you the most, and what key idea would you bring from it to MLSA? (required)
                                    </label>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Purpose: Shows awareness of trends & ability to adapt best practices.
                                    </p>
                                    <textarea
                                        id="marketingCampaign"
                                        name="marketingCampaign"
                                        value={formData.marketingCampaign}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about an inspiring marketing campaign..."
                                        required
                                    ></textarea>
                                </div>
                            </>
                        )}

                        {/* Design Team Specific Questions */}
                        {selectedTeams.includes('design') && (
                            <>
                                <div>
                                    <label htmlFor="designChoice" className="block text-sm font-medium text-white mb-2">
                                        1. Why did you choose design? (required)
                                    </label>
                                    <textarea
                                        id="designChoice"
                                        name="designChoice"
                                        value={formData.designChoice}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us why you chose design..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="designSoftware" className="block text-sm font-medium text-white mb-2">
                                        2. How many design software are you familiar with? (required)
                                    </label>
                                    <input
                                        type="text"
                                        id="designSoftware"
                                        name="designSoftware"
                                        value={formData.designSoftware}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="List design software you're familiar with..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="designConflict" className="block text-sm font-medium text-white mb-2">
                                        3. If you face a conflict with a teammate due to differences in design ideas, how would you handle it? (required)
                                    </label>
                                    <textarea
                                        id="designConflict"
                                        name="designConflict"
                                        value={formData.designConflict}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Explain how you would handle design conflicts..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="designExperience" className="block text-sm font-medium text-white mb-2">
                                        4. How long have you been designing? (required)
                                    </label>
                                    <input
                                        type="text"
                                        id="designExperience"
                                        name="designExperience"
                                        value={formData.designExperience}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell us about your design experience..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="designProcess" className="block text-sm font-medium text-white mb-2">
                                        5. Describe, in detail, your process for creating an Instagram post for an event, specify visual elements (like logos, text, and imagery etc), and anything you'd like to add, that you would use. (required)
                                    </label>
                                    <textarea
                                        id="designProcess"
                                        name="designProcess"
                                        value={formData.designProcess}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Describe your Instagram post design process..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="portfolio" className="block text-sm font-medium text-white mb-2">
                                        6. Please share your portfolio, if you have one. (required)
                                    </label>
                                    <input
                                        type="text"
                                        id="portfolio"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your portfolio link..."
                                        required
                                    />
                                </div>
                            </>
                        )}

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