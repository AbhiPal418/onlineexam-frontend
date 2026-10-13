import { Link, useLocation } from "react-router-dom";
import "../../styles/Auth.css";
import SubNavbar from "../../components/SubNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const rl = location.state?.role;
    const [role, setRole] = useState(rl || "student");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [rollNumber, setRollNumber] = useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userdata = {
                role,
                password,
            };
            if (role === "teacher") {
                userdata.email = username;
            } else {
                userdata.rollNumber = username;
            }

            const response = await axios.post(
                `/api/v1/${role}/login`,
                userdata
            );
            setEmail(response.data.data.loggedinUser.email);
            setRollNumber(response.data.data.loggedinUser.rollNumber);
            let uname = "";
            for (let i = 0; i < 20; i++) {
                if (email[i] !== '@') {
                    uname += email[i];
                } else {
                    uname += rollNumber;
                    break;
                }
            }
            if (role === "teacher") {
                navigate(`/teacher/${uname}/dashboard`);
            } else if (role === "student") {
                navigate(`/student/${uname}/dashboard`);
            }
        } catch (error) {
            console.error(error);
            setError(error.response.data?.message || "Incorrect Password")
        }
        // setUsername("");
        // setPassword("")
    };

    return (

        <div className="auth-page">
            <SubNavbar />
            <div className="auth-container-l">

                <div className="auth-info-l">

                    <div className="auth-info-content">
                        <h1>Welcome Back!</h1>

                        <p>
                            Login to continue your learning journey and access your examinations.
                        </p>

                        <div className="auth-features">
                            <div>Create and manage examinations</div>
                            <div>Attend exams securely</div>
                            <div>Track your performance</div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="auth-form-container-l">
                    <div className="auth-form">

                        <h2>Login to your account</h2>

                        <p className="auth-subtitle">
                            Enter your credentials to continue
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="role-section">
                                <label>Login as</label>

                                <div className="role-options">

                                    <div
                                        className={`role-card ${role === "student" ? "selected" : ""
                                            }`}
                                        onClick={() => setRole("student")}
                                    >
                                        <div>
                                            <h4>Student</h4>
                                            <p>Attend examinations</p>
                                        </div>
                                    </div>

                                    <div
                                        className={`role-card ${role === "teacher" ? "selected" : ""
                                            }`}
                                        onClick={() => setRole("teacher")}
                                    >
                                        <div>
                                            <h4>Teacher</h4>
                                            <p>Create examinations</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {
                                role === "teacher" ? <div>
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            placeholder="Enter email"
                                            value={username}
                                            required
                                            onChange={(e) => {
                                                setUsername(e.target.value)
                                                setError("")
                                            }}

                                        />

                                    </div>

                                    <div className="input-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            required
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setError("")
                                            }}
                                        />
                                        {error && (
                                            <p className="password-error">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                </div> : <div>
                                    <div className="input-group">
                                        <label>Roll Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter roll number"
                                            value={username}
                                            required
                                            onChange={(e) => {
                                                setUsername(e.target.value)
                                                setError("")
                                            }}
                                        />

                                    </div>

                                    <div className="input-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            required
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setError("")
                                            }}
                                        />
                                        {error && (
                                            <p className="password-error">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            }

                            <div className="forgot-password">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <button type="submit" className="auth-btn">
                                Login
                            </button>
                        </form>
                        {/* <p>{role}{username}</p> */}
                        <p className="auth-switch">
                            Don't have an account?
                            <Link to="/register"> Create Account</Link>
                        </p>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;