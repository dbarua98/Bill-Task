import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customers, setCustomers] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      try {
        const response = await axios.post(
          "https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Insert",
          {
            customerName: customerName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newCustomer = response.data;
        setCustomers([...customers, newCustomer]);
      } catch (error) {
        console.error("Error creating customer:", error);
      }

      setCustomerName("");

      navigate("/home");
    } else {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.put(
          `https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Update`,
          {
            customerId: id,
            customerName: customerName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const customerToEdit = response.data;
        setCustomerName(customerToEdit.name);
        navigate("/home");
      } catch (error) {
        console.error("Error fetching user data for edit:", error);
      }
    }
  };

  const getUser = async (customer) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/GetList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomerName(response.data[0].customerName);
    } catch (error) {
      console.error("Error fetching user data for edit:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, []);

  return (
    <div className="container w-50 " style={{ height: "100vh" }}>
      <form onSubmit={handleFormSubmit} className="form-container">
        <label className="form-label">
          Customer Name:
          <input
            className="form-input"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="form-submit rounded-2">
          {id ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
