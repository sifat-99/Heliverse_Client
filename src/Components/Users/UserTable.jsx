import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import { addUserToTeam, selectSelectedUsers } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTeam from "../../Hooks/CreateTeam";
import axios from "axios";
import { Container,Typography } from "@mui/material";
const columns = [
  "Select",
  "Image",
  "Name",
  "Email",
  "Gender",
  "Domain",
  "Availability",
];
export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  const [team, setTeam] = useState([]);
  const teams = CreateTeam();

  const selectedUser = useSelector(selectSelectedUsers);
  console.log(selectedUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/users?page=${page + 1}&limit=${rowsPerPage}`
        );
        const { users, totalPages } = response.data;
        setUsers(users);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const handleCheckboxChange = (event, user) => {
    if (selectedUser.teamUser.length > 0) {
      const isUniqueDomain = selectedUser.teamUser.some(
        (select) => select.domain === user.domain
      );
      console.log(isUniqueDomain);
      if (isUniqueDomain) {
        dispatch(addUserToTeam(user));
        setSelectedUsers((prevSelected) => [...prevSelected, user]);
      } else {
        alert("You can only select users with the same domain");
      }
    } else {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
      dispatch(addUserToTeam(user));
    }
  };

  const createTeam = () => {
    console.log(selectedUser.teamUser);
    setTeam(selectedUsers);
    setSelectedUsers([]);
  };
  console.log(team);

  return (
    <Paper sx={{ width: "90%" }} className="mx-auto">
      <TableContainer sx={{ maxHeight: 700 }}>
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
            {users.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                <TableCell align="center">
                  <Checkbox
                    checked={selectedUsers.includes(row)}
                    onChange={(event) => handleCheckboxChange(event, row)}
                    disabled={!row.available}
                  />
                </TableCell>
                {columns.slice(1).map((column, columnIndex) => (
                  <TableCell key={columnIndex} align="center">
                    {column === "Image" ? (
                      <img src={row.avatar} alt={row.first_name} width="50" />
                    ) : column === "Name" ? (
                      row.first_name + " " + row.last_name
                    ) : column === "Availability" ? (
                      row.available ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )
                    ) : (
                      row[column.toLowerCase()]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container className="!flex !flex-row !items-center !justify-between !mt-4">
        <Typography className="!ml-2">Page: {page+1}</Typography>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={totalPages * rowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <div onClick={createTeam}>{teams}</div>
    </Paper>
  );
}
