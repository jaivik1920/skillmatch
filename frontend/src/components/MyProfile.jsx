import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileAPI, updateUserProfileAPI } from "../store/slice/userProfileSlice";
import InputField from "./InputField";
import { updateApplicationStatusAPI } from "../store/slice/applicantSlice";

const MyProfile = ()=>{

    const {status, user, error, updateStatus} = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    console.log(user);
    
    const [formData, setFormData] = useState({
        name : "",
        username : "",
        phone : "",
        location : "",
        password : "",
        id: ""
    });

    console.log(formData);

    useEffect(()=>{
        if(status === "idle")
            dispatch(fetchUserProfileAPI());
    },[dispatch]);

    useEffect(()=>{
        if(user)
        {
            setFormData({
                id : user.id,
                name : user.name,
                username : user.username,
                phone : user.phone,
                location : user.location,
                password : user.password
            });
        }
    },[user]);

    const handleChange = e =>{
        setFormData((prev) => 
        ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(updateUserProfileAPI(formData));
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 h-10 text-white"
                        disabled={updateStatus === "loading"}
                        >
                        {updateStatus === "loading" ? "Saving..." : "Save Changes"}
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    </>
}

export default MyProfile;