import React, { useState, useEffect, useContext } from "react";
import {Button } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillList = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const getBills = async () => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        axios
          .get(
            "https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/GetList/",
            config
          )
          .then((response) => {
            setBills(response?.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {}
    }
  };
  useEffect(() => {
    getBills();
  }, []);

  const handleAddClick = () => {
    navigate("/createbill");
  };

  const handleEditClick = (billID) => {
    navigate(`/createbill/${billID}`);
  };

  const handleDeleteClick = async (billId) => {
    try {
      const response = await axios.delete(
        `https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/Delete/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getBills();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="w-25 d-flex gap-2">
        <Button variant="primary" onClick={handleAddClick}>
          Add
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print
        </Button>
      </div>

      <table className="container text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bill Number</th>
            <th>Bill Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills?.map((bill) => (
            <tr key={bill?.primaryKeyID}>
              <td>{bill?.primaryKeyID}</td>
              <td>{bill?.billNo}</td>
              <td>{bill?.billDate.substr(0, 10)}</td>
              <td>{bill?.customerName}</td>
              <td>{bill?.netAmount}</td>
              <td>
                {bill?.remarks &&
                  bill.remarks.replace(/<[^>]*>/g, "").substring(0, 50)}
              </td>
              <td className="d-flex">
                <Button
                  className="mx-2"
                  variant="info"
                  onClick={() => handleEditClick(bill.billID)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(bill.billID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
