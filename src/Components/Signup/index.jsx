import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { stagedTimers } from "../../fetchData";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSignupUserMutation } from "../../services/auth";
import { toast } from "react-toastify";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./index.css"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate()


  const [signupUser, { isLoading, isFetching }] = useSignupUserMutation()
  useEffect(() => {
    if (isLoading || isFetching) stagedTimers.start();
    else stagedTimers.stop();

    return () => {
      stagedTimers.stop();
    }
  }, [isLoading, isFetching])


  const onSubmitSuccess = (data) => {
    Cookies.set('jwt_token', data.token, { expires: 7 });
    toast.success(data.message)
    navigate("/code-vault")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.password || !formData.email) {
      toast.error('Please fill in both fields.');
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signupUser(formData).unwrap()
      onSubmitSuccess(res)
    }
    catch (error) {
      toast.error(error?.data?.message)
    }


  }

  const isValid=formData.username && formData.password && formData.email

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/code-vault" />;
  }
  return (
    <main className="flex-login-layout">
      <section className="hero-img-container">
        <img className="hero-image fit-image" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1762740292/Screenshot_2025-11-10_073427_xkrq7n.png" alt="" />
      </section>
      <form onSubmit={handleSubmit}>
        <h1 className="heading vault-heading">Create Your Vault</h1>
        <article className="input-wrapper">
          <input value={formData.username} onChange={handleChange} required name="username" id="username" type="text" className="input-element" />
          <label className="label" htmlFor="username">Username</label>
        </article>
        <article className="input-wrapper">
          <input value={formData.email} onChange={handleChange} required name="email" id="email" type="email" className="input-element" />
          <label className="label" htmlFor="email">email</label>
        </article>
        <article className="input-wrapper">
          <input value={formData.password} onChange={handleChange} required name="password" id="password" type={showPassword ? "text" : "password"} className="input-element" />
          <label className="label" htmlFor="password">password</label>
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </span>
        </article>
        <div className="button-center">
          <button disabled={isLoading || !isValid} type="submit" className="button loading-button">{isLoading ? (<span color="black" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            Processing...
            <PacmanLoader color="white" size={16} />
          </span>) : ("Signup")}</button>
        </div>
        <Link to="/login" className="link">Already Signup? Login</Link>
      </form>
    </main>
  )
}

export default Signup