import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { useEffect } from "react"; // useEffect is for api

import axios from "axios";

import "./Login.css";

function signInClickHandler(instance) {
  instance.loginRedirect();
}

function Login() {
  const { instance, accounts } = useMsal();

  const navigate = useNavigate(); // want to get Navigate function (when call the function then navigate)// default Navigate is a component, when it show then navigate to the page you enter
  useEffect(() => {
    if (accounts.length != 0) {
      // check if user log in, account length = 0 is not login
      const accessTokenRequest = {
        scopes: ["user.read", "OnlineMeetings.ReadWrite"],
        account: accounts[0],
      };

      axios
        .post(
          "http://0.0.0.0:8000/api/users/my-account/get/post", //  (get & post) myaccount_list function api
          {
            homeAccountId: accounts[0].homeAccountId,

            username: accounts[0].username,
          } //
        )

        .then(function (res) {
          // res: here get the django response (= get the return from post)

          console.log(res.data.pk);
          localStorage.setItem("homeAccountId", accounts[0].homeAccountId); // store in localstorage, 'homeAccountId' is key
          localStorage.setItem("userId", res.data.pk); //
          console.log(res.data.pk);

          console.log(res);
        })
        .then(() => navigate("/"));
    }
  }, [accounts]);

  return (
    <div>
      <h2>Welcome to Birmingham Computer Science Student Matcher</h2>
      <div className="d-grid gap-2">
        <Button
          className="button_login"
          variant="outline-success"
          size="lg"
          margin="16px"
          onClick={() => signInClickHandler(instance)}
        >
          Log in with Microsoft
        </Button>
        <p className="text">
          * Please use your personal microsoft account to log in, not your
          Birmingham student account
        </p>
      </div>
    </div>
  );
}
export default Login;
