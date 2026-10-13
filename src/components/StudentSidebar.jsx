import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function StudentSidebar() {
    // const [activeLink, setActiveLink] = useState("dashboard");
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [student, setStudent] = useState({});
    
    const location = useLocation();

    const fetchStudentData = async () => {
        // e.preventDefault();
        try {
            const response = await axios.get("/api/v1/student/dashboard");
            // console.log(response.data.data)
            setStudent(response.data.data);
            
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/v1/student/logout");
            console.log(response.data)
            if (response.data.success) {
                navigate(`/login`, {
                    state: {
                        role: "student"
                    }
                });
            }
        } catch (error) {
            console.error("Error while Logging out:", error);
        }

    }
    // console.log("hi");
    useEffect(() => {
        fetchStudentData();
    }, [])


    return (
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <span>Test Zone</span>
                </div>

                <nav className="sidebar-menu">

                    <Link to={`/student/${student.username}/dashboard`} className={`sidebar-link ${location.pathname === `/student/${student.username}/dashboard`
                        ? "active"
                        : ""
                        }`}
                    >
                        <span></span>
                        Dashboard
                    </Link>

                    <Link to={`/student/${student.username}/available-exams`}
                        // onClick={() => setActiveLink("available-exams")}
                        className={`sidebar-link ${location.pathname === `/student/${student.username}/available-exams`
                            ? "active"
                            : ""
                            }`}
                    >
                        <span></span>
                        Available Exams
                    </Link>

                    <Link to={`/student/${student.username}/results`} className={`sidebar-link ${location.pathname === `/student/${student.username}/results`
                        ? "active"
                        : ""
                        }`} >
                        <span></span>
                        My Results
                    </Link>

                    <Link to={`/student/${student.username}/profile`} className={`sidebar-link ${location.pathname === `/student/${student.username}/profile`
                        ? "active"
                        : ""
                        }`}>
                        <span></span>
                        Profile
                    </Link>

                </nav>

                <div className="sidebar-bottom">
                    <button onClick={() => setShowModal(true)} className="logout-btn">
                        <span>↪</span>
                        Logout
                    </button>

                </div>

                <div>
                    {showModal && (

                        <div className="logout-modal-overlay">

                            <div className="logout-modal">

                                <h2>Logout</h2>
                                <p> Are you sure you want to logout?</p>

                                <div className="logout-modal-buttons">

                                    <button
                                        className="cancel-logout-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="confirm-logout-btn"
                                        onClick={handleLogout}
                                    >
                                        Yes, Logout
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}
                </div>

            </aside>

    );
}

export default StudentSidebar;