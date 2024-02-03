import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { sourceAtom } from "../components/atom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const source = useRecoilValue(sourceAtom);

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground lg:max-w-md max-w-[300px] p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="px-6 lg:pt-6 ">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => {
                  axios
                    .post(
                      `${source}/api/v1/account/transfer`,
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        setSuccess(true);
                        setResponse(response.data.message);
                      }
                      if (response.status === 400) {
                        setSuccess(false);
                        setError(true);
                        setResponse(response.data.message);
                      }
                    });
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>

          <div className="pl-20 pb-2">
            {error && <p className="text-red-500">{response}</p>}
            {success && <p className="text-gray-800 text-xl">{response}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
