import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function TeacherSidebar() {

    const location = useLocation();
    const [teacher, setTeacher] = useState({});
    const navigate = useNavigate();
    const fetchTeachserData = async () => {
        try {
            const response = await axios.get("/api/v1/teacher/dashboard");
            setTeacher(response.data.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/v1/teacher/logout");
            console.log(response.data)
            if (response.data.success) {
                navigate(`/login`, {
                    state: {
                        role: "teacher"
                    }
                });
            }
        } catch (error) {
            console.error("Error while Logging out:", error);
        }

    }
    useEffect(() => {
        fetchTeachserData();
    }, [])


    
    return (
        <aside className="teacher-sidebar">

            <div className="teacher-sidebar-logo">
                <span>Test Zone</span>
            </div>

            <nav className="teacher-sidebar-menu">

                <Link
                    to={`/teacher/${teacher.username}/dashboard`}
                    className={`teacher-sidebar-link ${location.pathname === `/teacher/${teacher.username}/dashboard` ? "active" : ""}`}
                >
                    Dashboard
                </Link>

                <Link
                    to={`/teacher/${teacher.username}/create-exam`}
                    className={`teacher-sidebar-link ${location.pathname === `/teacher/${teacher.username}/create-exam` ? "active" : ""}`}
                >
                    Create Exam
                </Link>

                <Link
                    to={`/teacher/${teacher.username}/my-exams`}
                    className={`teacher-sidebar-link ${location.pathname === `/teacher/${teacher.username}/my-exams` ? "active" : ""}`}
                >
                    My Exams
                </Link>

                <Link
                    to={`/teacher/${teacher.username}/exam-results`}
                    className={`teacher-sidebar-link ${location.pathname === `/teacher/${teacher.username}/exam-results` ? "active" : ""}`}
                >Results
                </Link>

                <Link
                    to={`/teacher/${teacher.username}/profile`}
                    className={`teacher-sidebar-link ${location.pathname === `/teacher/${teacher.username}/profile` ? "active" : ""}`}
                >
                    Profile
                </Link>

            </nav>

            <div className="teacher-sidebar-bottom">
                {/* <Link to="/" className="teacher-sidebar-link"> */}

                <button onClick={handleLogout} className="logout-btn">
                    <span>🚪</span>
                    Logout
                </button>
                {/* </Link> */}
            </div>

        </aside>
    );
}

export default TeacherSidebar;