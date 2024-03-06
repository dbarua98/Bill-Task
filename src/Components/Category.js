import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
// import "react-select/dist/react-select.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
 const  navigate = useNavigate();
  const [bills, setBills] = useState();

  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState([
    { value: 1, label: "John Doe" },
    { value: 2, label: "Jane Smith" },
    // Add more customers as needed
  ]);

  
  const token = localStorage.getItem('token');
  const getBills = async()=>{

    if (token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
    try {
      axios.get('https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/GetList/', config)
      .then((response) => {
        console.log("billbill",response.data);

        setBills(response?.data)
        
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      
    }
  }
}
useEffect(()=>{
  getBills()
},[])

  const handleAddClick = () => {
    navigate("/createbill")
    // setSelectedBill(null);
    // setIsModalOpen(true);
  };

  const handleEditClick = (billID) => {
  navigate(`/createbill/${billID}`)
  };

  const handleDeleteClick = async(billId) => {
    
   try {
    const response = await axios.delete(`https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/Delete/${billId}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("response: " ,response);
    getBills();
   } catch (error) {
    console.log("error: " ,error);
   }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveBill = (updatedBill) => {
    if (selectedBill) {
      // Editing existing bill
      const updatedBills = bills.map((bill) =>
        bill.id === selectedBill.id ? { ...bill, ...updatedBill } : bill
      );
      setBills(updatedBills);
    } else {
      // Adding new bill
      const newBillId = bills.length + 1;
      const newBill = {
        id: newBillId,
        billNumber: `B${newBillId.toString().padStart(4, "0")}`,
        ...updatedBill,
      };
      setBills([...bills, newBill]);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch customers from the server or any other source
    // For now, using static data
    setCustomers([
      { value: 1, label: "John Doe" },
      { value: 2, label: "Jane Smith" },
      // Add more customers as needed
    ]);
  }, []);
  console.log("qwert123",bills)
  return (
    <div className="container">
      <div className="w-25">
        <Button variant="primary" onClick={handleAddClick}>
          Add
        </Button>
      </div>

      <table className="container">
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
            <td>{bill?.billDate.substr(0,10)}</td>
            <td>{bill?.customerName}</td>
            <td>{bill?.netAmount}</td>
            <td>{bill?.remarks}</td>
            <td className="d-flex">
              <Button variant="info" onClick={() => handleEditClick(bill.billID)}>
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

export default Category;
