import { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Auth() {
  //declare state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  //instance of google auth provider.
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  function onChange(event) {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    let data;

    if (newAccount === true) {
      data = createUserWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
          // Signed in
          console.log(data);
          console.log(userCredential);
          //var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      data = signInWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
          //var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }

  function toggle() {
    setNewAccount((prev) => !prev);
  }

  function toggleOAuth(e) {
    if (e.target.name === "google") {
      signInWithPopup(authService, googleProvider)
        .then((result) => {})
        .catch((error) => {});
    } else if (e.target.name === "github") {
      signInWithPopup(authService, githubProvider)
        .then((result) => {})
        .catch((error) => {});
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create New Account" : "Log in"}
        />
      </form>
      <button onClick={toggle}>
        {newAccount ? "Log in" : "Create New Account"}
      </button>
      <br />
      <button name="google" onClick={toggleOAuth}>
        Continue with google
      </button>
      <button name="github" onClick={toggleOAuth}>
        {" "}
        Continue with github
      </button>
    </div>
  );
}

export default Auth;
