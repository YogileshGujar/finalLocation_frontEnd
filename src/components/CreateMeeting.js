import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Button,Form, Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input,DropdownItem,DropdownToggle,ButtonDropdown
   , DropdownMenu,Card,CardHeader,CardBody,CardTitle,CardText} from 'reactstrap'
const CreateMeeting = () => {

 let [isCreateMeetingOpen,setisCreateMeetingOpen]=useState(false);
 let [User,setUser]=useState([]);
 let [dropdownOpen, setOpen] = React.useState(false);
 let [selectedUsers, setSelectedUsers] = useState([]);
 const [isChecked, setIsChecked] = useState(false);

 let localId=localStorage.getItem('userId');
 let localToken=localStorage.getItem('token');

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked);
};
 

 let [Meeting,setMeeting]=useState({
    meetingName:"",
    description:"",
    RequesterId:localId,
    ReceiverIds:[]
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
console.log("user meeting data",User)

let SubmitMeeting= async ()=>{
     
    // let selectedUserIds = selectedUsers.map((userId) => userId);

  setMeeting({ ...Meeting,ReceiverIds: selectedUsers})

//    let receiverIds=Meeting.ReceiverIds.split(',')
console.log("user meeting data2",Meeting.ReceiverIds)

   let createdata={
    meetingName:Meeting.meetingName,
    description:Meeting.description,
    requesterId:Meeting.RequesterId,
    receiverIds:selectedUsers
   }
   let header={
    Authorization:localToken
   }

   try{
    let MeetingData= await axios.post("http://localhost:5000/api/createMeeting",createdata,
    {
      headers:header
    });
    console.log(MeetingData);

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
            <ModalHeader toggle={toggleCreateMeetingModal}>Create Blog</ModalHeader>
            <ModalBody>
             <Form>
             <FormGroup>
                <Label for="examplePassword">Title</Label>
                <Input
                  id="TimeetingNametle"
                  name="meetingName"
                  placeholder="Enter MeetingName"
                  type="text"
                  onChange={handleChange}
               
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Content</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Entar Description"
                  type="text"
                  onChange={handleChange}
              
                />
              </FormGroup>
              <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                isOpen={dropdownOpen}>
                <DropdownToggle className="bg-primary" caret>
                    Sample Button Dropdown
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
              <Button color="primary" 
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
