import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../firebase/auth";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Signup(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const onSubmit = async (frmData) => {
    let newUsr;
    setLoading(true);
    try {
      newUsr = await signup(frmData);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (newUsr) {
      props.history.push(`/profile/${newUsr.uid}`);
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
              <div className="two fields">
                <div className="field">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      ref={register}
                    />
                  </label>
                </div>
                <div className="field">
                  <label>
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      ref={register}
                    />
                  </label>
                </div>
              </div>
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
                  Signup
                </button>
                <Link to="/login">Log In</Link>&nbsp;&nbsp;
                <GoogleLogin
                  clientId=""
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

export default Signup;
