import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

export const Login = () => {

    const [user] = useAuthState(auth);

    const [email, setEmail] = useState('');

    const [loading, setLoading]=useState(false);
    const [error, setError] = useState('');

    const [initialLoading, setInitialLoading]=useState(false);
    const [initialError, setInitialError] = useState('');

    const [info, setInfo] = useState('');

    const navigate = useNavigate();

    const location = useLocation();

    const {search} = location;

    useEffect(()=>{
        if(user){
            // user is already signed in
            navigate('/');
        }
        else{
            // user is not signed in but link is valid
            if(isSignInWithEmailLink(auth, window.location.href)){
                let email = window.localStorage.getItem('email');
                if (!email) {
                    // User opened the link on a different device. To prevent session fixation
                    // attacks, ask the user to provide the associated email again. For example:
                    email = window.prompt('Please provide your email for confirmation');
                }
                setInitialLoading(true);
                signInWithEmailLink(auth, localStorage.getItem('email'), window.location.href)
                .then(()=>{
                    localStorage.removeItem('email');
                    setInitialLoading(false);
                    setInitialError('');
                    navigate('/');
                }).catch((err)=>{
                    setInitialLoading(false);
                    setInitialError(err.message);
                    navigate('/login');
                })
            }
            else{
                console.log('enter email and sign in');
            }
        }
    },[user, search, navigate]);

    const handleLogin=(e)=>{
        e.preventDefault();
        setLoading(true);
        sendSignInLinkToEmail(auth, email,{
            url: 'http://localhost:3000/login',
            handleCodeInApp: true
        }).then(()=>{
            localStorage.setItem('email', email);
            setLoading(false);
            setError('');
            setInfo('We have sent you an email with a link to sign in');
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        })
    }

  return (
    <div className='box'>
        {initialLoading===true?(
            <div>loading...</div>
        ):(
            <>
              {initialError!==''?(
                <div className='error-msg'>{initialError}</div>
              ):(
                <>
                  {user?(
                    <div>Please wait...</div>
                  ):(
                    <form className='form-group custom-form' onSubmit={handleLogin}>
                        <label>Email</label>
                        <input type={'email'} required placeholder='Enter Email'
                        className='form-control' value={email||''} onChange={(e)=>setEmail(e.target.value)}/>
                        <button type='submit' className='btn btn-success btn-md'>
                            {loading?(
                                <span>Logging you in</span>
                            ):(
                                <span>Login</span>
                            )}
                        </button>
                        {error!==''&&(
                            <div className='error-msg'>{error}</div>
                        )}
                        {info!==''&&(
                            <div className='info-msg'>{info}</div>
                        )}
                    </form>
                  )}
                </>
              )}
            </>
        )}
    </div>
  )
}
