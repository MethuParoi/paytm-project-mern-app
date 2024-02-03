import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { usernameAtom } from "./atom";

export const Appbar = () => {
  const navigate = useNavigate();

  const name = useRecoilValue(usernameAtom);

  return (
    <div className="shadow h-14 flex justify-between my-2 px-4">
      <div className="flex flex-col justify-center h-full ml-4">
        <p className="text-xl lg:text-2xl font-semibold">PayTM App</p>
      </div>
      <div className="flex items-center">
        <div className="invisible lg:visible text-xl flex flex-col justify-center h-full mr-4">
          Hello, {name}
        </div>

        <div>
          <button
            className="text-lg lg:text-xl py-2 px-4 bg-slate-200 rounded-lg"
            onClick={() => {
              //remove user from local storage
              localStorage.removeItem("token");

              //navigate to signin page
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
