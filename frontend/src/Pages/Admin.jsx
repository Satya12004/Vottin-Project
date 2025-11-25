import axios from 'axios';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Admin = () => {
  

  const [questions, setquestions] = useState([]);
    console.log(questions)
  const [show, setshow] = useState(null);
  const handleShow =(obj)=>{
    setshow(obj)
    
    console.log(obj)
    
  }

  
   let userSlice=useSelector((state)=>state.user)
   console.log(userSlice)
   const updatequestionRef=useRef()
   const updateoption1Ref=useRef()
   const updateoption2Ref=useRef()
   const updatedateRef=useRef()


    const questionRef = useRef();
  const option1Ref = useRef();
  const option2Ref = useRef();
  const dateRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {

      question: questionRef.current.value,
      options: [
        { text: option1Ref.current.value },
        { text: option2Ref.current.value }
      ],
      closingDateTime: dateRef.current.value
    };

    try {
      const res = await axios.post("https://vottin-project.onrender.com/poll/create",data, {
          headers:{
        'Authorization':userSlice.token
      }
      });
    console.log(res)
   let poll=res.data.polls
  
   
   console.log(poll)
    console.log(data)
   
    toast.success(res.data.message,{position:"top-center"})
    } catch (error) {
      console.log(error);
      
    }
    questionRef.current.value="";
    option1Ref.current.value="";
    option2Ref.current.value="";
    dateRef.current.value=""
    handlegetpolls()
    
  };

 const handlegetpolls=async()=>{
  let res =await axios.get('https://vottin-project.onrender.com/poll/get',{
          headers:{
        'Authorization':userSlice.token
      }
  })
  console.log(res)
  let poll =res.data.polls
  console.log(poll)
  setquestions(poll)

 }

useEffect(()=>{
handlegetpolls()
},[])


 const handleupdate = async (e) => {
    e.preventDefault();
    let data={}
    if(updatequestionRef.current.value){
      data.question = updatequestionRef.current.value
    }
    if(updatequestionRef.current.value){
      data.question = updatequestionRef.current.value
    }
     
      if(updateoption1Ref.current.value || updateoption2Ref.current.value){
      data.options= [
        { text: updateoption1Ref.current.value },
        { text: updateoption2Ref.current.value }
      ]
    }
    if(updatedateRef.current.value){
      data.closingDateTime= updatedateRef.current.value
    }
      
    
   console.log(show)
   let id =show._id
   console.log(id)
    try {
      const res = await axios.put(`https://vottin-project.onrender.com/poll/update/${id}`,data, {
          headers:{
        'Authorization':userSlice.token,
        "Content-Type": "application/json"
      }
      });
    console.log(res)
   let poll=res.data.polls
  
   
   console.log(poll)
    console.log(data)
   
    toast.success(res.data.message,{position:"top-center"})
    } catch (error) {
      console.log(error);
      
    }
    updatequestionRef.current.value="";
    updateoption1Ref.current.value="";
    updateoption2Ref.current.value="";
    updatedateRef.current.value=""
    setshow(null);
    handlegetpolls()

  };

  const handleDelete=async(obj)=>{
    
      let id =obj._id
      console.log(id)
      try {
        let res= await axios.delete(`https://vottin-project.onrender.com/poll/delete/${id}`,{
            headers:{
        'Authorization':userSlice.token,
        
      }
        })
        
        toast.success(res.data.message,{position:"top-center"})
      } catch (error) {
        console.log(error)
      }
      handlegetpolls()
  }


  return (
  <div className='bg-gray-300 relative'>
    <div className="w-1/2 bg-amber-600 m-auto mt-5 text-center">
        
   
      <form className='mx-5 mt-5'>
        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Enter question" ref={questionRef} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Option 1" ref={option1Ref} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Option 2" ref={option2Ref} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="date" ref={dateRef} required />
        <br /><br />

        <button className='bg-blue-500 w-2xs mb-6 rounded-2xl h-11' onClick={handleSubmit}>Create Poll</button>
      </form>
    </div>

   <div className="overflow-x-auto mt-10 mx-3">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-100 whitespace-nowrap">
      <tr>
        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
          id
        </th>
        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
          question
        </th>
        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Option
        </th>
        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Joined At
        </th>
        <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

     {questions.map((ele,i)=>{
      return <tbody key={i} className="bg-white divide-y divide-gray-200 whitespace-nowrap">
 
      <tr>
        <td className="px-4 py-4 text-sm text-slate-900 font-medium">
          {i+1}
        </td>
        <td className="px-4 py-4 text-sm text-slate-600 font-medium">
          {ele.question}
        </td>
        <td className="px-4 py-4 text-sm text-slate-600 font-medium gap-10">
          <ul className='flex gap-5'>
          <li>{ele.options[0].text}</li> 
         <li>{ele.options[1].text}</li>
          </ul>
        
        </td>
        <td className="px-4 py-4 text-sm text-slate-600 font-medium">
        {ele.closingDateTime}
        </td>
        <td className="px-4 py-4 text-sm">
          <button className="cursor-pointer text-blue-600 font-medium mr-4" onClick={()=>handleShow(ele)}>Edit</button>
          <button className="cursor-pointer text-red-600 font-medium" onClick={()=>handleDelete(ele)}>Delete</button>
        </td>
      </tr>

    
    </tbody>
})}
  </table>

{
  show &&  <div className="w-1/2 bg-blue-600 m-auto mt-5 text-center absolute top-10 z-10">
        
   
      <form className='mx-5 mt-5'>
        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Enter question" ref={updatequestionRef} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Option 1" ref={updateoption1Ref} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="text" placeholder="Option 2" ref={updateoption2Ref} required/>
        <br /><br />

        <input className='w-2/3 text-center border-2 rounded' type="date" ref={updatedateRef} required />
        <br /><br />

       
        <button className='bg-blue-500 w-2xs mb-6 rounded-2xl h-11' onClick={handleupdate}>Update poll</button>
        <button onClick={()=>setshow(null)} className='bg-green-400 text-black absolute right-0 top-0 rounded-md p-3'>X</button>

      </form>

    </div>
}
</div>
 

  </div> 

    
  )
}

export default Admin
