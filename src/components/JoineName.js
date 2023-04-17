import React, { useState } from 'react'
import { DropdownItem,DropdownToggle,ButtonDropdown
    , DropdownMenu} from 'reactstrap'

const JoineName = (props) => {

    console.log("props user ",props.user,props.userId)
   
    let [dropdownOpen, setOpen] = useState(false);

  return (
    <div>
       <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
                isOpen={dropdownOpen}>
                <DropdownToggle className="bg-primary" caret>
                    Joined Users
                </DropdownToggle>
                <DropdownMenu>
               
                   {props.user.map((user)=>props.userId.includes(user._id)?
                   
                    <DropdownItem >
                   {user.fname}
                  
                 </DropdownItem> :null
                   )}
                   {/* {props.userId.map(data=>data.includes(porps.user) )} */}
                    
                </DropdownMenu>
            </ButtonDropdown>
    </div>
  )
}

export default JoineName
