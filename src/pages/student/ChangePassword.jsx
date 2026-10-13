import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import "../../styles/ChangePassword.css";

const ChangePassword = () => {
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = passwordData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError(
                "New password must be different from your current password."
            );
            return;
        }

        // Later:
        // axios.patch("/api/v1/users/change-password", {
        //   currentPassword,
        //   newPassword
        // });

        console.log({
            currentPassword,
            newPassword,
        });

        alert("Password changed successfully!");

        navigate("/student/profile");
    };

    return (
        <div className="student-page">
            <StudentSidebar />

            <main className="student-main change-password-main">
                {/* Header */}
                <div className="change-password-header">
                    <div>
                        <h1>Change Password</h1>
                        <p>
                            Update your password to keep your account secure.
                        </p>
                    </div>
                </div>

                <div className="change-password-wrapper">

                    {/* Form Card */}
                    <div className="password-card">

                        <div className="password-card-header">
                            <div className="password-icon">
                                🔐
                            </div>

                            <div>
                                <h2>Update Your Password</h2>
                                <p>
                                    Enter your current password and choose a new one.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Current Password */}
                            <div className="password-field">
                                <label htmlFor="currentPassword">
                                    Current Password
                                </label>

                                <div className="password-input-wrapper">
                                    <input
                                        id="currentPassword"
                                        type={
                                            showPassword.current
                                                ? "text"
                                                : "password"
                                        }
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your current password"
                                    />

                                    <button
                                        type="button"
                                        className="show-password-btn"
                                        onClick={() =>
                                            togglePassword("current")
                                        }
                                    >
                                        {showPassword.current ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="password-field">
                                <label htmlFor="newPassword">
                                    New Password
                                </label>

                                <div className="password-input-wrapper">
                                    <input
                                        id="newPassword"
                                        type={
                                            showPassword.new
                                                ? "text"
                                                : "password"
                                        }
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your new password"
                                    />

                                    <button
                                        type="button"
                                        className="show-password-btn"
                                        onClick={() =>
                                            togglePassword("new")
                                        }
                                    >
                                        {showPassword.new ? "🙈" : "👁️"}
                                    </button>
                                </div>

                                <span className="password-hint">
                                    Password must contain at least 6 characters.
                                </span>
                            </div>

                            {/* Confirm Password */}
                            <div className="password-field">
                                <label htmlFor="confirmPassword">
                                    Confirm New Password
                                </label>

                                <div className="password-input-wrapper">
                                    <input
                                        id="confirmPassword"
                                        type={
                                            showPassword.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter your new password"
                                    />

                                    <button
                                        type="button"
                                        className="show-password-btn"
                                        onClick={() =>
                                            togglePassword("confirm")
                                        }
                                    >
                                        {showPassword.confirm ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="password-error">
                                    ⚠️ {error}
                                </div>
                            )}

                            {/* Password Rules */}
                            <div className="password-rules">
                                <h4>Password Requirements</h4>

                                <ul>
                                    <li>At least 6 characters</li>
                                    <li>Do not use your old password</li>
                                    <li>Keep your password private</li>
                                </ul>
                            </div>

                            {/* Buttons */}
                            <div className="password-actions">
                                <button
                                    type="button"
                                    className="cancel-password-btn"
                                    onClick={() =>
                                        navigate("/student/profile")
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="update-password-btn"
                                >
                                    Update Password
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChangePassword;