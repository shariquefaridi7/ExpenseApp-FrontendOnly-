import { createContext, useState } from "react";
import Home from "./Home";
const IsLogin = createContext();

const Login = () => {

    const [data, setData] = useState({ name: "", phone: "" });
    const [islogin, setIsLogin] = useState(false);
    return (
        <>
            <center>
                <input type="text" placeholder="enter email" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /><br />
                <input type="number" placeholder="enter phone no" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /><br />
                <button onClick={() => { setIsLogin(true); setData({ name: "", phone: "" }) }}>Submit</button>
                <IsLogin.Provider value={islogin}>
                    <Home />

                </IsLogin.Provider>
            </center>
        </>
    )
}

export default Login;
export { IsLogin };
