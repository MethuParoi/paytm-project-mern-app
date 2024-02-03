import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { usernameAtom } from "../components/atom";
import { sourceAtom } from "../components/atom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const source = useRecoilValue(sourceAtom);

  const [recoilUsername, setRecoilUsername] = useRecoilState(usernameAtom);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Enter first name"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Enter last name"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter email address"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
            label={"Password"}
          />

          <div className="pt-4">
            <Button
              // onClick={async () => {
              //   const response = await axios.post(
              //     `${source}/api/v1/user/signup`,
              //     {
              //       username,
              //       firstName,
              //       lastName,
              //       password,
              //     }
              //   );

              //   if (response.status === 200) {
              //     const userName = response.data.username;
              //     localStorage.setItem("token", response.data.token);
              //     setRecoilUsername(userName);
              //     navigate("/dashboard");
              //     setError(false);
              //     setResponse(response.data.message);
              //   } else {
              //     setError(true);
              //     if (response.data && response.data.message) {
              //       setResponse(response.data.message);
              //     } else {
              //       setResponse("Incorrect input");
              //     }
              //   }
              // }}

              onClick={() => {
                axios
                  .post(`${source}/api/v1/user/signup`, {
                    username,
                    firstName,
                    lastName,
                    password,
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      const userName = response.data.username;
                      localStorage.setItem("token", response.data.token);
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
              label={"Sign up"}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Sign-in successful!</p>}

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
