import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const { userId, token } = useParams();

  useEffect(() => {
    const fetchResetPassword = async () => {
      // محاكاة التحقق من صحة المستخدم والتوكن
      if (userId !== "validUserId" || token !== "validToken") {
        setIsError(true);
      }
    };
    fetchResetPassword();
  }, [userId, token]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");

    // محاكاة إعادة تعيين كلمة المرور
    toast.success("Password reset successfully!");
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
