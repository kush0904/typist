import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase";
import { useEffect } from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Create an auth instance

function LoginPage({ setAuth, setToken }) {

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true);
        window.localStorage.setItem('auth', 'true');
        user.getIdToken().then((token) => {
    console.log(token);
          setToken(token);
        });
      }
    });
  }, [setAuth, setToken, auth]);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem('auth', 'true');
        }
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}

export default LoginPage;
