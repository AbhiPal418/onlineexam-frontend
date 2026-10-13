import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/StudentDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function StudentDashboard() {
    // console.log("hello world")

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [attemptedExams, setAttemptedExams] = useState([]);

    const [exams, setExams] = useState([]);
    const [user, setUser] = useState({});
    const fetchStudentData = async () => {
        try {
            const response = await axios.get("/api/v1/student/dashboard");
            const attempted = await axios.get("/api/v1/student/attempted-exams");
            setUsername(response.data.data.fullName);
            setAttemptedExams(attempted.data.data);
            setUser(response.data.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const getAllExams = async () => {
        try {
            const response = await axios.get("/api/v1/student/all-exams");
            setExams(response.data.data);
        } catch (error) {
            console.error("Error fetching all exams:", error);
        }
    }


    const handleStartExam = (examId, exam) => {
        navigate(`/student/${user.fullName}/attend-exam/${examId}`, {
            state: {
                exam: exam,
                student: user.fullName
            }
        });
    };

    useEffect(() => {

        fetchStudentData(),
            getAllExams()

    }, []);

    // console.log("hi")
    if (!exams) return (<div>hello</div>)
    return (
        <div className="student-layout">

            <StudentSidebar />

            <main className="student-main">

                {/* Top Header */}

                <header className="dashboard-header">

                    <div>
                        <h1>Welcome, {user.fullName} </h1>
                    </div>

                    <div className="header-profile">

                        <div className="profile-avatar-dashboard">
                            {user.fullName?.[0]}
                        </div>
                    </div>

                </header>


                {/* Statistics */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div>
                            <p>Available Exams</p>
                            <h2>{exams.length}</h2>
                        </div>
                    </div>


                    <div className="stat-card">
                        {/* <div className="stat-icon green">✓</div> */}

                        <div>
                            <p>Attempted</p>
                            <h2>{attemptedExams.length}</h2>
                        </div>
                    </div>


                    <div className="stat-card">

                        <div>
                            <p>Average Score</p>
                            <h2>82%</h2>
                        </div>
                    </div>

                </section>


                {/* Available Exams */}

                <section className="dashboard-section">

                    <div className="section-header">
                        <div>
                            <h2>Available Exams</h2>
                            <p>Exams waiting for you</p>
                        </div>

                        <Link to={`/student/${user.username}/available-exams`}>
                            <button className="view-all-btn">
                                View All →
                            </button>
                        </Link>
                    </div>


                    <div className="exam-grid">

                        {exams?.map((exam, index) => (

                            <div className="exam-card-dashboard" key={index}>

                                <h3>{exam.title}</h3>

                                <p className="teacher-name">
                                    Created By <strong>{exam.createdBy.fullName}</strong>
                                </p>

                                <div className="exam-details-dashboard">

                                    <div>
                                        <span>{exam.totalQuestion} Questions </span>
                                    </div>

                                    <div>
                                        <span>Time {exam.timeLimit} min</span>
                                    </div>
                                </div>
                                <div className="exam-details-dashboard">
                                    <div>
                                        <span>{exam.questions.length * 4} Marks</span>
                                    </div>
                                    <div>
                                        <span>Total Attempts {exam.totalAttempts}</span>
                                    </div>


                                </div>

                                <button className="start-exam-btn" onClick={() => handleStartExam(exam._id, exam)}>
                                    Start Exam →
                                </button>

                            </div>

                        ))}

                    </div>

                </section>


                {/* Recent Performance */}

                <section className="dashboard-section">

                    <div className="section-header">
                        <div>
                            <h2>Recent Performance</h2>
                            <p>Your latest examination results</p>
                        </div>
                    </div>

                    <div className="performance-card">

                        {
                            attemptedExams?.map((exam, index) => (
                                <div id={index} className="performance-item">
                                    <div>
                                        <h3>{exam.title}</h3>
                                        <p>{exam.date}</p>
                                    </div>

                                    {/* <div className="score">
                                        76%
                                    </div> */}
                                </div>
                            ))
                        }

                    </div>

                </section>

            </main>

        </div>
    );

}

export default StudentDashboard;