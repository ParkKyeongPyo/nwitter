import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();

  function onLogOut() {
    signOut(authService);
    navigate("/");
  }

  return (
    <>
      <div>Profile</div>
      <button onClick={onLogOut}>Log out</button>
    </>
  );
}

export default Profile;
