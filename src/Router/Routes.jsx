import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddUser from "../Components/AddUser/AddUser";
import Teams from "../Components/Teams/Teams";
import User from "../Components/Users/User/User";
import axios from "axios";

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
      },
      {
        path: 'users/:id',
        element: <User />,
        loader: async ({params}) => {
          console.log(params)
          const id = params?.id;
          console.log(id)
           const response = axios.get(`http://localhost:4001/users/${id}`);
           console.log((await response).data)
           const data = (await response).data;

           console.log(data)

           return data;


         
        }
      }
    ],
  },
]);

export default routes;
