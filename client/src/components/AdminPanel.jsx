import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    const res = await axios.get(`/api/users?page=${page}&search=${search}`);
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button onClick={() => handlePageChange(page - 1)}>Previous</Button>
        <span>
          {page} / {totalPages}
        </span>
        <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default AdminPanel;
