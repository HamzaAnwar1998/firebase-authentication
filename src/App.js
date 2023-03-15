import {useState} from 'react';
import {auth, provider} from './FirebaseConfig';
import { signInWithPopup } from 'firebase/auth';

function App() {

  const [user, setUser] = useState(null);

  const handleGithubLogin=()=>{
    signInWithPopup(auth, provider).then((result)=>{
      setUser(result.user);
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
              // show user data with a logout button if we have user
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
              // otherwise show a button to login user with github
              <button className="btn btn-secondary btn-md"
              onClick={handleGithubLogin}>
                  Sign In With Github
              </button>
           )}

      </div>

    </div>
  );
}

export default App;
