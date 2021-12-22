import {NextPage} from "next";
import {useState} from "react";
import {executeRequest} from "../services/api";
import {ModalSuccess} from "../components/Modal";

type RegisterProp = {
    setRegisterShow(isShow: boolean): void
}

export const Register: NextPage<RegisterProp> = (
    {
        setRegisterShow
    }
) => {

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConformPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [isLoadingShow, setIsLoadingShow] = useState(false)

    const closeModal = () => {
        setShowModal(false)
        setRegisterShow(false)
    }

    const goLogin = () => {
        setRegisterShow(false)
    }

    const doRegister = async () => {
        setError('')
        setShowModal(false)
        try {
            if (!name || !email || !password || !confirmPassword) {
                setError('favor preencher os dados');
                return;
            }
            if (password != confirmPassword) {
                setError("A senhas não estão iguais")
                return;
            }

            setIsLoadingShow(true)

            const result = await executeRequest('user', 'POST', {
                name,
                email,
                password
            });

            setIsLoadingShow(false)

            if (result && result.data) {
                setShowModal(true)
            }
        } catch (e: any) {
            if (e?.response?.data?.error) {
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar o registo do usuário, tente novamenete');
        }

    }

    return (
        <>
            <div className="form">
                {error && <p>{error}</p>}

                <div className="input">
                    <input type="text"
                           placeholder="Informe seu nome"
                           value={name}
                           onChange={event => setName(event.target.value)}
                    />
                </div>

                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email"/>
                    <input type="text"
                           placeholder="Informe seu email"
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha"/>
                    <input type="password"
                           placeholder="Informe sua senha"
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Confirme sua senha"/>
                    <input type="password"
                           placeholder="Confirme sua senha"
                           value={confirmPassword}
                           onChange={event => setConformPassword(event.target.value)}
                    />
                </div>
                <button onClick={doRegister}>Register</button>
                <button onClick={goLogin}>Voltar para Login</button>
            </div>
            <ModalSuccess
                isShow={showModal}
                title={"cadastro"}
                message={"Usuario cadastrado com sucesso!"}
                isLoaderShow={isLoadingShow}
                closeModal={closeModal}
            />
        </>
    );
}

