import currentUser  from '../../src/views/common/currentuser'


export default function() {
  
  if(currentUser==="admin"){
    return[
      {
        title: "All Business User ",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/allbusinessuser",
      }
    ]
  }
  
  if(currentUser==="Business User"){
    return[
      {
        title: "All Employee",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/allemployee",
      },
      {
        title: "Add Employee",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/addemployee",
      },
    ]
  }
  if(currentUser==="employee"){
  
    return [
      {
        title: "Today's Enquiry ",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/todayenquiry",
      },
      {
        title: "Completed Enquiry",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/completedenquiry",
      },
      {
        title: "Today's Follow up",
        htmlBefore: '<i class="material-icons">person_pin      </i>',
        to: "/todayfollowup",
      },
      {
        title: "Panding Follow Up",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/pandingfollowup",
      },
      {
        title: "All Client",
        htmlBefore: '<i class="material-icons">person_pin      </i>',
        to: "/allClient",
      },
      {
        title: "Add client  ",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/addclient",
      },
      {
        title: "Lead information ",
        htmlBefore: '<i class="material-icons">snooze  </i>',
        to: "/leadinfo",
      },
      {
        title: "Profile",
        htmlBefore: '<i class="material-icons">person_pin      </i>',
        to: "/profile",
      }
      
    ];
  }

}
