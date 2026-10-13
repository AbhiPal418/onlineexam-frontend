import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeacherSidebar from "../../components/TeacherSidebar";
import "../../styles/ExamResults.css";

const ExamResults = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    // Temporary data
    // Later fetch these from your backend
    useEffect(() => {
        const dummyExams = [
            {
                _id: "1",
                title: "Java Programming Fundamentals",
                totalQuestions: 20,
                totalMarks: 80,
                attempts: 24,
            },
            {
                _id: "2",
                title: "Data Structures",
                totalQuestions: 25,
                totalMarks: 100,
                attempts: 18,
            },
            {
                _id: "3",
                title: "Database Management System",
                totalQuestions: 15,
                totalMarks: 60,
                attempts: 32,
            },
        ];

        setExams(dummyExams);
        setSelectedExam(dummyExams[0]);

        const dummyResults = [
            {
                _id: "r1",
                studentName: "Rahul Sharma",
                rollNumber: "CSE001",
                email: "rahul@example.com",
                score: 72,
                totalMarks: 80,
                percentage: 90,
                status: "Completed",
                submittedAt: "2026-09-19T10:30:00",
            },
            {
                _id: "r2",
                studentName: "Priya Singh",
                rollNumber: "CSE002",
                email: "priya@example.com",
                score: 64,
                totalMarks: 80,
                percentage: 80,
                status: "Completed",
                submittedAt: "2026-09-19T11:15:00",
            },
            {
                _id: "r3",
                studentName: "Amit Kumar",
                rollNumber: "CSE003",
                email: "amit@example.com",
                score: 52,
                totalMarks: 80,
                percentage: 65,
                status: "Completed",
                submittedAt: "2026-09-19T12:05:00",
            },
            {
                _id: "r4",
                studentName: "Sneha Das",
                rollNumber: "CSE004",
                email: "sneha@example.com",
                score: 76,
                totalMarks: 80,
                percentage: 95,
                status: "Completed",
                submittedAt: "2026-09-19T12:40:00",
            },
            {
                _id: "r5",
                studentName: "Arjun Roy",
                rollNumber: "CSE005",
                email: "arjun@example.com",
                score: 44,
                totalMarks: 80,
                percentage: 55,
                status: "Completed",
                submittedAt: "2026-09-19T13:10:00",
            },
        ];

        setResults(dummyResults);
    }, []);

    const handleExamChange = (e) => {
        const exam = exams.find(
            (item) => item._id === e.target.value
        );

        setSelectedExam(exam);

        // Later:
        // fetch results for selected exam from backend
    };

    const filteredResults = results.filter((result) => {
        const searchValue = search.toLowerCase();

        return (
            result.studentName
                .toLowerCase()
                .includes(searchValue) ||
            result.rollNumber
                .toLowerCase()
                .includes(searchValue) ||
            result.email
                .toLowerCase()
                .includes(searchValue)
        );
    });

    const averageScore =
        results.length > 0
            ? (
                results.reduce(
                    (total, result) => total + result.percentage,
                    0
                ) / results.length
            ).toFixed(1)
            : 0;

    const highestScore =
        results.length > 0
            ? Math.max(
                ...results.map((result) => result.percentage)
            )
            : 0;

    const passedStudents = results.filter(
        (result) => result.percentage >= 40
    ).length;


    const handleDownloadResults = () => {
        if (!selectedExam || results.length === 0) {
            alert("No results available to download.");
            return;
        }

        const headers = [
            "Student Name",
            "Roll Number",
            "Email",
            "Score",
            "Total Marks",
            "Percentage",
            "Status",
            "Submitted At",
        ];

        const rows = results.map((result) => [
            result.studentName,
            result.rollNumber,
            result.email,
            result.score,
            result.totalMarks,
            `${result.percentage}%`,
            result.status,
            new Date(result.submittedAt).toLocaleString("en-IN"),
        ]);

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        link.download = `${selectedExam.title}-results.csv`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    
    return (
        <div className="teacher-page">
            <TeacherSidebar />

            <main className="teacher-main exam-results-main">

                {/* Header */}
                <div className="results-page-header">
                    <div>
                        <h1>Exam Results</h1>
                        <p>
                            View and analyze student performance in your exams.
                        </p>
                    </div>
                </div>

                {/* Exam Selector */}
                <div className="exam-selector-card">
                    <div className="selector-content">
                        <label htmlFor="examSelect">
                            Select Exam
                        </label>

                        <select
                            id="examSelect"
                            value={selectedExam?._id || ""}
                            onChange={handleExamChange}
                        >
                            {exams.map((exam) => (
                                <option
                                    key={exam._id}
                                    value={exam._id}
                                >
                                    {exam.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedExam && (
                        <div className="selected-exam-info">
                            <span>
                                📝 {selectedExam.totalQuestions} Questions
                            </span>

                            <span>
                                🎯 {selectedExam.totalMarks} Marks
                            </span>

                            <span>
                                👥 {selectedExam.attempts} Attempts
                            </span>
                        </div>
                    )}
                </div>

                {/* Statistics */}
                <div className="results-statistics">

                    <div className="result-stat-card">
                        <div className="result-stat-icon">
                            👥
                        </div>

                        <div>
                            <span className="result-stat-value">
                                {results.length}
                            </span>

                            <span className="result-stat-label">
                                Students Attempted
                            </span>
                        </div>
                    </div>

                    <div className="result-stat-card">
                        <div className="result-stat-icon">
                            📊
                        </div>

                        <div>
                            <span className="result-stat-value">
                                {averageScore}%
                            </span>

                            <span className="result-stat-label">
                                Average Score
                            </span>
                        </div>
                    </div>

                    <div className="result-stat-card">
                        <div className="result-stat-icon">
                            🏆
                        </div>

                        <div>
                            <span className="result-stat-value">
                                {highestScore}%
                            </span>

                            <span className="result-stat-label">
                                Highest Score
                            </span>
                        </div>
                    </div>

                    <div className="result-stat-card">
                        <div className="result-stat-icon">
                            ✅
                        </div>

                        <div>
                            <span className="result-stat-value">
                                {passedStudents}
                            </span>

                            <span className="result-stat-label">
                                Passed
                            </span>
                        </div>
                    </div>

                </div>

                {/* Results Section */}
                <div className="results-card">

                    <div className="results-card-header">

                        <div>
                            <h2>Student Results</h2>

                            {selectedExam && (
                                <p>
                                    {selectedExam.title}
                                </p>
                            )}
                        </div>

                        <div className="results-header-actions">

                            <div className="results-search">
                                <span>🔍</span>

                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="download-results-btn"
                                onClick={handleDownloadResults}
                            >
                                ⬇️ Download Results
                            </button>

                        </div>

                    </div>

                    {/* Table */}
                    {filteredResults.length === 0 ? (
                        <div className="no-results">
                            <div>📊</div>

                            <h3>No Results Found</h3>

                            <p>
                                No student results match your search.
                            </p>
                        </div>
                    ) : (
                        <div className="results-table-wrapper">
                            <table className="results-table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student</th>
                                        <th>Roll Number</th>
                                        <th>Score</th>
                                        <th>Percentage</th>
                                        <th>Status</th>
                                        <th>Submitted</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredResults.map(
                                        (result, index) => (
                                            <tr key={result._id}>

                                                <td className="serial-number">
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <div className="student-cell">

                                                        <div className="student-avatar">
                                                            {result.studentName?.[0]?.toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <strong>
                                                                {result.studentName}
                                                            </strong>

                                                            <span>
                                                                {result.email}
                                                            </span>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="roll-number">
                                                        {result.rollNumber}
                                                    </span>
                                                </td>

                                                <td>
                                                    <strong>
                                                        {result.score}
                                                    </strong>
                                                    <span className="total-marks">
                                                        / {result.totalMarks}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`percentage ${result.percentage >= 80
                                                            ? "excellent"
                                                            : result.percentage >= 60
                                                                ? "good"
                                                                : result.percentage >= 40
                                                                    ? "average"
                                                                    : "poor"
                                                            }`}
                                                    >
                                                        {result.percentage}%
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="result-status">
                                                        {result.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="submitted-date">
                                                        {new Date(
                                                            result.submittedAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                </td>

                                                <td>
                                                    <Link
                                                        to={`/teacher/result/${result._id}`}
                                                        className="view-result-btn"
                                                    >
                                                        View
                                                    </Link>
                                                </td>

                                            </tr>
                                        )
                                    )}
                                </tbody>

                            </table>
                        </div>
                    )}

                </div>

            </main>
        </div>
    );
};

export default ExamResults;