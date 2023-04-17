import axios from 'axios';
import React, {useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button,Form, Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input,DropdownItem,DropdownToggle,ButtonDropdown
   , DropdownMenu,Card,CardHeader,CardBody,CardTitle,CardText} from 'reactstrap'
const CreateMeeting = (props) => {

 let [isCreateMeetingOpen,setisCreateMeetingOpen]=useState(false);

 let [User,setUser]=useState([]);

 let [dropdownOpen, setOpen] = useState(false);

 let [selectedUsers, setSelectedUsers] = useState([]);

 let [isChecked, setIsChecked] = useState(false);

 let [startDate, setStartDate] = useState(new Date());
//  let  [startTime, setStartTime] = useState('10:00');

 let [endDate, setEndDate] = useState(new Date());


 let localId=localStorage.getItem('userId');
 let localToken=localStorage.getItem('token');

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked);
  console.log("Chacked ",isChecked)
};

let  handleStartDateChange = (data)=>{
     setStartDate(data.getTime());
}
// let  handleStartTimeChange  =(time) =>{
//   setStartTime(time)
// }

let handleEndDateChange = (data)=>{
    setEndDate(data.getTime())
}

console.log("start time , end time input",startDate, "for end time ",endDate)
 

 let [Meeting,setMeeting]=useState({
    meetingName:"",
    description:"",
    RequesterId:localId,
    ReceiverIds:[],
 });

let handleUserSelection = (selectedUser) =>{

    if(selectedUsers.includes(selectedUser)){
        setSelectedUsers(selectedUsers.filter((user) => user !== selectedUser))
    }else{
        setSelectedUsers([...selectedUsers, selectedUser]);
    }
};
console.log("selected user data",selectedUsers)

 useEffect(()=>{
    let getUser= async ()=>{
        try{
            let userData=await axios.get("http://localhost:5000/api/getAllUsers")
              console.log("User data ",userData)
              setUser(userData.data)
              
        }catch(e){
            console.log("error...", e)
        }
    }
    getUser();
 },[])

 /////////////////////////////////////////////////////////////////////////////////////////

 let showUserData= () =>{
        
    if(!User){
        <h3>No Meeting Dta found</h3>
    }else{
        return User.map((user)=>{
                return(
                    <Card
                    className="my-2"
                    color="light"
                    style={{
                      width: '18rem'
                    }}
                  >
                    <CardHeader>
                     { user.fname}
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h5">
                        {user.phonNumber}
                      </CardTitle>
                      {/* <CardText>
                       {user.Location}
                       
                      </CardText> */}
                      
                    

                    </CardBody>
                   
                  </Card>
                )
            })
    }
}
 
////////////////////////////////////////////////////////////////////////////////////////


let toggleCreateMeetingModal= ()=>{
    setisCreateMeetingOpen(!isCreateMeetingOpen);
}

let handleChange=(e)=>{
   
    let {name,value}=e.target;
    setMeeting({...Meeting,[name]:value})
}

console.log("Meeting enter",Meeting)
// console.log("user meeting data",User)

let SubmitMeeting= async ()=>{
     
    // let selectedUserIds = selectedUsers.map((userId) => userId);

  setMeeting({ ...Meeting,ReceiverIds: selectedUsers})

//    let receiverIds=Meeting.ReceiverIds.split(',')
// console.log("user meeting data2",Meeting.ReceiverIds)

   let createdata={
    meetingName:Meeting.meetingName,
    description:Meeting.description,
    requesterId:Meeting.RequesterId,
    receiverIds:selectedUsers,
    startDateTime:startDate,
    endDateTime:endDate

   }
   let header={
    Authorization:localToken
   }
   console.log("for craete data  Asif",createdata);

   try{
    let MeetingData= await axios.post("http://localhost:5000/api/createMeeting",createdata,
    {
      headers:header
    });
    props.showMeetingData()
   

   }catch(e){
    console.log("Error :Meeting data Is not send..")
   }
   toggleCreateMeetingModal();
   
}



  return (
    <>
     <Button name='accepted' style={{marginLeft:50}} color="info"  
      onClick={toggleCreateMeetingModal} >Create New Meeting</Button>

<Modal isOpen={isCreateMeetingOpen} toggle={toggleCreateMeetingModal}>
            <ModalHeader toggle={toggleCreateMeetingModal}>Enter Meeting Info</ModalHeader>
            <ModalBody>
             <Form>
             <FormGroup>
                <Label for="examplePassword">Meeting Name</Label>
                <Input
                  id="TimeetingNametle"
                  name="meetingName"
                  placeholder="Enter MeetingName"
                  type="text"
                  onChange={handleChange}
               
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Meeting Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Entar Description"
                  type="text"
                  onChange={handleChange}
              
                />
              </FormGroup>

              <FormGroup>

                <div>
                <label color='bg-info' >Meeting Start Date:</label>
                <DatePicker              
                selected={Meeting.startDate}
                onChange={handleStartDateChange}               
                dateFormat="yyyy/MM/dd h:mm aa"
                />   
                {/* <label>Start Time:</label> 
                <TimePicker value={startTime}
                showTimeSelect
                  timeFormat='HH:mm'
                   onChange={handleStartTimeChange}
                   timeCaption='Time' 
                   timeIntervals={15}
                     />        */}
                </div>
                  
              </FormGroup>

              <FormGroup>
              <label>Meeting End Date:</label>
                <DatePicker
                
                selected={Meeting.endDate}
                onChange={handleEndDateChange}
                // showTimeSelect
                // timeFormat='HH:mm'
                // timeIntervals={15}
                dateFormat="yyyy/MM/dd h:mm aa"
                // timeCaption='Time'
                />              
              </FormGroup>
              <ButtonDropdown
               toggle={() => { setOpen(!dropdownOpen) }}
                isOpen={dropdownOpen}>
                <DropdownToggle className="bg-info" color='bg-dark' caret>
                    Invite your Frinds for Meeting
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem header>Select users</DropdownItem>
                   {User.map((user)=>(
                    <DropdownItem key={user.id} onClick={() => handleUserSelection(user._id)}>
                    <input type="checkbox" checked={selectedUsers.includes(user._id)}
                    onChange={handleCheckboxChange} />
                    {user.fname}
                  </DropdownItem>
                   ))}
                    
                </DropdownMenu>
            </ButtonDropdown>
             </Form>
            </ModalBody>
            <ModalFooter>
              <Button  className="bg-info" color="bg-info" 
              onClick={SubmitMeeting}
              >
                Submit
              </Button>
              <Button color="secondary" onClick={toggleCreateMeetingModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
         <br></br>
         <br></br>
         
         <h4  style={{paddingLeft:90,paddingBottom:10}}>All Users</h4>
        <div>
            {showUserData()}
        </div>

    </>
  )
}

export default CreateMeeting
