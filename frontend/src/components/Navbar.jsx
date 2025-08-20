import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {logout } from "../store/slice/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isAuthenticated, user} = useSelector(state => state.auth);


    const handleLogout = () =>{
        dispatch(logout());
        navigate("/login");
    }

    return <>
        <nav className= "flex items-center justify-between p-4 bg-blue-500 text-white">
            <div>            
                <Link to="/" className="text-lg font-bold">SkillMatch</Link>
            </div>
            <div>
            {
                isAuthenticated && user?.role === "RECRUITER" &&
                <>
                    <Link to="/post-job" className="mx-2">Post a Job</Link>
                    <Link to="/my-jobs" className="mx-2">My Jobs</Link>
                </>
            }
            {
                isAuthenticated && user?.role === "APPLICANT" &&
                <>
                    <Link to="/jobs" className="mx-2">Available Jobs</Link>
                    <Link to="/my-applications" className="mx-2">My Applications</Link>
                </>
            }
            {
                isAuthenticated ?
                <>          
                <span className="mx-2 italic">Welcome, {user?.username}</span>     
                <Link to = "/my-profile" className="mx-2">My Profile</Link>
                <button className = "bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200"
                onClick={handleLogout}> Logout</button>
                </>
                :
                <>
                    <Link to="/login" className="mx-2">Login</Link>
                    <Link to="/register" className="mx-2">Register</Link>
                </>
            }
            </div>

        </nav>
    </>
}

export default Navbar;