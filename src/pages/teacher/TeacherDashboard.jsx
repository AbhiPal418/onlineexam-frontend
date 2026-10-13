import { Link } from "react-router-dom";
import TeacherSidebar from "../../components/TeacherSidebar";
import "../../styles/TeacherDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";

function TeacherDashboard() {

    // Temporary data — later fetched from backend
    const recentExams = [
        {
            title: "Java Programming Fundamentals",
            questions: 20,
            students: 42,
            status: "Published",
            date: "Sep 3, 2026"
        },
        {
            title: "Data Structures and Algorithms",
            questions: 25,
            students: 35,
            status: "Published",
            date: "Sep 1, 2026"
        },
        {
            title: "Database Management System",
            questions: 15,
            students: 0,
            status: "Draft",
            date: "Aug 30, 2026"
        }
    ];

    const recentActivity = [
        {
            student: "Rahul Sharma",
            exam: "Java Programming",
            score: "85%",
            time: "10 minutes ago"
        },
        {
            student: "Priya Das",
            exam: "Data Structures",
            score: "92%",
            time: "25 minutes ago"
        },
        {
            student: "Amit Kumar",
            exam: "Java Programming",
            score: "78%",
            time: "1 hour ago"
        }
    ];

    const [teacher, setTeacher] = useState({});

    const fetchTeachserData = async () => {
        try {
            const response = await axios.get("/api/v1/teacher/dashboard");
            setTeacher(response.data.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    useEffect(() => {
        fetchTeachserData();
    }, [])

    // console.log(teacher)
    return (
        <div className="teacher-layout">

            <TeacherSidebar />

            <main className="teacher-main">

                {/* Header */}
                <header className="teacher-dashboard-header">

                    <div>
                        <h1>Good Morning, {teacher.fullName} </h1>
                        <p>Here's what's happening with your exams today.</p>
                    </div>

                    <div className="teacher-header-profile">

                        {/* <div className="teacher-notification">
                            🔔
                        </div> */}

                        <div className="teacher-profile-avatar">
                            {teacher.fullName?.[0].toUpperCase()}
                        </div>

                    </div>

                </header>


                {/* Statistics */}

                <section className="teacher-stats-grid">

                    <div className="teacher-stat-card">
                        {/* <div className="teacher-stat-icon exams">
                            📝
                        </div> */}

                        <div>
                            <p>Total Exams</p>
                            <h2>{teacher.createdExams?.length}</h2>
                        </div>
                    </div>

                    <div className="teacher-stat-card">
                        {/* <div className="teacher-stat-icon attempts">
                            📋
                        </div> */}

                        <div>
                            <p>Total Attempts</p>
                            <h2>356</h2>
                        </div>
                    </div>

                </section>


                {/* Quick Actions */}

                <section className="teacher-quick-actions">

                    <div>
                        <h2>Quick Actions</h2>
                        <p>Manage your examinations efficiently</p>
                    </div>

                    <div className="quick-action-buttons">

                        <Link
                            to={`/teacher/${teacher.username}/create-exam`}
                            className="create-exam-button"
                        >
                            ➕ Create New Exam
                        </Link>

                        <Link
                            to={`/teacher/${teacher.username}/exams`}
                            className="manage-exam-button"
                        >
                            Manage Exams
                        </Link>

                    </div>

                </section>


                {/* Recent Exams */}

                <section className="teacher-dashboard-section">

                    <div className="teacher-section-header">
                        <div>
                            <h2>Recent Exams</h2>
                            <p>Your recently created examinations</p>
                        </div>

                        <Link
                            to={`/teacher/${teacher.username}/my-exams`}
                            className="teacher-view-all"
                        >
                            View All →
                        </Link>
                    </div>


                    <div className="teacher-exam-list">

                        {recentExams.map((exam, index) => (

                            <div className="teacher-exam-item" key={index}>

                                <div className="teacher-exam-icon">
                                    📝
                                </div>

                                <div className="teacher-exam-info">

                                    <h3>{exam.title}</h3>

                                    <div className="teacher-exam-meta">
                                        <span>{exam.questions} Questions</span>
                                        <span>•</span>
                                        <span>{exam.students} Students</span>
                                        <span>•</span>
                                        <span>{exam.date}</span>
                                    </div>

                                </div>

                                <span
                                    className={`exam-status ${exam.status.toLowerCase()}`}
                                >
                                    {exam.status}
                                </span>

                                <button className="exam-more-btn">
                                    ⋮
                                </button>

                            </div>

                        ))}

                    </div>

                </section>


                {/* Recent Activity */}

                <section className="teacher-dashboard-section">

                    <div className="teacher-section-header">
                        <div>
                            <h2>Recent Student Activity</h2>
                            <p>Latest exam submissions</p>
                        </div>
                    </div>


                    <div className="teacher-activity-card">

                        {recentActivity.map((activity, index) => (

                            <div className="teacher-activity-item" key={index}>

                                <div className="student-avatar">
                                    {activity.student.charAt(0)}
                                </div>

                                <div className="activity-info">
                                    <h3>{activity.student}</h3>
                                    <p>
                                        Completed {activity.exam}
                                    </p>
                                </div>

                                <div className="activity-score">
                                    <strong>{activity.score}</strong>
                                    <span>{activity.time}</span>
                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default TeacherDashboard;