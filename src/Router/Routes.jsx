import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddUser from "../Components/AddUser/AddUser";
import Teams from "../Components/Teams/Teams";

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
        path:"/addUser",
        element: <AddUser />
      },
      {
        path:'allTeams',
        element: <Teams />
      }
    ],
  },
]);

export default routes;
