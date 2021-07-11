import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const routeOnLogin = async (user) => {
    const token = await user.getIdTokenResult();
    if (token.claims.admin) {
      props.history.push("/users");
    } else {
      props.history.push(`/profile/${user.uid}`);
    }
  };

  const onSubmit = async (frmData) => {
    let user;
    setLoading(true);
    try {
      user = await login(frmData);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      routeOnLogin(user);
    } else {
      setLoading(false);
    }
  };

  const frmClassName = `ui form ${isLoading ? "..loading.." : ""}`;
  return (
    <div>
      <div className="login-container">
        <div className="ui card login-card">
          <div className="content">
            <form className={frmClassName} onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={register}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={register}
                  />
                </label>
              </div>
              <div className="field actions">
                <button className="ui primary button login" type="submit">
                  Login
                </button>
                &nbsp;<Link to="/signup">Sign up</Link>&nbsp;
                <GoogleLogin
                  clientId="338393659621-bv2ag84pgadccc9ceare3brdsco5uam6.apps.googleusercontent.com"
                  buttonText="Log In"
                  onSuccess={handleSubmit(onSubmit)}
                  isSignedIn={true}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
