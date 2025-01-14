import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [googleUser, setGoogleUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`
        )
        .then((res) => {
          const { email, picture, id, name } = res.data;

          const newUser = {
            username: email,
            fullName: name,
            email,
            role: "customer",
            picture,
            name,
            googleId: id,
          };

          axios
            .post(`${backendUrl}/register`, newUser)
            .then((response) => {
              const user = {
                ...newUser,
                _id: response.data.userId, // Store _id in the user object
              };
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [googleUser]);

  useEffect(() => {
    // Update user state when localStorage changes
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if username or password is empty
    if (!username || !password) {
      setShowError(true);
      setErrorText("Please enter both username and password");
      return;
    }

    axios
      .post(`${backendUrl}/login`, { username, password })
      .then((response) => {
        const data = response.data;
        if (data.user) {
          const user = {
            ...data.user,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          window.location.href = "/"; // Redirect to home page
        } else {
          setShowError(true);
          setErrorText("Wrong username or password. Please try again.");
        }
      })
      .catch((error) => {
        let errorMessage = "Login: failed";

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }

        setShowError(true);
        setErrorText(errorMessage);
      });
  };

  // const handleLogout = () => {
  //   googleLogout(); // Call the googleLogout function
  //   setGoogleUser(null);
  //   setUser(null);
  //   localStorage.removeItem("user");
  // };

  return (
    <div className="container">
      {user ? <Navigate to="/" /> : null}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)}>
                  {errorText}
                </Alert>
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <Link to="/register" className="btn btn-primary ml-2">
                    Register
                  </Link>
                </div>
              </form>
              <button
                onClick={() => login()}
                className="btn btn-primary d-flex align-items-center mt-2"
                style={{
                  backgroundColor: "#4285F4",
                  borderRadius: "2px",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google logo"
                  className="mr-2"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
