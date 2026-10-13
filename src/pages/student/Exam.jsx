import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../styles/Exam.css";
import axios from "axios";

function Exam() {
    const navigate = useNavigate();

    const { examId } = useParams();

    const location = useLocation();
    const exam = location.state?.exam;
    const student = location.state?.student;

    // console.log(student)

    if (!exam) {
        return <div>Exam data not found</div>;
    }

    // const [user, setUser] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(exam.timeLimit * 60);
    const [showSubmitModal, setShowSubmitModal] = useState(false);


    // Current question
    const question = exam.questions[currentQuestion];
    if (!question) {
        return (
            <div className="no-question-container">
                <div className="no-question-card">

                    <h2>No Questions Available</h2>

                    <p>
                        There are currently no questions available for this exam.
                    </p>

                    <button
                        onClick={() => navigate(`/student/${student.fullName}/available-exams`)}
                        className="back-exam-btn"
                    >
                        ← Back to Exams
                    </button>
                </div>
            </div>
        );
    }

    // Countdown Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    // Auto submit when time reaches 0
    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft]);

    // const fetchStudentData = async () => {
    //     try {
    //         const response = await axios.get("/api/v1/student/dashboard");
    //         setUser(response.data.data);
    //     } catch (error) {
    //         console.error("Error fetching student data:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchStudentData();
    // }, [])

    // Format Timer
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    };


    // Select Answer
    const handleAnswer = (currentQuestion, optionIndex) => {
        // console.log(currentQuestion.question)
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestion._id]: optionIndex,
        }));
    };


    // Next Question
    const handleNext = () => {
        if (currentQuestion < exam.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };


    // Previous Question
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const submitExam = async (data) => {
        try {

            await axios.post(
                `/api/v1/student/submit-exam`,
                data
            );

        } catch (error) {
            console.error(error);
        }

    }

    // Submit Exam
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Exam ID:", examId);
        console.log("Student Answers:", answers);
        const examData = {
            answers,
            examId
        }
        try {
            await submitExam(examData);

            navigate(`/student/${student.fullName}/results`);

        } catch (error) {
            console.error("Error submitting exam:", error);
        }
    };


    const answeredCount = Object.keys(answers).length;
    // console.log(answers)
    return (
        <div className="exam-page">

            {/* HEADER */}
            <header className="exam-header">

                <div className="exam-header-left">
                    <h2>{exam?.title}</h2>
                    <p>
                        Question {currentQuestion + 1} of {exam.questions.length}
                    </p>
                </div>

                <div className="exam-timer">
                    ⏱ {formatTime(timeLeft)}
                </div>

            </header>


            <div className="exam-layout">

                {/* MAIN QUESTION AREA */}
                <main className="question-area">

                    <div className="question-card">


                        {
                            question ? <div>
                                <div className="question-number">
                                    Question {currentQuestion + 1}
                                </div>
                                <h2 className="question-text">
                                    {question.question}
                                </h2></div> : <h2>No questions</h2>
                        }



                        {/* OPTIONS */}
                        {
                            question ? <div className="options-container">

                                {question.options.map((option, index) => (

                                    <label
                                        key={index}
                                        className={`option-card ${answers[question._id] === option
                                            ? "selected"
                                            : ""
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            checked={answers[question._id] === option}
                                            onChange={() => handleAnswer(question, option)}
                                        />

                                        <span className="option-letter">
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        <span>{option} {index}</span>

                                    </label>

                                ))}

                            </div> : <div></div>

                        }


                        {/* NAVIGATION BUTTONS */}
                        <div className="question-navigation">

                            <button
                                className="previous-btn"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                            >
                                ← Previous
                            </button>


                            {currentQuestion === exam.questions.length - 1 ? (

                                <button
                                    className="submit-exam-btn"
                                    onClick={() => setShowSubmitModal(true)}
                                >
                                    Submit Exam
                                </button>

                            ) : (

                                <button
                                    className="next-btn"
                                    onClick={handleNext}
                                >
                                    Next →
                                </button>

                            )}

                        </div>

                    </div>

                </main>


                {/* QUESTION PALETTE */}
                <aside className="question-sidebar">

                    <div className="question-sidebar-header">

                        <h3>Question Palette</h3>

                        <p>
                            {answeredCount} of {exam.questions.length} Answered
                        </p>

                    </div>


                    <div className="question-grid">

                        {exam.questions.map((_, index) => (

                            <button
                                key={index}
                                className={`question-palette-btn
                  ${currentQuestion === index
                                        ? "current-question"
                                        : ""
                                    }
                  ${answers[index] !== undefined
                                        ? "answered-question"
                                        : ""
                                    }
                `}
                                onClick={() => setCurrentQuestion(index)}
                            >
                                {index + 1}
                            </button>

                        ))}

                    </div>


                    <div className="palette-info">

                        <div>
                            <span className="legend current"></span>
                            Current Question
                        </div>

                        <div>
                            <span className="legend answered"></span>
                            Answered
                        </div>

                        <div>
                            <span className="legend unanswered"></span>
                            Not Answered
                        </div>

                    </div>


                    <button
                        className="sidebar-submit-btn"
                        onClick={() => setShowSubmitModal(true)}
                    >
                        Submit Exam
                    </button>

                </aside>

            </div>


            {/* SUBMIT MODAL */}
            {showSubmitModal && (

                <div className="submit-modal-overlay">

                    <div className="submit-modal">

                        <div className="submit-modal-icon">
                            ⚠️
                        </div>

                        <h2>Submit Exam?</h2>

                        <p>
                            You have answered <strong>{answeredCount}</strong> out of{" "}
                            <strong>{exam.questions.length}</strong> questions.
                        </p>

                        <p className="submit-warning">
                            Once submitted, you cannot change your answers.
                        </p>

                        <div className="submit-modal-buttons">

                            <button
                                className="cancel-submit-btn"
                                onClick={() => setShowSubmitModal(false)}
                            >
                                Continue Exam
                            </button>

                            <button
                                className="confirm-submit-btn"
                                onClick={handleSubmit}
                            >
                                Yes, Submit
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Exam;