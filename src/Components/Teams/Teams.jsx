import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Avatar, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Teams = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteTeam = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:4001/deleteTeam/${id}`)
        .then((res) => {
          {
            res.status == 200 &&
              Swal.fire({
                icon: "success",
                title: "Team deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
          }
          axios.get("http://localhost:4001/allTeams").then((res) => {
            setLoading(false);
            setAllTeams(res.data);
          });
        });
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };
  useEffect(() => {
    axios.get("http://localhost:4001/allTeams").then((res) => {
      setAllTeams(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "30px",
          }}
        >
          <CircularProgress />
          <br />
          <Typography variant="h5" className="!ml-4">
            Loading...
          </Typography>
        </Box>
      ) : (
        <div>
          {allTeams.length > 0 ? (
            allTeams.map((team) => (
              <div
                key={team._id}
                className="mb-8 border-2 border-black p-2 rounded-xl"
              >
                <div className="flex items-center justify-between pr-12 mb-2">
                  <h1 className="text-2xl font-bold">
                    Team Name:{" "}
                    <span className="text-orange-400 underline">
                      {team.name}
                    </span>
                  </h1>
                  <button
                    onClick={() => {
                      handleDeleteTeam(team._id);
                    }}
                    className="btn bg-black text-white p-2 rounded-lg hover:bg-blue-600 hover:text-white"
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
                {team.members.length > 0 ? (
                  <div>
                    {team.members.map((member, index) => (
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}a-content`}
                          id={`panel${index}a-header`}
                        >
                          <Typography>
                            {member.first_name} {member.last_name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex justify-between w-full items-center">
                            <Typography>
                              Email: {member.email}
                              <br />
                              Gender: {member.gender}
                              <br />
                              Domain: {member.domain}
                              <br />
                              Available: {member.available ? "Yes" : "No"}
                            </Typography>
                            <Avatar
                              src={member.avatar}
                              className="w-28 h-20 mr-8 border rounded-full border-black"
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                ) : (
                  <p>No members in this team</p>
                )}
              </div>
            ))
          ) : (
            <h1>No teams available</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Teams;
