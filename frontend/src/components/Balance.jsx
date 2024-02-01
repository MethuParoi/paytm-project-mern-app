import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        axios
          .get(
            "https://paytm-project-mern-ei0wfexiv-methu-parois-projects.vercel.app/api/v1/account/balance",
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
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
