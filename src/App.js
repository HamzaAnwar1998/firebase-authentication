import {auth, provider} from './FirebaseConfig';
import {useState} from 'react';
import { signInWithPopup } from 'firebase/auth';

function App() {

  const [user, setUser] = useState(null);

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth, provider).then((result)=>{
      const user = result.user;
      console.log(user);
      setUser(user);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const handleLogout=()=>{
    setUser(null);
  }

  return (
    <div className="wrapper">
      <div className='box'>
          {user?(
            <>
              <button className='btn btn-secondary btn-md'
                onClick={handleLogout}>
                LOGOUT
              </button>
              <h3>Welcome {user.displayName}</h3>
              <p>{user.email}</p>
              <div className='photo'>
                <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer'/>
              </div>
            </>
          ):(
            <button className='btn btn-danger btn-md'
              onClick={handleGoogleSignIn}>
              Sign In With Google
            </button>  
          )} 
      </div>
    </div>
  );
}

export default App;
