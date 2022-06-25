import Router from "components/Router";
import { useState, useEffect } from "react";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(true);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      setInit(false);
    });
  }, []);

  return (
    <div>
      <div>{init ? "Initializing..." : <Router isLoggedIn={login} />}</div>
    </div>
  );
}

export default App;
