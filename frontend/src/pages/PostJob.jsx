import { useState } from "react"
import InputField from "../components/InputField"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { postJobAPI } from "../store/slice/postJobslice";
import { setJobSliceStatus } from "../store/slice/jobSlice";

const PostJob = () =>{

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.postJob);
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
      title : "",
      description: "",
      company : "",
      location : "",
      jobType : "FULL_TIME",
      salary: null,
      recruiterId: user?.userId
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
        const result = await dispatch(postJobAPI(formdata));

        if(postJobAPI.fulfilled.match(result))
        {
            dispatch(setJobSliceStatus("idle"));
            navigate("/my-jobs"); 
        }
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

                <form className="bg-white p-6 rounded-lg shadow-md w-full"
                onSubmit={ handleFormSubmit}>
                    <h1 className="text-center font-medium text-2xl"> Post a Job </h1>
                    <InputField
                        label="Title"
                        type="text"
                        name="title"
                        value={formdata.title}
                        placeholder="Enter Job Title"
                        onChange={handleChange}
                        required/>
                    <InputField
                        label="Company"
                        type="text"
                        name="company"
                        value={formdata.company}
                        placeholder="Enter Company Name:"
                        onChange={handleChange}
                        required/>
                    <InputField
                        label="Location"
                        type="text"
                        name="location"
                        value={formdata.location}
                        placeholder="Enter Location:"
                        onChange={handleChange}
                        required/>
                    <InputField
                        label="Salary"
                        type="number"
                        name="salary"
                        value={formdata.salary}
                        placeholder="Enter approx Salary:"
                        onChange={handleChange}
                        required/>
                    <div>
                        <label htmlFor="jobType" className="text-sm font-medium text-gray-700 mb-1">
                            Job Type:
                        </label>
                        <select className="ml-4 mb-4" name="jobType" value={formdata.jobType} onChange={handleChange}>
                            <option value="FULL_TIME">FULL TIME</option>
                            <option value="PART_TIME">PART TIME</option>
                            <option value="CONTRACT">CONTRACT</option>
                            <option value="TEMPORARY">TEMPORARY</option>
                        </select>
                    </div>
                    <button type ="submit" className="w-full bg-blue-500 h-10 text-white">Post a Job</button>
                </form>
            </div>
        </div>
    </>
}

export default PostJob;