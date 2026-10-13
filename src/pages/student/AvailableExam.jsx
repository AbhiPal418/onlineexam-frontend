import { useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/AvailableExams.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function AvailableExams() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState([]);
    const [user, setUser] = useState({});
    const [search, setSearch] = useState("");
    const [attendingExam, setAttendingExam] = useState({});
    // const [searchExams, setSearchExams] = useState([]);

    const searchExamsA = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `/api/v1/student/search-exams?query=${search}`
            );
            console.log(response)
            setExams(response.data.data);
            setLoading(false)
        } catch (error) {
            console.error("Error searching exams:", error);
        }
    };
    const fetchStudentData = async () => {
        try {
            const response = await axios.get("/api/v1/student/dashboard");
            // setUsername(response.data.data.fullName);
            // console.log(response.data.data);
            // setAttemptedExams(response.data.data.attemptedExams);
            // console.log(user)
            setUser(response.data.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };
    const getAllExams = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/v1/student/all-exams");
            setExams(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching all exams:", error);
        }
    }

    // const attendingExamSetting = async()=>{
    //     for()
    // }
    useEffect(() => {
        fetchStudentData();
        if (search === "") {
            getAllExams();
        } else {
            searchExamsA();
        }
    }, [search])

    // console.log(exams)
    const username = user.username
    // console.log(username)
    const handleStartExam = (examId, exam) => {
        // console.log(exam)
        navigate(`/student/${user.username}/attend-exam/${examId}`, {
            state: {
                exam: exam,
                student: username
            }
        }
        );
    };


    return (
        <div className="available-layout">
            <StudentSidebar />

            <main className="available-main">

                {/* Header */}
                <div className="available-header">
                    <div>
                        <h1>{user.fullName} here is your Available Exams</h1>
                    </div>

                    <div className="available-profile">
                        <div className="available-notification"></div>

                        <div className="available-avatar">
                            {user.fullName?.[0]}
                        </div>
                    </div>
                </div>

                {/* Search */}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchExamsA();
                    }}
                >
                    <div className="exam-search-container">
                        <input
                            className="exam-search"
                            type="text"
                            placeholder="Search exams..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* <button type="submit"
                            className="exam-search-btn"
                        >
                            Search
                        </button> */}
                    </div>
                </form>
                {/* Exams */}

                {
                    loading ? (<div className="loader">
                        Loading...
                    </div>) : (
                        <div>
                            {
                                exams.length > 0 ? (
                                    (<div className="available-exam-grid">
                                        {exams.map((exam) => (
                                            <div className="available-exam-card" key={exam._id}>
                                                <div className="available-exam-top">

                                                <h2>{exam.title}</h2>
                                                    <p className="available-status">{exam.status}</p>
                                                </div>
                                                <p className="available-teacher">
                                                    Created by <strong>{exam.createdBy.fullName}</strong>
                                                </p>

                                                <div className="available-exam-info">
                                                    <div>
                                                        <span>{exam.totalQuestion} Questions</span>

                                                    </div>

                                                    <div>
                                                        <span>Time {exam.timeLimit} min</span>

                                                    </div>

                                                    <div>
                                                        <span>{exam.questions.length * 4} Marks</span>

                                                    </div>
                                                </div>

                                                <button className="available-start-btn" onClick={() => handleStartExam(exam._id, exam)}>
                                                    Start Exam →
                                                </button>

                                            </div>
                                        ))}
                                    </div>)
                                ) : (<p className="not-found">No Available Exam</p>)
                            }
                        </div>
                    )

                }



            </main>

        </div>
    );
}

export default AvailableExams;