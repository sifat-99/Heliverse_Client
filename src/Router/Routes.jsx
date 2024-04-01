import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddUser from "../Components/AddUser/AddUser";
import Teams from "../Components/Teams/Teams";
import User from "../Components/Users/User/User";
import axios from "axios";
import UserTable from "../Components/Users/UserTable";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Dashboard />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "allTeams",
        element: <Teams />,
      },
      {
        path: "createTeam",
        element: <UserTable />,
      },
      {
        path: "users/:id",
        element: <User />,
        loader: async ({ params }) => {
          console.log(params);
          const id = params?.id;
          const response = axios.get(`https://heliverse-server-khaki.vercel.app/users/${id}`);
          const data = (await response).data;
          return data;
        },
      },
    ],
  },
]);

export default routes;
