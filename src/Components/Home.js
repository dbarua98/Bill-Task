import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ]);

  const token = localStorage.getItem('token');

  const getUsers = async()=>{

    if (token) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
    try {
      axios.get('https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/GetList', config)
      .then((response) => {
        console.log("qwerty",response.data);

        setCustomers(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      
    }
  }
}

useEffect(()=>{
  getUsers();
},[customerName])

const handleFormSubmit = async (e) => {
  e.preventDefault();

 
    try {
      // Adding new customer
      const response = await axios.post('https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Insert', {
        customerName: customerName,
      },{
        
          headers: {
            'Authorization': `Bearer ${token}`,
          }
      },);

      const newCustomer = response.data; // Assuming the API returns the created customer object
      setCustomers([...customers, newCustomer]);
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    }
  

  setCustomerName("");
};

const handleDeleteUser = async (customerId) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  try {
    // Make a DELETE request to your API endpoint for deleting a user
    await axios.delete(`https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Delete/${customerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // If the request is successful, update the state
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle error appropriately (e.g., show an error message to the user)
  }
  getUsers();
};

const handleEditUser = async (customer) => {
  // Get the token from local storage
console.log("qwerta123456",customer)
  const token = localStorage.getItem('token');
  setCustomerName(customer.customerName)

  try {
    // Fetch user data from your API
    const response = await axios.get(`https://your-api-endpoint.com/api/customers/${customer.customerID}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // If the request is successful, set the editing state with the retrieved user data
    const customerToEdit = response.data; // Assuming your API returns the customer data
    setCustomerName(customerToEdit.name);
    // setEditingCustomerId(customerId);
  } catch (error) {
    console.error('Error fetching user data for edit:', error);
    // Handle error appropriately (e.g., show an error message to the user)
  }
};
  return (
    <div className="home-container">
      {/* <h1>Welcome to GOOD VETS</h1>
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
          {customerName ? "Update" : "Add"}
        </button>
      </form> */}
      <button onClick={()=>navigate('/addcustomer ')} className="w-25 rounded-2" >Add</button>

      <h2>Customer List</h2>
      <table className="customer-table container">
        <thead style={{textAlign:"center"}}>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{textAlign:"center"}}>
          {customers.map((customer) => (
            <tr key={customer.customerID}>
              <td>{customer.customerID}</td>
              <td>{customer.customerName}</td>
              <td className="d-flex gap-2">
                <button className="action-button rounded-2" onClick={() => handleDeleteUser(customer.customerID)}>
                  Delete
                </button>
                <button className="action-button rounded-2" onClick={() =>navigate(`/addCustomer/${customer.customerID}`)}>
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
