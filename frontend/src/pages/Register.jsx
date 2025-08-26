import { useState } from "react";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import {registerAPI, setMessage } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, loading} = useSelector(state => state.auth);

    const [formdata, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        location: "",
        phone: "",
        role: "APPLICANT",
    });

    const handleChange = (e) => {
        setFormData(prev =>
        ({
            ...prev,
            [e.target.name]: e.target.value,
        })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerAPI(formdata));
        if(registerAPI.fulfilled.match(result))
        {
            dispatch(setMessage(result.payload));
            navigate("/login");
        }
    };

    return (
        <>
        <div className="flex-center flex-col min-h-screen bg-gray-100">
            <div className="text-center mb-8">
            <h1 className="font-bold text-2xl">
                SkillMatch - Job Application Platform
            </h1>
            <p>
                One step closure to achive your dream to work in your dream company!
            </p>
            </div>
            {error && 
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                <p>{error}</p>
            </div>
            }
            <div className="w-full max-w-md">
            <form
                className="bg-white p-6 rounded-lg shadow-md w-full"
                onSubmit={handleSubmit}
            >
                <h1 className="font-medium text-2xl text-center mb-4"> Register Page</h1>
                <InputField
                type="text"
                name="name"
                label="Name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                />
                <InputField
                type="email"
                label="Email"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                />
                <InputField
                type="password"
                label="Password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                />
                <InputField
                    label="Phone"
                    type="text"
                    name="phone"
                    value={formdata.phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone number"
                    required/>
                <InputField
                    label="Location"
                    type="text"
                    name="location"
                    value={formdata.location}
                    placeholder="Enter your Place of Residence"
                    onChange={handleChange}
                    required/>
                <div>
                    <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">
                        Choose your role:
                    </label>
                    <select className="ml-4" name="role" value={formdata.role} onChange={handleChange}>
                    <option value="APPLICANT">APPLICANT</option>
                    <option value="RECRUITER">RECRUITER</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 h-10 text-white mt-4">
                    Become a member
                </button>
            </form>
            </div>
        </div>
        </>
    );
    };
export default Register;
