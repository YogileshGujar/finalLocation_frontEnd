
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card,CardHeader,CardBody,CardTitle,CardText, Button } from 'reactstrap'
import CreateMeeting from './CreateMeeting';
import ForJoine from './ForJoine';
import UpdateMeetingData from './UpdateMeetingData';

const Home = () => {

    let[allMeetingData,setallMeetingData]=useState([])
    let[allUserData,setallUserData]=useState([]);
    let[allinvitesData,setallinvitesdata]=useState([]);

    let localId=localStorage.getItem('userId');
    let localToken=localStorage.getItem('token');
   

      
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
                  console.log("User data ",userData.data)
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

  let dataForLocation=(creater,joinds)=>{
      console.log('dataForLocation data from meeting map ',creater,joinds);
      let joinduserIds=[];
      joinduserIds=[creater, ...joinds];
      console.log('dataForLocation data from meeting map array ',joinduserIds);
      let userfilterData =allUserData.filter((data)=>joinduserIds.includes(data._id));
      console.log('dataForLocation data from meeting map array of users ',userfilterData);

  }
 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
   let showMeetingData= () =>{
   
    if(!allMeetingData){
        <h3>No Meeting Dta found</h3>
    }else{
        return allMeetingData.filter(
            (data)=>{
                if(data.requesterId===localId || data.receiverIds.includes(localId)){
                    return data;
                }
            }).map((meeting)=>{
               
                let requester=  allUserData.find((user)=>user._id === meeting.requesterId);
              
                let requesterName =requester ? requester.fname:"Unknown";
               
                let invited=  meeting.receiverIds.length;
                let invitess= allinvitesData.filter(data=>data.meetingId === meeting._id &&
                  data.status ==="accepted");
                  let invitescount=invitess.length;
                  console.log("count for joind user ",invitess);
                  let invitessreceiverId= invitess.map((data)=>data.receiverId);
                  if(invitescount>0){
                   
                    let locationData= dataForLocation(meeting.requesterId,invitessreceiverId);
                  }
               
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
                      ({requester ? requester.fname:"Unknown"})
                      </CardTitle>
                      <CardText>
                       {meeting.description}
                       {meeting.requesterId===localId ? <span> ( You)</span> : null}
                      </CardText>
                      {/* <ForJoine user={allUserData}></ForJoine> */}
                     
                      {meeting.requesterId===localId ? <UpdateMeetingData meetingId={meeting._id} user={allUserData}
                      showMeetingData={showMeetingData}/> : null}
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
    receiverId:localId,
    status:event
   }
   let header={
    Authorization:localToken
   }
   try{
    let allMeetings=await axios.post("http://localhost:5000/api/updateMeeting",data,
    {
      headers:header
    });
      console.log("Status data ",allMeetings)
      
      
}catch(e){
    console.log("error...", e)
}

   }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////

   let showInvitessData= () =>{
   
    if(!allMeetingData){
        <h3>No Meeting Dta found</h3>
    }else{
        return allMeetingData.filter(
            (data)=>{
                if(data.receiverIds.includes(localId)){
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
               <CreateMeeting></CreateMeeting>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Home
