
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card,CardHeader,CardBody,CardTitle,CardText, Button } from 'reactstrap'

const Home = () => {

    let[allMeetingData,setallMeetingData]=useState([])
    let[allUserData,setallUserData]=useState([]);
    let[allinvitesData,setallinvitesdata]=useState([]);
   

      
    useEffect(()=>{
        let getData= async ()=>{
            try{
                let allMeetings=await axios.get("http://localhost:5000/api/getAllMeetings")
                  console.log("Meeting data ",allMeetings)
                  setallMeetingData(allMeetings.data)
                  
            }catch(e){
                console.log("error...", e)
            }
        }

        let getUser= async ()=>{
            try{
                let userData=await axios.get("http://localhost:5000/api/getAllUsers")
                  console.log("User data ",userData)
                  setallUserData(userData.data)
                  
            }catch(e){
                console.log("error...", e)
            }
        }

        let getInvites= async ()=>{
            try{
                let invitesData=await axios.get("http://localhost:5000/api/getAllInvites")
                  console.log("Invites data ",invitesData)
                  setallinvitesdata(invitesData.data.data)
                  
            }catch(e){
                console.log("error...", e)
            }
        }
            
      getData();
      getUser();
      getInvites();
     
    },[])
//    console.log("fron console ",allMeetingData[0].requesterId);
 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
   let showMeetingData= () =>{
    let id="640f58b03148659d8f398768";
    if(!allMeetingData){
        <h3>No Meeting Dta found</h3>
    }else{
        return allMeetingData.filter(
            (data)=>{
                if(data.requesterId===id || data.receiverIds.includes(id)){
                    return data;
                }
            }).map((meeting)=>{
               
                let requester= allUserData.find((user)=>user._id === meeting.requesterId);
                let invited=  meeting.receiverIds.length;
                let invitess= allinvitesData.filter(data=>data.meetingId === meeting._id &&
                  data.status ==="accepted");
                  let invitescount=invitess.length;
                console.log("count ",invitess);
                return(
                    <Card
                    className="my-2"
                    color="light"
                    style={{
                      width: '18rem'
                    }}
                  >
                    <CardHeader>
                     { meeting.status } 
                     (invited {invited})
                     (Joined {invitescount})
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h5">
                        {meeting.meetingName}
                      ( {requester.fname})
                      </CardTitle>
                      <CardText>
                       {meeting.description}
                       {meeting.requesterId===id ? <span> ( You)</span> : null}
                      </CardText>
                    </CardBody>
                  </Card>
                )
            })
            
                
            
    }
   }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
//    let updateButtonName=(event)=>{
//     setbuttonName( event.target.getAttribute('name'));
//    }

   let updateStatus= async(event,id)=>{
   console.log(event,id)
   let data={
    meetingId:id,
    receiverId:"641e8b66f514dd1f8514eed2",
    status:event
   }
   try{
    let allMeetings=await axios.post("http://localhost:5000/api/updateMeeting",data)
      console.log("Status data ",allMeetings)
      
      
}catch(e){
    console.log("error...", e)
}

   }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////

   let showInvitessData= () =>{
    let id="641e8c16f514dd1f8514eedb";
    let id2="641e8b66f514dd1f8514eed2";
    if(!allMeetingData){
        <h3>No Meeting Dta found</h3>
    }else{
        return allMeetingData.filter(
            (data)=>{
                if(data.receiverIds.includes(id2)){
                    return data;
                }
            }).map((meeting)=>{
                return(
                    <Card
                    className="my-2"
                    color="light"
                    style={{
                      width: '18rem'
                    }}
                  >
                    <CardHeader>
                     { meeting.status}
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h5">
                        {meeting.meetingName}
                      </CardTitle>
                      <CardText>
                       {meeting.description}
                       
                      </CardText>
                      
                      <Button name='accepted' style={{marginLeft:100}} color="success"  outline size="sm"
                      onClick={()=>updateStatus('accepted',meeting._id)}
                      >Accepted</Button>
                       {'  '} 
                      <Button  name='rejected'    color="danger"  outline size="sm"
                      onClick={()=>updateStatus('rejected',meeting._id)}
                      >Rejected</Button>
                      
                    </CardBody>
                   
                  </Card>
                )
            })
    }
   }


  return (
    <>
    <br></br>
    <div className='container'  style={{marginLeft:50,marginRight:50}}>
        <div className='row'>
            <div className='col-4' style={{paddingLeft:80}}>
                <h3 style={{paddingLeft:20,paddingBottom:10}} >My Meetings List</h3>
           { showMeetingData()}
            </div>
            <div className='col-4' style={{paddingLeft:120}}>
            <h3 style={{paddingLeft:40,paddingBottom:10}}>Invitation List</h3>
               {showInvitessData()}
            </div>
            <div className='col-4' style={{paddingLeft:180}}>
                <h4 style={{paddingLeft:20,paddingBottom:10}} >Create New Meeting</h4>
                { showMeetingData()}
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Home
