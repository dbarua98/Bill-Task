import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddCustomer = () => {
  const {id} = useParams();
  const [editData,setEditData] =useState(id);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ]);
  const token = localStorage.getItem('token');
  const handleFormSubmit = async(e) => {



    e.preventDefault();
   if(!id){
    try {
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
    
    navigate("/home")
   }
   else{
    // console.log("qwerta123456",)
  const token = localStorage.getItem('token');
  // setCustomerName(customer.customerName)

  try {
    // Fetch user data from your API
    const response = await axios.put(`https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/Update`,{
      customerId :id,
      customerName : customerName

    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
console.log("asdfg",response)
    // If the request is successful, set the editing state with the retrieved user data
    const customerToEdit = response.data; // Assuming your API returns the customer data
    setCustomerName(customerToEdit.name);
    // setEditingCustomerId(customerId);
    navigate("/home")
  } catch (error) {
    console.error('Error fetching user data for edit:', error);
    // Handle error appropriately (e.g., show an error message to the user)
  }
   }
  };

  const getUser = async (customer) => {
    // Get the token from local storage
  
    const token = localStorage.getItem('token');
    // setCustomerName(customer.customerName) 
  
    try {
      // Fetch user data from your API
      const response = await axios.get(`https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/GetList/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("qwerta123456",response.data);
      // If the request is successful, set the editing state with the retrieved user data
      const customerToEdit = response.data; // Assuming your API returns the customer data
      setCustomerName(response.data[0].customerName);
      // setEditingCustomerId(customerId);
    } catch (error) {
      console.error('Error fetching user data for edit:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    }}

    useEffect(()=>{
      if(id){
        getUser()
      }
    },[])
    console.log('1234',id,editData)
  return (
    <div className='container w-75 '>
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
          {id?"Edit":"Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
