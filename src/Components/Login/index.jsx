import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { stagedTimers } from "../../fetchData";

import { useNavigate, Navigate, Link } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react'
import {useDispatch } from 'react-redux';
import {setUser} from "../../features/authSlice"
import { useLoginUserMutation } from "../../services/auth"
import "./index.css"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" })
    const dispatch=useDispatch()
   

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const [loginUser, { isLoading, isFetching }] = useLoginUserMutation()

    useEffect(() => {
        if (isLoading || isFetching) stagedTimers.start();
        else stagedTimers.stop();
        return () => {
            stagedTimers.stop();
        }
    }, [isLoading, isFetching]);


    const navigate = useNavigate();

    const onSubmitSuccess = (data) => {
        const {userData}=data
        
        dispatch(setUser(userData))
        Cookies.set('jwt_token', data.token, { expires: 7 });
        navigate("/tasks")
        toast.success(data.message)
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.password) {
            toast.error('Please fill in both fields.');
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        try {
            const data = await loginUser(formData).unwrap();
            onSubmitSuccess(data)
        } catch (error) {
            toast.error(error?.data?.message)
        }

    };

    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken) {
        return <Navigate to="/tasks" />;
    }

    const isValid = formData.username && formData.password

    return (
        <main className="flex-login-layout">
            <section className="hero-img-container">
                <img
                    className="hero-image fit-image"
                    src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1749119001/todo-login-image_lbfx0u.webp"
                    alt="login"
                />
            </section>
            <form onSubmit={handleLogin}>
                <h1 className="heading vault-heading">Access Your Vault</h1>
                <article className="input-wrapper">
                    <input
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input-element"
                        type="text"
                        required
                        name="username"
                    />
                    <label htmlFor="username" className="label">
                        username
                    </label>
                </article>
                <article className='input-wrapper'>
                    <input
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-element"
                        type={showPassword ? 'text' : 'password'}
                        required
                    />
                    <label htmlFor="password" className="label">
                        password
                    </label>
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
                        <PacmanLoader color="black" size={14} />
                    </span>) : ("Login")}</button>
                </div>
                <Link className="link" to="/signup" style={{ textDecoration: 'none' }}>
                    Not yet signed up? Sign up here
                </Link>

            </form>
        </main>
    );
};

export default Login;
