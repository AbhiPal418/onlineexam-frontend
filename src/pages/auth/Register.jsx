import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import SubNavbar from "../../components/SubNavbar";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [role, setRole] = useState("student");
    const [fullName, setFullName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                role,
                fullName,
                rollNumber,
                email,
                password,
            };
            if(role === "teacher") {
                delete requestData.rollNumber;
            }
            const response = await axios.post(
                `/api/v1/${role}/register`,
                requestData
            );

            console.log(response.data.data.fullName)
            if(role === "teacher") {
                // console.log("hello1")
                navigate(`/login`);
            } else {
                // console.log("hello2")
                navigate(`/login`);
            }
            // console.log(response.data);

        } catch (error) {
            // console.error(error);
            setError(error.response?.data?.message||"")
        }
        // setFullName("");
        // setRollNumber("");
        // setEmail("");
        setPassword("")
    };

    return (
        <div className="auth-page">
            <SubNavbar />
            <div className="auth-container-r">

                <div className="auth-info">

                    <div className="auth-info-content">
                        <h1>Create your account</h1>


                        <div className="auth-features">
                            <div>Easy exam management</div>
                            <div>Secure authentication</div>
                            <div>Instant results</div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-container">
                    <div className="auth-form">
                        <h2>Get Started</h2>


                        <p className="auth-subtitle">
                            Fill in your details to get started
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="role-section">
                                <label>Register as</label>

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
                                    <div className="input-group" >
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            onChange={(e) => {setFullName(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={fullName}
                                        />
                                    </div>

                                    <div className="input-group" >
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => {setEmail(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={email}
                                        />
                                    </div>

                                    <div className="input-group" >
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Create a password"
                                            onChange={(e) => {setPassword(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            
                                        />
                                        {error && (
                                            <p className="password-error">
                                                {error}
                                            </p>
                                        )}
                                    </div>

                                </div> : <div>
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            onChange={(e) => {setFullName(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={fullName}
                                        />
                                    </div>

                                    <div className="input-group" >
                                        <label>Roll Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your roll number"
                                            onChange={(e) => {setRollNumber(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={rollNumber}
                                        />
                                    </div>

                                    <div className="input-group" >
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => {setEmail(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={email}
                                        />
                                    </div>

                                    <div className="input-group" >
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Create a password"
                                            onChange={(e) => {setPassword(e.target.value)
                                                setError("")
                                            }}
                                            required
                                            value={password}
                                        />

                                        {error && (
                                            <p className="password-error">
                                                {error}
                                            </p>
                                        )}

                                    </div>

                                </div>
                            }

                            <button type="submit" className="auth-btn">
                                Create Account
                            </button>

                        

                        </form>

                        <p className="auth-switch">
                            Already have an account?
                            <Link to="/login"> Login</Link>
                        </p>

                    </div>

                </div>


            </div>
        </div>
    );
}

export default Register;