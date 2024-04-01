import { useLoaderData } from "react-router-dom";

const Teams = () => {
  const Teams = useLoaderData();
  console.log(Teams);
  return (
    <div>
      {Teams.length > 0 ? (
        Teams.map((team) => (
          <div key={team._id}>
            <h1>{team.name}</h1>
            <p>
              {team.members
                .map((member) => member.first_name + " " + member.last_name)
                .join(", ")}
            </p>
          </div>
        ))
      ) : (
        <h1>No teams available</h1>
      )}
    </div>
  );
};

export default Teams;
