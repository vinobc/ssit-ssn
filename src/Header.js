import React from "react";
import { logout } from "./firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "./firebase/UserProvider";

function Header() {
  const history = useHistory();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <header>
      <h2 style={{ color: "white" }}>SSN</h2>

      {!!user && (
        <button
          className="ui secondary button logout"
          style={{ backgroundColor: "#0067b3" }}
          onClick={logoutUser}
        >
          LOGOUT
        </button>
      )}
    </header>
  );
}

export default Header;
