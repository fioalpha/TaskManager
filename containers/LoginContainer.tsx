import {NextPage} from "next";
import {useState} from "react";
import {Register} from "./Register";
import {Login} from "./Login";

type LoginContainerProps = {
    setToken(token: string): void
}

export const LoginContainer: NextPage<LoginContainerProps> = ({setToken}) => {

    const [isShowRegister, setShowRegister] = useState(false)

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            {
                !isShowRegister ?
                    <Login setToken={setToken} setRegisterShow={setShowRegister}/> :
                    <Register setRegisterShow={setShowRegister}/>
            }
        </div>
    )
}