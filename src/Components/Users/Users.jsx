import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";

export default function Users() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/users?page=${page}&limit=${rowsPerPage}`
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

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios
        .delete(`http://localhost:4001/deleteUser/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.deletedCount === 1) {
            Swal.fire({
              icon: "success",
              title: "User deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      const response = await axios.get(
        `http://localhost:4001/users?page=${page}&limit=${rowsPerPage}`
      );
      const { users, totalPages } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Paper sx={{ width: "90%" }} className="mx-auto">
      <TableContainer
        sx={{ maxHeight: 700 }}
        className="!grid !grid-cols-3 !gap-8"
      >
        {users.map((user) => {
          return (
            <Card key={user._id} className="!w-full">
              <CardMedia
                sx={{ height: 140, width: 140 }}
                image={user?.avatar}
                title="green iguana"
                className="!mx-auto !no-underline"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user?.first_name} {user?.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {user?.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Domain: {user?.domain}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability:{" "}
                  {user?.available ? (
                    <CheckIcon className="text-green-600" />
                  ) : (
                    <ClearIcon className="text-red-600" />
                  )}
                </Typography>
              </CardContent>
              <CardActions className="!flex !justify-between !items-center">
                <Link to={`/users/${user?._id}`}>
                  <button className="!bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !rounded">
                    View Profile
                  </button>
                </Link>

                <button
                  onClick={() => {
                    handleDelete(user._id);
                  }}
                  className="!bg-yellow-400 !hover:bg-yellow-700 !text-white !font-bold !py-2 !px-4 !rounded"
                >
                  <DeleteForeverIcon className="text-red-700" />
                </button>
              </CardActions>
            </Card>
          );
        })}
      </TableContainer>
      <Stack spacing={2} className="flex w-full">
        <Typography className="!ml-2 !mt-4">Page: {page}</Typography>
        <Grid container justifyContent="center">
          <Container className="!flex !flex-row !items-center !justify-center !gap-10">
            <Typography>
              Rows per page:
              <select
                onChange={(e) => {
                  setRowsPerPage(e.target.value);
                }}
                label="Rows per page"
                className="!select !select-bordered !w-20 ml-4 bg-white text-black p-2 rounded-lg"
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Container>
        </Grid>
      </Stack>
    </Paper>
  );
}
