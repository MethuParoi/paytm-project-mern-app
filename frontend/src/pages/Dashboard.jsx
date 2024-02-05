import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";


export const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <Appbar />
      <div className="m-4 lg:m-8">
        <Balance />
        <Users />
      </div>
    </div>
  );
};
