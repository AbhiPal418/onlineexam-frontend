import { useState } from "react";
import { useNavigate, useParams ,useLocation} from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/AttendExam.css";
import axios from "axios";

function AttendExam() {
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { examId } = useParams();

    const exam = location.state?.exam;
    const student = location.state?.student;

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!password.trim()) {
            setError("Please enter the exam password");
            return;
        }

        try {
            const response = await axios.post(
                `/api/v1/student/attend-exam/${examId}`,
                {password,},{withCredentials: true,}
            );

            if (response.data.success) {
                navigate(`/student/exam/${examId}`,{
                    state:{
                        exam:response.data.data,
                        student:student
                    }
                });
                console.log("Hello");
            }

        } catch (error) {
            console.error(error.response.data);

            setError(
                error.response?.data?.message ||
                "Incorrect exam password"
            );
        }
    };


    return (
        <div className="attend-layout">
            <StudentSidebar />

            <main className="attend-main">

                <div className="attend-container">

                    <div className="attend-card">

                        <div className="attend-icon">
                            🔒
                        </div>

                        <h1>Enter Exam Password</h1>

                        <p className="attend-description">
                            This examination is password protected. Enter the password
                            provided by your teacher to continue.
                        </p>

                        <div className="exam-preview">
                            <div className="exam-preview-icon">
                                📝
                            </div>

                            <div>
                                <h3>{exam.title}</h3>
                                <p>{exam.questions.length} Questions • {exam.timeLimit} Minutes</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="password-group">
                                <label>Exam Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter exam password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                />

                                {error && (
                                    <p className="password-error">
                                        {error}
                                    </p>
                                )}


                            </div>

                            <button type="submit" className="verify-exam-btn">
                                Verify & Start Exam →
                            </button>

                        </form>

                        <button
                            className="back-exams-btn"
                            onClick={() => navigate(`/student/${student}/available-exams`)}
                        >   
                            ← Back to Available Exams {student}
                        </button>

                    </div>

                </div>

            </main>
        </div>
    );
}

export default AttendExam;