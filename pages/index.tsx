import type {NextPage} from 'next'
import {useEffect, useState} from 'react';
import {Home} from '../containers/Home'
import {LoginContainer} from "../containers/LoginContainer";

const Index: NextPage = () => {

  const [accessToken, setToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('accessToken');
        if(token){
          setToken(token);
        }
    }
  }, [])

  return (
    accessToken ? <Home setToken={setToken}/> : <LoginContainer setToken={setToken}  />
  )
}

export default Index
