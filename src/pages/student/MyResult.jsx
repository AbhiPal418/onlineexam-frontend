import { useEffect ,useState} from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/MyResults.css";
import axios from "axios";
function MyResults() {
    // Temporary data
    // const results = [
    //     {
    //         id: 1,
    //         exam: "Operating System",
    //         date: "Aug 28, 2026",
    //         score: 35,
    //         total: 40,
    //         percentage: 88,
    //         status: "Passed",
    //     },
    //     {
    //         id: 2,
    //         exam: "Computer Networks",
    //         date: "Aug 20, 2026",
    //         score: 38,
    //         total: 50,
    //         percentage: 76,
    //         status: "Passed",
    //     },
    //     {
    //         id: 3,
    //         exam: "Software Engineering",
    //         date: "Aug 15, 2026",
    //         score: 46,
    //         total: 50,
    //         percentage: 92,
    //         status: "Passed",
    //     },
    //     {
    //         id: 4,
    //         exam: "Database Management System",
    //         date: "Aug 10, 2026",
    //         score: 20,
    //         total: 40,
    //         percentage: 50,
    //         status: "Failed",
    //     },
    // ];

    const [results,setResults] = useState([]);
    const [user, setUser] = useState({});
    
    const fetchStudentData = async () => {
        try {
            const response = await axios.get("/api/v1/student/dashboard");
            const myResult = await axios.get("/api/v1/student/my-results");
            // setUsername(response.data.data.fullName);
            // console.log(response);
            // setAttemptedExams(response.data.data.attemptedExams);
            setUser(response.data.data);
            setResults(myResult.data.data)
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    useEffect(()=>{
        fetchStudentData();
    },[])
    // console.log(results)
    // const average =
    //     results.reduce((acc, result) => acc + result.percentage, 0) /
    //     results.length;

    // const passed = results.filter(
    //     (result) => result.status === "Passed"
    // ).length;

    return (
        <div className="results-layout">
            <StudentSidebar />

            <main className="results-main">

                {/* Header */}

                <div className="results-header">
                    <div>
                        <h1>{user.fullName} your Previous Exam Results</h1>
                        <p>Track your examination performance here.</p>
                    </div>

                    <div className="results-profile">
                        {/* <span>🔔</span> */}

                        <div className="results-avatar">
                            {user?.fullName?.[0]}
                        </div>
                    </div>
                </div>

                {/* Statistics */}

                <div className="results-stats">

                    <div className="result-stat-card">
                        {/* <div className="result-stat-icon purple">
                            📊
                        </div> */}

                        <div>
                            <p>Total Exams</p>
                            <h2>{results.length}</h2>
                        </div>
                    </div>


                    <div className="result-stat-card">
                        {/* <div className="result-stat-icon green">
                            ✓
                        </div> */}

                        <div>
                            <p>Exams Passed</p>
                            {/* <h2>{passed}</h2> */}
                        </div>
                    </div>


                    <div className="result-stat-card">
                        {/* <div className="result-stat-icon blue">
                            🏆
                        </div> */}

                        <div>
                            <p>Average Score</p>
                            {/* <h2>{average.toFixed(0)}%</h2> */}
                        </div>
                    </div>

                </div>

                {/* Results Table */}

                <section className="results-section">

                    <div className="results-section-header">
                        <div>
                            <h2>Exam History</h2>
                            <p>Your completed examinations</p>
                        </div>

                        <button className="results-filter-btn">
                            Filter
                        </button>
                    </div>


                    <div className="results-table-container">

                        <table className="results-table-std">

                            <thead>
                                <tr>
                                    <th>Exam</th>
                                    <th>Score</th>
                                    <th>Attempted</th>
                                    <th>Total Question</th>
                                    <th>Percentage</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>

                            <tbody>

                                {results.map((result) => (

                                    <tr key={result._id}>

                                        <td className="result-exam-name">
                                            {result.exam.title}
                                        </td>

                                        <td>
                                            {result.scoreObtained} / {result.totalScore}
                                        </td>
                                        <td>{result.attemptedQuestions}</td>
                                        <td>{result.totalScore/4}</td>
                                        <td>
                                            <strong>{Math.round((result.scoreObtained/result.totalScore)*100)}%</strong>
                                        </td>

                                        {/* <td>
                                            <button className="view-result-btn">
                                                View Result
                                            </button>
                                        </td> */}

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>
        </div>
    );
}

export default MyResults;