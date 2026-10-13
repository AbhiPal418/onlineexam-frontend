
import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import axios from "axios";
function AttemptedExams() {

    const [attemptedExams, setAttemptedExams] = useState([]);
    
    const fetchStudentData = async () => {
        try {
            const response = await axios.get("/api/v1/student/attempted-exams");
            // setUsername(response.data.data.fullName);
            console.log(response.data.data);
            setAttemptedExams(response.data.data);
            // setUser(response.data.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, [])

    // let username = "";
    // for (let i = 0; i < 20; i++) {
    //     if (email[i] !== '@') {
    //         username += email[i];
    //     } else {
    //         username += rollNumber;
    //         break;
    //     }
    // }

    // console.log(attemptedExams)
    return (
        <div className="attempted-layout">
            <StudentSidebar />

            <main className="attempted-main">

                <div className="attempted-header">
                    <div>
                        <h1>Attempted Exams</h1>
                        <p>View all examinations you have completed.</p>
                    </div>

                    <div className="attempted-profile">
                        <span className="notification-icon">🔔</span>

                        <div className="attempted-avatar">
                            A
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="attempted-stats">
                    {/* <div className="attempted-stat-card">
                        <div className="stat-icon">📝</div>

                        <div>
                            <p>Total Attempted</p>
                            <h2>{attemptedExams.length}</h2>
                        </div>
                    </div> */}

                    <div className="attempted-stat-card">
                        <div className="stat-icon">🏆</div>

                        <div>
                            <p>Highest Score</p>
                            {/* <h2>
                                {Math.max(
                                    ...attemptedExams.map((exam) => exam.percentage)
                                )}
                                %
                            </h2> */}
                        </div>
                    </div>

                    <div className="attempted-stat-card">
                        <div className="stat-icon">📊</div>

                        <div>
                            <p>Average Score</p>

                            <h2>
                                {/* {Math.round(
                                    attemptedExams.reduce(
                                        (total, exam) => total + exam.percentage,
                                        0
                                    ) / attemptedExams.length
                                )}
                                % */}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="attempted-section">
                    <div className="attempted-section-header">
                        <div>
                            <h2>Exam History</h2>
                            <p>Your completed examination attempts</p>
                        </div>

                        <input
                            type="text"
                            placeholder="Search exams..."
                            className="attempted-search"
                        />
                    </div>

                    <div className="attempted-table-container">
                        <table className="attempted-table">
                            <thead>
                                <tr>
                                    <th>Exam Name</th>
                                    {/* <th>Attempt Date</th> */}
                                    {/* <th>Questions</th> */}
                                    {/* <th>Score</th> */}
                                    {/* <th>Percentage</th> */}
                                    {/* <th>Status</th> */}
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {attemptedExams?.map((exam, index) => (
                                    <tr key={index}>
                                        <td className="exam-title">
                                            <div className="exam-title-content">
                                                <div className="exam-small-icon">📝</div>
                                                {exam.title}
                                            </div>
                                        </td>

                                        {/* <td>{exam.date}</td> */}

                                        {/* <td>{exam.questions}</td> */}

                                        {/* <td>
                                            <strong>
                                                {exam.score} / {exam.totalMarks}
                                            </strong>
                                        </td> */}

                                        {/* <td>
                                            <span className="percentage-badge">
                                                {exam.percentage}%
                                            </span>
                                        </td> */}

                                        {/* <td>
                                            <span className="completed-status">
                                                {exam.status}
                                            </span>
                                        </td> */}

                                        <td>
                                            <button className="view-details-btn">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AttemptedExams;
