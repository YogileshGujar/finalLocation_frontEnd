import axios from 'axios';
import React from 'react'
import { Button } from 'reactstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteMeeting = (props) => {
    console.log("deleteId ",props.meetingId);

    let deleteMeeting = async ()=>{
       let data={
        _id:props.meetingId
       }
       try{
       let deletData=await axios.post("http://localhost:5000/api/deleteMeeting",data);
        if(deletData.status === 200){
            props.showMeetingData()
            
            console.log("deletedata from compon ",deletData.status)
        }


       }catch(e){
        console.log("error...", e)
       }
    }
  return (
    <>
    <Button style={{ marginLeft:139 ,marginRight:7,marginBottom:6}} color="info"  
                              
          onClick={deleteMeeting} >Delete</Button>
    </>
  )
}

export default DeleteMeeting
