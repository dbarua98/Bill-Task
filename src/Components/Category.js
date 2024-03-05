import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
// import "react-select/dist/react-select.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
 const  navigate = useNavigate();
  const [bills, setBills] = useState([
    {
      id: 1,
      billNumber: "B0001",
      billDate: new Date(),
      customer: { value: 1, label: "John Doe" },
      description: "Item 1",
      rate: 50,
      qty: 2,
      remarks: "<p>Sample remarks</p>",
    },
    // Add more sample data as needed
  ]);

  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState([
    { value: 1, label: "John Doe" },
    { value: 2, label: "Jane Smith" },
    // Add more customers as needed
  ]);

  const handleAddClick = () => {
    navigate("/createbill")
    // setSelectedBill(null);
    // setIsModalOpen(true);
  };

  const handleEditClick = (bill) => {
    // setSelectedBill(bill);
    // setIsModalOpen(true);
  };

  const handleDeleteClick = (billId) => {
    const updatedBills = bills.filter((bill) => bill.id !== billId);
    setBills(updatedBills);
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

  return (
    <div>
      <div>
        <Button variant="primary" onClick={handleAddClick}>
          Add
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bill Number</th>
            <th>Bill Date</th>
            <th>Customer</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.billNumber}</td>
              <td>{bill.billDate.toLocaleDateString()}</td>
              <td>{bill.customer.label}</td>
              <td>{bill.description}</td>
              <td>{bill.rate}</td>
              <td>{bill.qty}</td>
              <td>{bill.rate * bill.qty}</td>
              <td dangerouslySetInnerHTML={{ __html: bill.remarks }}></td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(bill)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(bill.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {isModalOpen && (
        <Modal show={isModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBill ? "Edit Bill" : "Add Bill"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBillNumber">
                <Form.Label>Bill Number</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedBill ? selectedBill.billNumber : ""}
                />
              </Form.Group>
              <Form.Group controlId="formBillDate">
                <Form.Label>Bill Date</Form.Label>
                <DatePicker
                  selected={
                    selectedBill ? new Date(selectedBill.billDate) : new Date()
                  }
                  onChange={(date) =>
                    setSelectedBill({ ...selectedBill, billDate: date })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCustomer">
                <Form.Label>Customer</Form.Label>
                <Select
                  options={customers}
                  value={selectedBill ? selectedBill.customer : null}
                  onChange={(selectedOption) =>
                    setSelectedBill({ ...selectedBill, customer: selectedOption })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedBill ? selectedBill.description : ""}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formRate">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBill ? selectedBill.rate : ""}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, rate: parseFloat(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formQty">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedBill ? selectedBill.qty : ""}
                  onChange={(e) =>
                    setSelectedBill({ ...selectedBill, qty: parseFloat(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formRemarks">
                <Form.Label>Remarks</Form.Label>
                <ReactQuill
                  value={selectedBill ? selectedBill.remarks : ""}
                  onChange={(value) =>
                    setSelectedBill({ ...selectedBill, remarks: value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => handleSaveBill(selectedBill)}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}
    </div>
  );
};

export default Category;
