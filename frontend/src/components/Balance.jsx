import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { sourceAtom } from "./atom";

export const Balance = () => {
  const [balance, setBalance] = useState(null);

  const source = useRecoilValue(sourceAtom);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        axios
          .get(`${source}/api/v1/account/balance`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // Update balance state with response data
            setBalance(response.data.balance);
          });
      } catch (error) {
        console.error("Error fetching balance:", error);
        // Handle error if necessary
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance:</div>
      <div className="font-semibold ml-4 text-lg">
        Rs {balance !== null ? balance : "Loading..."}
      </div>
    </div>
  );
};
