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
import {
  addUserToTeam,
  removeUserFromTeam,
  selectSelectedUsers,
} from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTeam from "../../Hooks/CreateTeam";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const dispatch = useDispatch();
  const teams = CreateTeam();
  const selectedUser = useSelector(selectSelectedUsers);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/users?page=${page + 1}&limit=${rowsPerPage}`
        );
        const { users, totalPages } = response.data;
        setLoading(false);
        setUsers(users);
        setTotalPages(totalPages);
        const allUsersResponse = await axios.get(
          `http://localhost:4001/allUsers`
        );
        setAllUsers(allUsersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
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

      const isExistingUser = selectedUsers.some(
        (selectedUser) => selectedUser._id === user._id
      );

      if (isUniqueDomain && !isExistingUser) {
        dispatch(addUserToTeam(user));
        setSelectedUsers((prevSelected) => [...prevSelected, user]);
      } else if (!isUniqueDomain) {
        alert("You can only select users from the same domain");
      } else {
        dispatch(removeUserFromTeam(user));
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((selectedUser) => selectedUser._id !== user._id)
        );
      }
    } else {
      const isUserSelected = selectedUsers.some(
        (selectedUser) => selectedUser._id === user._id
      );

      if (isUserSelected) {
        dispatch(removeUserFromTeam(user));
        event.target.checked = false;
      } else {
        setSelectedUsers((prevSelected) => [...prevSelected, user]);
        dispatch(addUserToTeam(user));
      }
    }
  };
  console.log(selectedUser.teamUser);

  console.log(allUsers);

  const filteredUsers = allUsers
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => {
      if (domainFilter && user.domain !== domainFilter) return false;
      if (genderFilter && user.gender !== genderFilter) return false;
      if (availabilityFilter && user.available !== availabilityFilter)
        return false;
      return true;
    });

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
        <Paper sx={{ width: "90%" }} className="mx-auto">
          <Container className="!flex gap-2 !flex-col lg:!flex-row ">
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Domain</InputLabel>
              <Select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="UI Designing">UI Designing</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Availability</InputLabel>
              <Select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={true}>Available</MenuItem>
                <MenuItem value={false}>Not Available</MenuItem>
              </Select>
            </FormControl>
          </Container>
          <TableContainer
            sx={{ maxHeight: 600 }}
            className=" !border-t-2 !border-black"
          >
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
              {searchQuery ||
              domainFilter ||
              genderFilter ||
              availabilityFilter ? (
                <TableBody>
                  {filteredUsers.map((row, rowIndex) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                    >
                      <TableCell align="center" key={row._id}>
                        <Checkbox
                          checked={selectedUsers.includes(row)}
                          onChange={(event) => handleCheckboxChange(event, row)}
                          disabled={!row.available}
                        />
                      </TableCell>
                      {columns.slice(1).map((column, columnIndex) => (
                        <TableCell key={columnIndex} align="center">
                          {column === "Image" ? (
                            <img
                              src={row.avatar}
                              alt={row.first_name}
                              width="50"
                            />
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
              ) : (
                <TableBody>
                  {users.map((row, rowIndex) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                    >
                      <TableCell align="center" key={row._id}>
                        <Checkbox
                          checked={selectedUsers.includes(row) ? true : false}
                          onChange={(event) => handleCheckboxChange(event, row)}
                          disabled={!row.available}
                        />
                      </TableCell>
                      {columns.slice(1).map((column, columnIndex) => (
                        <TableCell key={columnIndex} align="center">
                          {column === "Image" ? (
                            <img
                              src={row.avatar}
                              alt={row.first_name}
                              width="50"
                            />
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
              )}
            </Table>
          </TableContainer>
          <Container className="!flex !flex-row !items-center !justify-between !mt-4">
            <Typography className="!ml-2">Page: {page + 1}</Typography>
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
          <div>{teams}</div>
        </Paper>
      )}
    </>
  );
}
