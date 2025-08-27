import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadResumeAPI, fetchUserProfileAPI, updateUserProfileAPI, updateUserProfileWithResumeAPI } from "../store/slice/userProfileSlice";
import InputField from "./InputField";
import { updateApplicationStatusAPI } from "../store/slice/applicantSlice";

const MyProfile = ()=>{

    const {status, user, error, updateStatus} = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const [isResumeUpdated, setIsResumeUpdated] = useState(false);
    const [formData, setFormData] = useState({
        name : "",
        username : "",
        phone : "",
        location : "",
        password : "",
        id: "",
        resume: null
    });


    useEffect(()=>{
        if(status === "idle")
            dispatch(fetchUserProfileAPI());
    },[dispatch]);

    useEffect(()=>{
        if(user)
        {
            setFormData(prev => ({
                ...prev,
                id : user.id,
                name : user.name,
                username : user.username,
                phone : user.phone,
                location : user.location,
                password : user.password
            }));
        }
    },[user]);

    const handleChange = e =>{
        setFormData((prev) => 
        ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    }

    const handleFileChange = e =>{
        setIsResumeUpdated(true);
        setFormData(prev =>({
            ...prev,
            [e.target.name] : e.target.files[0]
        }));
    }

    const downloadResume = ()=>{
        dispatch(downloadResumeAPI(user.username));
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(!isResumeUpdated){
            dispatch(updateUserProfileAPI(formData));
            return;
        }

        const data = new FormData();
        for(const key in formData)
        {
            data.append(key, formData[key]);
        }
        dispatch(updateUserProfileWithResumeAPI(data));
    }

     if(status === "loading")
        return <p className="text-blue-500">Loading...</p>

    if(error)
        return <p className="text-red-500"> {error}</p>

    return <>
         <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <InputField
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                    <InputField
                        label="Email"
                        type="email"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled/>
                    <InputField
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new Password here if in case you want to update your password"
                        />
                    <InputField
                        label="Phone"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required/>
                    <InputField
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required/>
                    {
                        user.role == "APPLICANT" &&
                        <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={downloadResume}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Download Resume ({user.resumeName})
                                </button>
                                <InputField
                                    label="Replace Resume (PDF/DOC)"
                                    type="file"
                                    name="resume"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc, .docx"
                                    />
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full bg-blue-500 h-10 text-white"
                        disabled={updateStatus === "loading"}
                        >
                        {updateStatus === "loading" ? "Saving..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    </>
}

export default MyProfile;