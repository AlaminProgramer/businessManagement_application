import React from "react";
import { Redirect } from "react-router-dom";
import currentUser  from './views/common/currentuser'
// Layout Types
import { DefaultLayout } from "./layouts";


import details from './views/employeeDeshbord/Details'
// admin view
import AllBusinessUser from './views/adminDeshbord/AllBusinessUser'  



// business user
import AllEmployee from './views/businessDeshbord/AllEmployee'
import AddEmployee from './views/businessDeshbord/AddEmployee'

// employee Views
 import TodayEnquiry  from './views/employeeDeshbord/TodayEnquiry'
 import TodayFollowup from './views/employeeDeshbord/TodayFollowup'
 import PandingFollowup from './views/employeeDeshbord/PandingFollowup'
 import CompletedEnquiry from './views/employeeDeshbord/CompletedEnquiry'
 import AllClient from './views/employeeDeshbord/AllClient'
 import AddClient from "./views/employeeDeshbord/AddClient";
 import LeadInfo from './views/employeeDeshbord/LeadInfo'


//  common
import Profile from './views/common/Profile' 

 
const  selectRoute=()=>{
  if(currentUser=="Business User"){
    return[
      {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/allemployee" />
      },
      {
        path:'/allemployee',
        layout:DefaultLayout ,
        component : AllEmployee
      },
      {
        path:'/addemployee',
        layout:DefaultLayout ,
        component : AddEmployee
      },
      
      {
        path:'/profile',
        layout:DefaultLayout ,
        component : Profile
      },

    ]
  }
  if(currentUser==="employee"){
    return [
            {
              path: "/",
              exact: true,
              layout: DefaultLayout,
              component: () => <Redirect to="/leadinfo" />
            },
            {
              path:'/todayEnquiry',
              layout:DefaultLayout ,
              component : TodayEnquiry
            },
            {
              path:'/completedenquiry',
              layout:DefaultLayout,
              component:CompletedEnquiry
            },
            {
              path:'/todayfollowup',
              layout:DefaultLayout,
              component:TodayFollowup
            } ,
            {
              path:'/PandingFollowup',
              layout:DefaultLayout,
              component:PandingFollowup
            },
            {
              path:'/allClient',
              layout:DefaultLayout,
              component:AllClient
            },
            {
              path:'/addclient',
              layout:DefaultLayout,
              component:AddClient
            },
            {
              path:'/leadinfo',
              layout:DefaultLayout,
              component:LeadInfo
            },
            {
              path:'/profile',
              layout:DefaultLayout,
              component:Profile
            },
            {
              path:'/details',
              layout:DefaultLayout,
              component:details
            }
        ];
    
  }
}
export default selectRoute()