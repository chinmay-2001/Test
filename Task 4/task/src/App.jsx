import { useState, useEffect } from "react";
import AddMemberModal from "./components/AddMemberModal";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/students", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setMembers(res.data.data);
        setTotalCount(res.data.total);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };

    fetchMembers();
  }, [currentPage]);

  const handleAddMember = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/students", data);
      Swal.fire({
        icon: "success",
        title: "Member added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(res);
      if (res && res.data) {
        setMembers([res.data, ...members]);
      }
      setCurrentPage(1);
    } catch (err) {
      console.error("Error adding member", err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/students/${id}`);
          Swal.fire("Deleted!", "The member has been deleted.", "success");

          const res = await axios.get("http://localhost:3000/api/students", {
            params: { page: currentPage, limit: itemsPerPage },
          });
          setMembers(res.data.data);
          setTotalCount(res.data.total);
        } catch (err) {
          console.error("Error deleting member", err);
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>All Members</h4>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add New Member
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Member Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.length &&
            members?.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.marks}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(m.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li
              key={idx}
              className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages || totalPages === 0 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      <AddMemberModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
}

export default App;
