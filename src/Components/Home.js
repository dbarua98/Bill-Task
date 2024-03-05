import React, { useState } from "react";

const Home = () => {
  const [customerName, setCustomerName] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingCustomerId !== null) {
      // Editing existing customer
      const updatedCustomers = customers.map((customer) =>
        customer.id === editingCustomerId ? { ...customer, name: customerName } : customer
      );
      setCustomers(updatedCustomers);
      setEditingCustomerId(null);
    } else {
      // Adding new customer
      const newCustomerId = customers.length + 1;
      const newCustomer = {
        id: newCustomerId,
        name: customerName
      };
      setCustomers([...customers, newCustomer]);
    }

    setCustomerName("");
  };

  const handleDeleteUser = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  };

  const handleEditUser = (customerId) => {
    const customerToEdit = customers.find((customer) => customer.id === customerId);
    setCustomerName(customerToEdit.name);
    setEditingCustomerId(customerId);
  };

  return (
    <div className="home-container">
      <h1>Welcome to GOOD VETS</h1>
      <p>FOR YOUR VERY IMPORTANT PET.</p>

      <h2>{editingCustomerId ? "Edit Customer" : "Add New Customer"}</h2>
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
        <button type="submit" className="form-submit">
          {editingCustomerId ? "Update" : "Add"}
        </button>
      </form>

      <h2>Customer List</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>
                <button className="action-button" onClick={() => handleDeleteUser(customer.id)}>
                  Delete
                </button>
                <button className="action-button" onClick={() => handleEditUser(customer.id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     <p> {customers.length}</p>
    </div>
  );
};

export default Home;
