import { useState } from "react";
import { adduser } from "../utils/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [password, setpassword] = useState("");
  const [emailid, setemailid] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [gender, setgender] = useState("");
  const [signup, setsignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [submitting, setsubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    seterror("");
    setsubmitting(true);

    try {
      const { data } = await api.post(
        signup ? "/signup" : "/login",
        signup
          ? { firstname, lastname, emailid, password, gender }
          : { emailid, password }
      );
      dispatch(adduser(data));
      navigate(signup ? "/profile" : "/", { replace: true });
    } catch (requestError) {
      seterror(
        requestError.response?.data?.message ||
          "We couldn’t complete that request. Please try again."
      );
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-story">
        <p className="eyebrow">Build your developer circle</p>
        <h1>Meet your next <em>great</em> collaborator.</h1>
        <p>Find developers who share your interests, trade ideas, and build something worth being proud of.</p>
        <div className="auth-note">
          <span className="auth-note-mark" aria-hidden="true">&lt;/&gt;</span>
          <span><strong>Good work starts with good people.</strong>Make room for your next connection.</span>
        </div>
      </section>

      <section className="auth-card" aria-labelledby="auth-title">
        <h2 id="auth-title">{signup ? "Create your account" : "Welcome back"}</h2>
        <p className="auth-caption">{signup ? "A few details to get your developer profile started." : "Sign in to pick up where you left off."}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {signup && <>
            <div className="form-field">
              <label htmlFor="firstname">First name</label>
              <input id="firstname" type="text" autoComplete="given-name" required maxLength={50} value={firstname} onChange={(e) => setfirstname(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="lastname">Last name</label>
              <input id="lastname" type="text" autoComplete="family-name" required maxLength={50} value={lastname} onChange={(e) => setlastname(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" required value={gender} onChange={(e) => setgender(e.target.value)}>
                <option value="" disabled>Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </div>
          </>}
          <div className="form-field">
            <label htmlFor="emailid">Email address</label>
            <input id="emailid" type="email" autoComplete="email" placeholder="you@example.com" required value={emailid} onChange={(e) => setemailid(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete={signup ? "new-password" : "current-password"} placeholder="Enter your password" required minLength={8} value={password} onChange={(e) => setpassword(e.target.value)} />
          </div>
          {signup && <p className="form-hint">Use at least 8 characters with uppercase, lowercase, a number, and a symbol.</p>}
          {error && <p role="alert" className="error-message">{error}</p>}
          <button className="button button-primary button-wide" type="submit" disabled={submitting}>
            {submitting ? "Please wait…" : signup ? "Create account" : "Sign in"}
          </button>
        </form>
        <button type="button" className="auth-switch" onClick={() => { setsignup(!signup); seterror(""); }}>
          {signup ? "Already have an account? Sign in" : "New to DevTinder? Create an account"}
        </button>
      </section>
    </div>
  );
};

export default Login;
