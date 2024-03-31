import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { Container, Input, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const columns = ["Image", "Name", "Email", "Gender", "Domain", "Availability"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateTeam() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const data = useSelector((state) => state.user.teamUser);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {

    // TODO: Add the selected users to the team
    const team = {
      name: teamName,
      members: data,
    }
    console.log(team)
    alert("Team Created Successfully")
    handleClose()
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [teamName, setTeamName] = React.useState("");

  const handleTeamName = (e) => {
    e.preventDefault();
    setTeamName(e.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Team</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Typography variant="h6" id="modal-modal-title" component="h2">
              Enter Your Team Name:
              <Input
                onChange={handleTeamName}
                className="ml-2"
                defaultValue={teamName}
                placeholder="Enter Your Team Name"
              />
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell key={index} align="center">
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <>
                        <TableRow key={rowIndex}>
                          <TableCell align="center">
                            <img src={row.avatar} alt={row.name} />
                          </TableCell>
                          <TableCell align="center">
                            {row.first_name + " " + row.last_name}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.gender}</TableCell>
                          <TableCell align="center">{row.domain}</TableCell>
                          <TableCell align="center">
                            {row.available ? (
                              <CheckIcon color="success" />
                            ) : (
                              <ClearIcon color="error" />
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Button onClick={handleSubmit}>Submit</Button>
        </Container>
      </Modal>
    </div>
  );
}
