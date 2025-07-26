import { useState, useEffect, useRef } from "react"; // Import useRef
import { useNavigate } from "react-router-dom";
import {
    Briefcase,
    Upload,
    Star,
    Users,
    Search,
    Filter,
    Bell,
    CheckCircle,
    Clock,
    X
} from "lucide-react";
import * as React from "react";
import StatsCard from '../components/Statscard';

const TabsContext = React.createContext();

const Tabs = ({ defaultValue, value: propValue, onValueChange, children, ...props }) => {
    const [localValue, setLocalValue] = React.useState(defaultValue);
    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : localValue;

    const handleValueChange = (newValue) => {
        if (!isControlled) setLocalValue(newValue);
        if (onValueChange) onValueChange(newValue);
    };

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className="w-full" {...props}>{children}</div>
        </TabsContext.Provider>
    );
};

const TabsList = React.forwardRef(({ className = "", children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`w-full flex h-[48px] items-center justify-between rounded-xl bg-[#f1f5f9] p-1 ${className}`}
            role="tablist"
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { parentProps: props });
                }
                return child;
            })}
        </div>
    );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
    ({ className = "", value, parentProps, children, ...props }, ref) => {
        const { value: contextValue, onValueChange } = React.useContext(TabsContext);
        const isActive = value === contextValue;

        const handleClick = () => {
            onValueChange(value);
        };

        return (
            <button
                ref={ref}
                role="tab"
                aria-selected={isActive}
                onClick={handleClick}
                className={`flex-1 h-8px inline-flex cursor-pointer items-center justify-center rounded-md bg-muted p-1 text-muted-foreground focus:outline-none ${
                    isActive
                        ? "bg-white text-black border border-gray-200"
                        : "text-muted-foreground hover:text-foreground"
                } ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
    ({ className = "", value, children, ...props }, ref) => {
        const { value: contextValue } = React.useContext(TabsContext);
        const isActive = value === contextValue;

        return isActive ? (
            <div
                ref={ref}
                role="tabpanel"
                className={`mt-4 ${className}`}
                {...props}
            >
                {children}
            </div>
        ) : null;
    }
);
TabsContent.displayName = "TabsContent";

const Toast = ({ title, description, onClose }) => {
    const toastRef = useRef(null); // Use useRef

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toastRef.current && !toastRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (title || description) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [title, description, onClose]);

    if (!title && !description) return null;

    return (
        <div ref={toastRef} className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-lg" role="alert">
                <strong className="font-bold">{title}</strong>
                <span className="block sm:inline ml-2">{description}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={onClose}>
                    <X className="h-4 w-4 text-red-500" />
                </span>
            </div>
        </div>
    );
};

const PlacementModule = ({ user }) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [searchTerm, setSearchTerm] = useState("");
    const [toast, setToast] = useState({ title: "", description: "" });
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for the hidden file input

    // Mock data (unchanged)
    const jobApplications = [
        {
            id: 1,
            company: "TCS",
            position: "Software Developer",
            status: "Applied",
            appliedDate: "2024-03-15",
            package: "₹3.5 LPA",
            type: "Full-time"
        },
        {
            id: 2,
            company: "Infosys",
            position: "System Engineer",
            status: "Interview Scheduled",
            appliedDate: "2024-03-10",
            package: "₹4.0 LPA",
            type: "Full-time"
        },
        {
            id: 3,
            company: "Wipro",
            position: "Data Analyst Intern",
            status: "Selected",
            appliedDate: "2024-02-28",
            package: "₹15,000/month",
            type: "Internship"
        }
    ];

    const availableJobs = [
        {
            id: 1,
            company: "Microsoft",
            position: "Software Engineer Intern",
            package: "₹50,000/month",
            location: "Bangalore",
            type: "Internship",
            deadline: "2024-04-15",
            requirements: ["Python", "React", "Database"],
            matchScore: 92
        },
        {
            id: 2,
            company: "Amazon",
            position: "Cloud Support Engineer",
            package: "₹6.5 LPA",
            location: "Hyderabad",
            type: "Full-time",
            deadline: "2024-04-20",
            requirements: ["AWS", "Linux", "Python"],
            matchScore: 85
        },
        {
            id: 3,
            company: "Google",
            position: "Product Management Intern",
            package: "₹80,000/month",
            location: "Gurgaon",
            type: "Internship",
            deadline: "2024-04-10",
            requirements: ["Analytics", "Product Strategy", "Communication"],
            matchScore: 78
        }
    ];

    const mentors = [
        {
            id: 1,
            name: "Priya Sharma",
            company: "Microsoft",
            position: "Senior Software Engineer",
            experience: "8 years",
            specialization: "Full Stack Development",
            sessions: 12,
            rating: 4.8
        },
        {
            id: 2,
            name: "Rahul Gupta",
            company: "Amazon",
            position: "Product Manager",
            experience: "6 years",
            specialization: "Product Management",
            sessions: 8,
            rating: 4.9
        },
        {
            id: 3,
            name: "Anjali Verma",
            company: "Google",
            position: "Data Scientist",
            experience: "5 years",
            specialization: "Machine Learning",
            sessions: 15,
            rating: 4.7
        }
    ];

    const showToast = (title, description) => {
        setToast({ title, description });

        setTimeout(() => {
            setToast({ title: "", description: "" });
        }, 3000);
    };

    const handleJobApply = (jobId) => {
        showToast("Application Submitted", "Your job application has been submitted successfully!");
    };

    const handleResumeUpload = () => {
        // In a real application, you'd handle the file upload here
        showToast("Resume Updated", "Your resume has been uploaded and updated successfully!");
    };

    const handleMentorConnect = (mentorName) => {
        showToast("Mentor Request Sent", `Your mentorship request has been sent to ${mentorName}!`);
    };

    const navigateToComingSoon = () => {
        navigate('/coming-soon');
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Selected":
                return "bg-green-500 text-white";
            case "Interview Scheduled":
                return "bg-blue-500 text-white";
            case "Applied":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    const getTypeBadgeClass = (type) => {
        return type === "Internship" ? "bg-purple-500 text-white" : "bg-teal-500 text-white";
    };

    const filteredJobs = availableJobs.filter(job =>
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Function to trigger the hidden file input click
    const handleChooseFileClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle file selection (you would integrate your upload logic here)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file:", file.name);
            // Here you would typically send the file to a server or process it further
            showToast("File Selected", `"${file.name}" is ready for upload.`);
        }
    };

    return (
        <div className="p-1 space-y-6 w-full max-w-full mx-auto xl:px-2 lg:px-16 md:px-8"> {/* Adjusted max-w-7xl to max-w-full and added responsive padding */}
            {/* Toast Notification */}
            <Toast title={toast.title} description={toast.description} onClose={() => setToast({ title: "", description: "" })} />

            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-blue-700 rounded-lg p-6 text-white ">
                <h1 className="text-2xl font-bold mb-2">Placement & Career Center</h1>
                <p className="text-green-100">Your gateway to internships, jobs, and career guidance</p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="jobs">Job Portal</TabsTrigger>
                    <TabsTrigger value="resume">Resume Builder</TabsTrigger>
                    <TabsTrigger value="mentors">Alumni Mentors</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatsCard
                                title="Applications"
                                value={jobApplications.length}
                                icon={Briefcase}
                                color="text-blue-600"
                                bgColor="bg-blue-100"
                            />
                            <StatsCard
                                title="Selected"
                                value={jobApplications.filter(app => app.status === "Selected").length}
                                icon={CheckCircle}
                                color="text-green-600"
                                bgColor="bg-green-100"
                            />
                            <StatsCard
                                title="Pending"
                                value={jobApplications.filter(app => app.status !== "Selected").length}
                                icon={Clock}
                                color="text-orange-600"
                                bgColor="bg-orange-100"
                            />
                            <StatsCard
                                title="Mentors"
                                value={mentors.length}
                                icon={Users}
                                color="text-purple-600"
                                bgColor="bg-purple-100"
                            />
                        </div>

                        {/* Recent Applications */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold mb-2">Recent Applications</h2>
                            <p className="text-gray-600 mb-4">Track your job and internship applications</p>
                            <div className="space-y-4">
                                {jobApplications.map((app) => (
                                    <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-lg">{app.position}</h4>
                                            <p className="text-sm text-gray-600">{app.company} • {app.package}</p>
                                            <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">{app.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="jobs">
                    <div className="space-y-6">
                        {/* Search and Filter */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs, companies, skills..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={navigateToComingSoon}
                                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </button>
                                <button
                                    onClick={navigateToComingSoon}
                                    className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <Bell className="mr-2 h-4 w-4" />
                                    Job Alerts
                                </button>
                            </div>
                        </div>

                        {/* Job Listings */}
                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{job.position}</h3>
                                                <p className="text-gray-600">{job.company}</p>
                                                <p className="text-sm text-gray-500">{job.location}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end mb-2">
                                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                    <span className="text-sm font-medium">{job.matchScore}% Match</span>
                                                </div>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(job.type)}`}>
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Package:</span>
                                                <p className="font-medium">{job.package}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Deadline:</span>
                                                <p className="font-medium">{job.deadline}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-sm text-gray-600">Required Skills:</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {job.requirements.map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleJobApply(job.id)}
                                                className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-black/70 transition-colors duration-200"
                                            >
                                                Apply Now
                                            </button>
                                            <button
                                                onClick={navigateToComingSoon}
                                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={navigateToComingSoon}
                                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-8">No jobs found matching your search.</div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="resume">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold flex items-center mb-2">
                                <Upload className="mr-2 h-5 w-5 text-blue-500" />
                                Resume Upload
                            </h2>
                            <p className="text-gray-600 mb-4">Upload and manage your resume</p>
                            <div className="space-y-4">
                                <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-2">Upload your resume (PDF, DOC)</p>
                                      {/* Hidden file input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx" // Ensure this line is exactly as written
                                    />
                                    <button
                                        onClick={handleChooseFileClick}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                        Choose File
                                    </button>
                                </div>
                                <button
                                    onClick={handleResumeUpload}
                                    className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-black/70 transition-colors duration-200"
                                >
                                    Update Resume
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold mb-2">Resume Analysis</h2>
                            <p className="text-gray-600 mb-4">AI-powered resume insights</p>
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Overall Score</span>
                                        <span className="font-bold text-green-600">85/100</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">ATS Compatibility</span>
                                        <span className="font-bold text-blue-600">Good</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Skill Matches</span>
                                        <span className="font-bold text-purple-600">12/15</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium">Suggestions:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                        <li>Add more technical skills</li>
                                        <li>Include project quantifications</li>
                                        <li>Update contact information</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="mentors">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.map((mentor) => (
                                <div key={mentor.id} className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <Users className="h-8 w-8 text-gray-500" />
                                        </div>
                                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                                        <p className="text-sm text-gray-600">{mentor.position}</p>
                                        <p className="text-sm text-gray-500">{mentor.company}</p>
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Experience:</span>
                                            <span className="font-medium">{mentor.experience}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sessions:</span>
                                            <span className="font-medium">{mentor.sessions}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Rating:</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                <span className="font-medium">{mentor.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {mentor.specialization}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleMentorConnect(mentor.name)}
                                        className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-black/70 transition-colors duration-200"
                                    >
                                        Connect
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PlacementModule;