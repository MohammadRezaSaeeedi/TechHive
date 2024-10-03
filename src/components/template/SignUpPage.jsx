'use client'
import React, { useState } from 'react'

function SignUpPage() {
  const [form , setForm] = useState({
    name:"",
    lastName:"",
    phoneNumber:"",
    email:"",
    password:"",
    confirmPassword:"",
    gender:"",

  })
const inputHandler = (e) => {
const value = e.target.value;
const name = e.target.name;
   setForm({ ...form, [name]: value })  ;
}
const clickHandler = async (e) => {
e.preventDefault();
//validation


//signUp api
console.log({ form })

const res  = await  fetch('', {
  method: 'POST',
  body: JSON.stringify({
    name,
    lastName,
    phoneNumber,
    email,
    password,
    gender,
  }),
  headers: { 'Content-Type': 'application/json' },
 });
const data = await res.json();
  
};

  return (

   <form className='w-fit mx-auto my-4 flex flex-col items-center gap-4 border p-8 bg-blue-400 rounded-xl' action="">
    <h1>SignUp</h1>
    <input type="text" name="name" placeholder='add Name..' onChange={inputHandler} />
    <input type="text" name="lastName" placeholder='add LastName..' onChange={inputHandler} />
    <select name='gender'  onChange={inputHandler} > 
      <option value="" disabled selected>gender</option>
      <option value="Male">Male</option>
      <option value="FeMale">Female</option>
      </select>
    <input type="email" name="email" placeholder='add Email..' onChange={inputHandler} />
    <input type="number" name="phoneNumber" placeholder='add PhoneNumber..' onChange={inputHandler} />
    <input type="password" name="password" placeholder='add Password..' onChange={inputHandler} />
    <input type="password" name="confirmPassword" placeholder='Confirm Password..' onChange={inputHandler} />
    <button className='border p-2 rounded-lg text-2xl font-bold bg-black text-white' onClick={clickHandler}>SignUp</button>
   </form>
  )  
}

export default SignUpPage