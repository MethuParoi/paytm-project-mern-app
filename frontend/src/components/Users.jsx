import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "./atom";
import { sourceAtom } from "./atom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [counter, setCounter] = useState("");

  const source = useRecoilValue(sourceAtom);

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(`${source}/api/v1/user/bulk?filter=` + filter)
        .then((response) => {
          setUsers(response.data.user);
        });
    };

    //fetch balance initially
    fetchUser();

    //fetch balance after every 5sec
    const intervalId = setInterval(() => {
      fetchUser();
      setCounter(counter + 1);
    }, 5000);

    //clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [source, filter, counter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const name = useRecoilValue(usernameAtom);

  return (
    <>
      {user.username !== name && (
        <div className="flex justify-between pb-5">
          <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center h-full">
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <Button
              onClick={() => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`);
              }}
              label={"Send Money"}
            />
          </div>
        </div>
      )}
    </>
  );
}

