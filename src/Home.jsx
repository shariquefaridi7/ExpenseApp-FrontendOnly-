import { useContext } from "react"
import { IsLogin } from "./Login"

const Home = () => {
    const islogin = useContext(IsLogin);
    return (
        <div>
            {
                console.log(islogin)
            }
            <h3 style={{ visibility: islogin == true ? '' : "hidden" }}>Welcome Back</h3>
        </div>
    )
}

export default Home
