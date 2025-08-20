import { useState } from "react"
import InputField from "../components/InputField"
import { useDispatch, useSelector } from "react-redux"
import {loginAPI } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) =>{
        setFormData (prev =>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const result = await dispatch(loginAPI(formdata));

        if(loginAPI.fulfilled.match(result))
            navigate("/"); 
    }

    return <>
        <div className="flex-center flex-col min-h-screen bg-gray-100">
            <div className="text-center mb-8">
                <h1 className="font-bold text-2xl"> SkillMatch - Job Application Platform</h1>
                <p>One step closure to achive your dream to work in your dream company!</p>
            </div>
            <div className="w-full max-w-md">
                {error && 
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    <p>{error}</p>  
                </div>
                }

                {message && 
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                    <p>{message}</p>  
                </div>
                }
                <form className="bg-white p-6 rounded-lg shadow-md w-full"
                onSubmit={ handleFormSubmit}>
                    <h1 className="text-center font-medium text-2xl"> Login Page </h1>
                    <InputField
                        label="Email"
                        type="email"
                        name="username"
                        value={formdata.username}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required/>
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formdata.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required/>

                    <button type ="submit" className="w-full bg-blue-500 h-10 text-white">Login</button>
                </form>
            </div>
        </div>
    </>
}

export default Login