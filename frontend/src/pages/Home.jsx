import { useSelector } from "react-redux";
import Welcome from "../components/Welcome";

const Home = () => {

    const {user} = useSelector(state => state.auth);

    if(!user?.role)
        return <Welcome/>

    // if(user?.role)
    //     tbd
};

export default Home;
