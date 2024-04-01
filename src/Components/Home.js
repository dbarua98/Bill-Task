import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const getUsers = async () => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        axios
          .get(
            "https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/GetList",
            config
          )
          .then((response) => {
            setCustomers(response.data);
          });
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (customerId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Delete/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCustomers = customers.filter(
        (customer) => customer.id !== customerId
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    getUsers();
  };

  return (
    <div className="home-container">
      <div className="d-flex w-50 gap-2">
        <Button
          onClick={() => navigate("/addcustomer ")}
          className=" rounded-2"
        >
          Add
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print
        </Button>
      </div>

      <h2>Customer List</h2>
      <table className="customer-table container">
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {customers.map((customer) => (
            <tr key={customer.customerID}>
              <td>{customer.customerID}</td>
              <td>{customer.customerName}</td>
              <td className="d-flex gap-2">
                <button
                  className="action-button rounded-2"
                  onClick={() => handleDeleteUser(customer.customerID)}
                >
                  Delete
                </button>
                <button
                  className="action-button rounded-2"
                  onClick={() =>
                    navigate(`/addCustomer/${customer.customerID}`)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Number of Customers {customers.length}</p>
    </div>
  );
};

export default Home;
