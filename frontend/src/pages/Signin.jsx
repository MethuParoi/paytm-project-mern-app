import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameAtom } from "../components/atom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recoilUsername, setRecoilUsername] = useRecoilState(usernameAtom);

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            placeholder="Enter email"
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder="Enter password"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios
                  .post(
                    "https://paytm-project-mern-ei0wfexiv-methu-parois-projects.vercel.app/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      localStorage.setItem("token", response.data.token);

                      const userName = response.data.firstName;
                      setRecoilUsername(userName);

                      navigate("/dashboard");
                    }
                  })
                  .catch((error) => {
                    // Handle error
                    setSuccess(false);
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      setError(error.response.data.message);
                    } else if (error.request) {
                      // The request was made but no response was received
                      setError("Network error, please try again later.");
                    } else {
                      // Something else happened in making the request
                      setError("An unexpected error occurred.");
                    }
                  });
              }}
              label={"Sign in"}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Sign-in successful!</p>}

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
