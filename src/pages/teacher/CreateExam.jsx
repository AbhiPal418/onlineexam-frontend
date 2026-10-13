import { useEffect, useState } from "react";
import TeacherSidebar from "../../components/TeacherSidebar";
import "../../styles/CreateExam.css";
import axios from "axios";

function CreateExam() {
    const [teacher, setTeacher] = useState({});

    // console.log(examData)
    // console.log(questions)
    const [error, setError] = useState("");
    const fetchTeacherData = async () => {

        try {

            const response = axios.get(`/api/v1/teacher/dashboard`);
            setTeacher((await response).data.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTeacherData();
    }, [])

    const [examData, setExamData] = useState({
        title: "",
        questions: [],
        timeLimit: 0,
        createdBy: teacher?._id,
        totalQuestions: 0,
        password: "",
    });

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);

    const handleExamChange = (e) => {
        const { name, value } = e.target;

        setExamData((prev) => ({
            ...prev,
            createdBy: teacher?._id,
            [name]: value,
        }));
    };

    const handleQuestionChange = (questionId, value) => {
        setQuestions((prev) =>
            prev.map((question) =>
                question.id === questionId ? { ...question, question: value, } : question
            )
        );
    };

    const handleOptionChange = (
        questionId,
        optionIndex,
        value
    ) => {
        setQuestions((prev) =>
            prev.map((question) =>
                question.id === questionId
                    ? {
                        ...question,
                        options: question.options.map(
                            (option, index) =>
                                index === optionIndex ? value : option
                        ),
                    }
                    : question
            )
        );
    };

    const handleCorrectAnswer = (questionId, optionIndex) => {
        setQuestions((prev) =>
            prev.map((question) =>
                question.id === questionId
                    ? {
                        ...question,
                        correctAnswer: optionIndex,
                    }
                    : question
            )
        );
    };

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                id: Date.now(),
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ]);
    };

    const removeQuestion = (questionId) => {
        if (questions.length === 1) {
            return;
        }

        setQuestions((prev) =>
            prev.filter(
                (question) => question.id !== questionId
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const Edata = {
                examData: examData,
                questions: questions
            }

            const response = await axios.post(`/api/v1/teacher/create-exam`, Edata)
            // alert("Exam created successfully");
            console.log(response.data.data)
        } catch (error) {
            setError(error.response?.data?.message || "noerror");
            // console.log("hello",error)

        }

        // alert("Exam created successfully!");
    };

    // console.log(error)
    return (
        <div className="create-exam-layout">
            <TeacherSidebar />

            <main className="create-exam-main">

                {/* HEADER */}
                <div className="create-exam-header">
                    <div>
                        <h1>Create New Exam</h1>
                        <p>
                            Create an MCQ examination for your students.
                        </p>
                    </div>

                    <div className="teacher-profile">
                        <span className="teacher-notification">
                            🔔
                        </span>

                        <div className="teacher-avatar">
                            T
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* EXAM INFORMATION */}

                    <section className="create-exam-section">

                        <div className="section-heading">
                            <div className="section-heading-icon">
                                📋
                            </div>

                            <div>
                                <h2>Exam Information</h2>
                                <p>
                                    Enter the basic information about your exam.
                                </p>
                            </div>
                        </div>


                        <div className="exam-form-grid">

                            {/* TITLE */}

                            <div className="form-group full-width">
                                <label>
                                    Exam Title <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Java Programming Fundamentals"
                                    value={examData.title}
                                    onChange={handleExamChange}
                                    required
                                />


                            </div>


                            {/* DESCRIPTION */}

                            <div className="form-group full-width">
                                <label>Description</label>

                                <textarea
                                    name="description"
                                    placeholder="Write a short description about this examination..."
                                    value={examData.description}
                                    onChange={handleExamChange}
                                    rows="4"
                                />
                            </div>


                            {/* DURATION */}

                            <div className="form-group">
                                <label>
                                    Duration <span>*</span>
                                </label>

                                <div className="input-with-unit">
                                    <input
                                        type="number"
                                        name="timeLimit"
                                        placeholder="30"
                                        min="1"
                                        value={examData.timeLimit}
                                        onChange={handleExamChange}
                                        required
                                    />

                                    <span>minutes</span>
                                </div>
                            </div>


                            {/* TOTAL MARKS */}

                            <div className="form-group">
                                <label>
                                    Total Marks <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="totalScore"
                                    placeholder="40"
                                    min="1"
                                    value={examData.totalScore}
                                    onChange={handleExamChange}
                                    required
                                />
                            </div>


                            {/* PASSWORD */}

                            <div className="form-group full-width">
                                <label>
                                    Exam Password <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Create a password for students"
                                    value={examData.password}
                                    onChange={handleExamChange}
                                    required
                                />

                                <small>
                                    Students will need this password before
                                    starting the examination.
                                </small>
                            </div>

                        </div>

                    </section>


                    {/* QUESTIONS */}

                    <section className="create-exam-section">

                        <div className="questions-header">

                            <div className="section-heading">
                                <div className="section-heading-icon">
                                    ❓
                                </div>

                                <div>
                                    <h2>Questions</h2>
                                    <p>
                                        Add multiple-choice questions to your exam.
                                    </p>
                                </div>
                            </div>

                            <span className="question-count">
                                {questions.length}{" "}
                                {questions.length === 1
                                    ? "Question"
                                    : "Questions"}
                            </span>

                        </div>


                        {/* QUESTION CARDS */}

                        <div className="questions-list">

                            {questions.map((question, questionIndex) => (

                                <div
                                    className="create-question-card"
                                    key={question.id}
                                >

                                    {/* QUESTION HEADER */}

                                    <div className="question-card-header">

                                        <div className="question-title">
                                            <span>
                                                Question {questionIndex + 1}
                                            </span>
                                        </div>

                                        {questions.length > 1 && (
                                            <button
                                                type="button"
                                                className="remove-question-btn"
                                                onClick={() =>
                                                    removeQuestion(question.id)
                                                }
                                            >
                                                🗑 Remove
                                            </button>
                                        )}

                                    </div>


                                    {/* QUESTION */}

                                    <div className="form-group">

                                        <label>
                                            Question <span>*</span>
                                        </label>

                                        <textarea
                                            placeholder="Enter your question..."
                                            rows="3"
                                            value={question.question}
                                            onChange={(e) =>
                                                handleQuestionChange(
                                                    question.id,
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* OPTIONS */}

                                    <div className="options-heading">
                                        <label>
                                            Options{" "}
                                            <span>*</span>
                                        </label>

                                        <small>
                                            Select the radio button for the correct answer.
                                        </small>
                                    </div>


                                    <div className="create-options">

                                        {question.options.map(
                                            (option, optionIndex) => (

                                                <div
                                                    className={`create-option ${question.correctAnswer ===
                                                        optionIndex
                                                        ? "correct-option"
                                                        : ""
                                                        }`}
                                                    key={optionIndex}
                                                >

                                                    <input
                                                        type="radio"
                                                        name={`correct-${question.id}`}
                                                        checked={
                                                            question.correctAnswer ===
                                                            optionIndex
                                                        }
                                                        onChange={() =>
                                                            handleCorrectAnswer(
                                                                question.id,
                                                                optionIndex
                                                            )
                                                        }
                                                    />

                                                    <span className="option-label">
                                                        {String.fromCharCode(
                                                            65 + optionIndex
                                                        )}
                                                    </span>

                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${optionIndex + 1
                                                            }`}
                                                        value={option}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                question.id,
                                                                optionIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* ADD QUESTION */}

                        <button
                            type="button"
                            className="add-question-btn"
                            onClick={addQuestion}
                        >
                            + Add Another Question
                        </button>
                        {error && (
                            <p className="password-error">
                                {error}
                            </p>
                        )}

                    </section>


                    {/* BOTTOM ACTIONS */}

                    <div className="create-exam-actions">

                        <button
                            type="button"
                            className="cancel-exam-btn"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-exam-btn"
                        >
                            Create Exam
                        </button>
                        

                    </div>

                </form>


            </main>
        </div>
    );
}

export default CreateExam;