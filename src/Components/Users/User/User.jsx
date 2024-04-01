import { useLoaderData } from "react-router-dom";

const User = () => {
  const userData = useLoaderData();
  console.log(userData);
  return <div>
    <h1>{userData.name}</h1>
    <h2>{userData.email}</h2>
    <h3>{userData.phone}</h3>
    <h4>{userData.website}</h4>
  </div>;
};

export default User;
