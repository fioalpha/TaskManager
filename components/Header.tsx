import { NextPage } from "next";
import { useEffect, useState } from "react";

type HeaderProps = {
    sair() : void,
    showModal() : void
}

export const Header : NextPage<HeaderProps> = ({ sair, showModal}) => {

    const [name, setName] = useState('');

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const userName = localStorage.getItem('userName');
            if(userName){
              const fullName = userName.split(' ');
              if(fullName && fullName.length > 0){
                setName(fullName[0]);
              }
            }
        }
      }, [])

    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <button onClick={showModal}>+ Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá, {name}</span>
                <img  src="/exit-mobile.svg" alt="Sair" onClick={sair} />
            </div>
            <div className="desktop">
                <span>Olá, {name}</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
            </div>
        </div>
    );
}