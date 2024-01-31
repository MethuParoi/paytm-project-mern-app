import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
// import { useSearchParams } from "react-router-dom";

export const Dashboard = () => {
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
        <Users />
      </div>
    </div>
  );
};
