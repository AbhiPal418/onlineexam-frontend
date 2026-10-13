import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeacherSidebar from "../../components/TeacherSidebar";
import "../../styles/MyExams.css";
import axios from "axios";
const MyExams = () => {
    const [exams, setExams] = useState([]);
    const [search, setSearch] = useState("");
    const [teacher, setTeacher] = useState({});

    // Temporary data
    // Later this will come from your backend API

    const dummyExams = [
        {
            _id: "1",
            title: "Java Programming Fundamentals",
            description:
                "Basic concepts of Java programming and OOP.",
            totalQuestions: 20,
            timeLimit: 30,
            totalMarks: 80,
            createdAt: "2026-09-15",
            attempts: 24,
            status: "Active",
        },
        {
            _id: "2",
            title: "Data Structures",
            description:
                "Arrays, linked lists, stacks, queues and trees.",
            totalQuestions: 25,
            timeLimit: 45,
            totalMarks: 100,
            createdAt: "2026-09-12",
            attempts: 18,
            status: "Active",
        },
        {
            _id: "3",
            title: "Database Management System",
            description:
                "SQL, normalization, transactions and database concepts.",
            totalQuestions: 15,
            timeLimit: 20,
            totalMarks: 60,
            createdAt: "2026-09-08",
            attempts: 32,
            status: "Closed",
        },
    ];
    
    const fetchTeachserData = async () => {
        try {
            const response = await axios.get("/api/v1/teacher/dashboard");
            setTeacher(response.data.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const fetchTeachsersExams= async () => {
        try {
            const response = await axios.get("/api/v1/teacher/created-exams");
            setExams(response.data.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };


    
    useEffect(() => {
        fetchTeachserData();
        fetchTeachsersExams();
    }, []);

    const filteredExams = exams.filter((exam) =>
        exam.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (examId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this exam?"
        );

        if (!confirmDelete) return;

        setExams((prev) =>
            prev.filter((exam) => exam._id !== examId)
        );
    };

    console.log("hello")
    return (
        <div className="teacher-page">
            <TeacherSidebar />

            <main className="teacher-main my-exams-main">
               
                {/* Header */}
                <div className="my-exams-header">
                    <div>
                        <h1>My Exams</h1>
                        <p>
                            Manage the exams you have created.
                        </p>
                    </div>

                    <Link
                        to="/teacher/create-exam"
                        className="create-exam-btn"
                    >
                        + Create Exam
                    </Link>
                </div>

                {/* Statistics */}
                <div className="exam-summary">

                    <div className="exam-summary-card">
                        <div className="summary-icon">📝</div>

                        <div>
                            <span className="summary-value">
                                {exams.length}
                            </span>

                            <span className="summary-label">
                                Total Exams
                            </span>
                        </div>
                    </div>

                    <div className="exam-summary-card">
                        <div className="summary-icon">🟢</div>

                        <div>
                            <span className="summary-value">
                                {
                                    exams.filter(
                                        (exam) => exam.status === "Active"
                                    ).length
                                }
                            </span>

                            <span className="summary-label">
                                Active Exams
                            </span>
                        </div>
                    </div>

                    <div className="exam-summary-card">
                        <div className="summary-icon">👥</div>

                        <div>
                            <span className="summary-value">
                                {exams.reduce(
                                    (total, exam) =>
                                        total + exam.attempts,
                                    0
                                )}
                            </span>

                            <span className="summary-label">
                                Total Attempts
                            </span>
                        </div>
                    </div>

                </div>

                {/* Search */}
                <div className="my-exams-toolbar">

                    <div className="exam-search">
                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search exams..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                    <span className="exam-count">
                        {filteredExams.length} exam
                        {filteredExams.length !== 1 ? "s" : ""}
                    </span>

                </div>

                {/* Exams */}
                <div className="my-exams-list">

                    {filteredExams.length === 0 ? (
                        <div className="no-exams">

                            <div className="no-exams-icon">
                                📋
                            </div>

                            <h2>No Exams Found</h2>

                            <p>
                                {search
                                    ? "No exam matches your search."
                                    : "You haven't created any exams yet."}
                            </p>

                            {!search && (
                                <Link
                                    to={`/teacher/${teacher.username}/create-exam`}
                                    className="create-first-exam-btn"
                                >
                                    Create Your First Exam
                                </Link>
                            )}

                        </div>
                    ) : (
                        filteredExams.map((exam) => (

                            <div
                                className="my-exam-card"
                                key={exam._id}
                            >

                                <div className="exam-card-top">

                                    <div className="exam-title-section">

                                        <div className="exam-icon">
                                            📝
                                        </div>

                                        <div>
                                            <h2>{exam.title}</h2>

                                            {/* <p>
                                                {exam.description}
                                            </p> */}
                                        </div>

                                    </div>

                                    <span
                                        className={`exam-status ${exam.status.toLowerCase()
                                            }`}
                                    >
                                        {exam.status}
                                    </span>

                                </div>

                                <div className="exam-details">

                                    <div className="exam-detail">
                                        <span className="detail-icon">
                                            ❓
                                        </span>

                                        <div>
                                            <span className="detail-label">
                                                Questions
                                            </span>

                                            <strong>
                                                {exam.totalQuestion}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="exam-detail">
                                        <span className="detail-icon">
                                            ⏱️
                                        </span>

                                        <div>
                                            <span className="detail-label">
                                                Duration
                                            </span>

                                            <strong>
                                                {exam.timeLimit} min
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="exam-detail">
                                        <span className="detail-icon">
                                            🎯
                                        </span>

                                        <div>
                                            <span className="detail-label">
                                                Total Marks
                                            </span>

                                            <strong>
                                                {exam.totalQuestion*4}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="exam-detail">
                                        <span className="detail-icon">
                                            👥
                                        </span>

                                        <div>
                                            <span className="detail-label">
                                                Total Attempts
                                            </span>

                                            <strong>
                                                {exam.totalAttempts}
                                            </strong>
                                        </div>
                                    </div>

                                </div>

                                <div className="exam-card-footer">

                                    <span className="created-date">
                                        Created on{" "}
                                        {new Date(
                                            exam.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>

                                    <div className="exam-actions">

                                        <Link
                                            to={`/teacher/exam/${exam._id}`}
                                            className="view-exam-btn"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/teacher/exam/${exam._id}/edit`}
                                            className="edit-exam-btn"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-exam-btn"
                                            onClick={() =>
                                                handleDelete(exam._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    )}

                </div>

            </main>
        </div>

    );
};

export default MyExams;