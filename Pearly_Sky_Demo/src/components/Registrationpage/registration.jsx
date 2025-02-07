import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const RegistrationForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); 
  
  const userDetails = {
    name: "",
    contact: "",
    userName: "",
    password: "",
    confirmPassword:""
  };
  const [formData, setFormData] = useState(userDetails);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ 
      ...prevData,
       [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.userName) newErrors.userName = "User name is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Retype Password is required."
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); 
    setErrors(validationErrors); 

  
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setOpenDialog(true);
    }

    try{
      const response = await axios.post(
        "http://13.61.166.183:8080/user/register",
        {
          name:formData.name,
          contact:formData.contact,
          userName:formData.userName,
          password:formData.password,
        }
      )

      alert(`Register successful! \n 
        Id: ${response.id},\n 
        Name: ${response.name},\n 
        Contact: ${response.contact},\n 
        User Name: ${response.userName}`);
      

    }catch(error){
        setErrorMessage("Error registering user: " + error.message);
    }

  };
  
  const handleClose = () => {
    setOpenDialog(false); 
    navigate('/login'); 

  };


  return (
    <div
      className="flex justify-center  font-[sans-serif] h-full min-h-screen p-4"
      style={{
        backgroundImage: `url('/images/—Pngtree—girl in the library_4483612.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className=" rounded-2xl border bg-white shadow-lg  max-w-screen-xl  p-6"
        
      >
        <form onSubmit={handleSubmit} className="justify-start w-full max-w-screen-xl ">
          <h2 className="text-2xl font-extrabold text-center text-bluedark mb-6">
            User Registration
          </h2>

          
            
            <div className="flex gap-3 mt-2">
              <div className="flex-1">
                <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              </div>

            
            <div className="mt-4">
              <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            <div className="flex gap-3 mt-2">
              <div className="flex-1">
                <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>
              </div>


          
          <div className="mb-6">
             
             <div className="flex gap-4 mt-4">
               <div className="flex-1">
                 <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">Password</label>
                 <input
                   type={showPassword ? "text" : "password"}
                   name="password"
                   value={formData.password}
                   onChange={handleInputChange}
                   className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                 />
                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
               </div>

               <div className="flex-1">
                 <label className="ml-3 block mb-2 text-sm font-medium text-gray-700 font-semibold">Confirm Password</label>
                 <input
                   type={showPassword ? "text" : "password"}
                   name="confirmPassword"
                   value={formData.confirmPassword}
                   onChange={handleInputChange}
                   className="w-full border rounded-full px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                 />
                 {errors.confirmPassword && (
                   <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                 )}
               </div>
              
             </div>

             <div className="flex items-center mt-2">
               <input
                 type="checkbox"
                 onChange={() => setShowPassword(!showPassword)}
                 className="mr-2"
               />
               <span className="text-sm text-gray-700 font-bold">Show Password</span>
             </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mb-2 py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full bg-black text-white hover:bg-grey hover:text-white focus:outline-none"
            >
              Create Account
            </button>
          </div>
        </form>

        <Dialog  open={openDialog} onClose={handleClose} 
        PaperProps={{style: { borderRadius: '20px' },  }}>
          <DialogTitle 
            className=" text-black" 
            
          >
           User Registration Successfully
          </DialogTitle>
          <DialogContent 
            className="bg-gray-100 text-gray-800" 
            
          >
            <p>The User Details has been  saved to the system.</p>
            <p>
              <strong>User Name:</strong> {formData.name}
            </p>
            
          </DialogContent>
          <DialogActions 
            className="bg-gray-100" 
            style={{ backgroundColor: "#F3F4F6" }}
          >
            <Button 
              onClick={handleClose} 
              className=" text-black " 
              style={{
                
                 
                borderRadius: "20px", 
                padding: "8px 16px",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RegistrationForm;
