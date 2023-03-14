import {useState} from 'react';
import {signInWithPopup, GithubAuthProvider} from 'firebase/auth';
import {auth, provider} from './FirebaseConfig';

function App() {

  const [user, setUser] = useState(null);
  // const [profilePic, setProfilePic] = useState(null);

  const handleGithubLogin=()=>{
   signInWithPopup(auth, provider).then((result)=>{
    setUser(result.user);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(accessToken);
   }).catch((error)=>{
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

    // The email of the user's account used.
    const email = error.customData.email;
    console.log(email);

    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log(credential);
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
