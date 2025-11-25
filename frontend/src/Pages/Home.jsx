import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Home = () => {
   let userSlice=useSelector((state)=>state.user)
     console.log(userSlice)
  const [polloption, setpollinoption] = useState([]);
   const [selected, setSelected] = useState({})
  console.log(polloption)
  
  let option1Ref=useRef()
  let option2Ref=useRef()
 
  const getAllpoll=async ()=>{
    try {
      let res=await axios.get(`https://vottin-project.onrender.com/poll/getAllpoll`)
      console.log(res)
      let question=res.data
      console.log(question)
      setpollinoption(question)

    } catch (error) {
      console.log(error)
    }
  }
    useEffect(()=>{
    getAllpoll()
  },[])
 
const handleOptionChange = (pollId, optionId) => {
  setSelected(prev => ({ ...prev, [pollId]: optionId }))
}

  const handleSubmit = async (poll) => {
    const optionId = selected[poll._id]
    if (!optionId) {
      alert("first, select poll please")
      return
    }

    try {
      let res= await axios.post(`https://vottin-project.onrender.com/poll/SubmitPoll/${poll._id}`, 
        { optionId },
        {
          headers: {
            'Authorization': userSlice.token
          }
        }
      )
     
     
      toast.success(res.data.message,{position:'top-center'});
      
    } catch (error) {
      const backendMessage = error.response?.data?.message
      console.error("Vote submit error:", error)
     toast.error(backendMessage,{position:'top-center'})
    }
     setSelected(prev => ({ ...prev, [poll._id]: null }));
       
  }
const handleShowresult=async(poll)=>{
  console.log(poll)
  let id=poll._id
  console.log(id)
  const res= await axios.get(`https://vottin-project.onrender.com/poll/result/${id}`)
  let data=res.data
  console.log(data)
  let msg =res.data.msg
  toast.success(msg,{position:'top-center'});
  
  const result = data.result.map(r => `${r.option}: ${r.percent}%`).join(' | ');

  toast.info(`Poll Result: ${result}`, {
    position: "top-center",
    autoClose: 5000
  });
}
  return (
    <div>
    { polloption.map((ele,i)=>{ 
      return <div key={i} className="w-1/2 m-auto mt-5 text-center bg-fuchsia-600 pt-1">
        
   
      <div className='mx-5 mt-5 place-items-center'>
        <h1 className='mx-6 w-2/3 text-center border-2 rounded h-8' type="text" placeholder="Enter question">{ele.question}</h1>
        
        <br />
        <div className='w-2/3 text-center border-2 rounded h-8 place-items-center'  placeholder="Option 1">
        <input ref={option1Ref} name={`poll-${ele._id}`} value={ele.options[0]._id} checked={selected[ele._id] === ele.options[0]._id} onChange={() => handleOptionChange(ele._id, ele.options[0]._id)} type='radio'/> <span>{ele.options[0].text}</span> 
        </div>
        <br />

        <div className='w-2/3 text-center border-2 rounded h-8 place-items-center' placeholder="Option 1">
        <input ref={option2Ref} name={`poll-${ele._id}`} value={ele.options[1]._id} checked={selected[ele._id] === ele.options[1]._id} onChange={() => handleOptionChange(ele._id, ele.options[1]._id)} type='radio'/> <span>{ele.options[1].text}</span> 
        </div>
        <br />

        <div className='w-2/3 text-center border-2 rounded h-8' type="date" >{ele.closingDateTime}</div>
        <br />

        <div className='flex flex-col'>
        <button className='bg-blue-500 w-2xs mb-6 rounded-2xl h-11' onClick={()=>handleSubmit(ele)}>Vote</button>
        <button className='bg-green-500 w-2xs mb-6 rounded-2xl h-11' onClick={()=>handleShowresult(ele)}>Vote Result</button>
        </div>
      </div>
    </div>})
    }
    </div>
  )
}

export default Home
