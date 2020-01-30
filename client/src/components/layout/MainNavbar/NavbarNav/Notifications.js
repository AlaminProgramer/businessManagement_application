import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import axios from 'axios'
import decoder from 'jwt-decode'
import { Link } from "react-router-dom";
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      todayFollowUp:[],
      todayFollowUpCount:'',
      notificationText:[]
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }
  componentDidMount =(req, res)=>{
    
    axios.get('/api/todayFollowUp/'+decoder(window.localStorage.getItem('superToken'))._id)
    .then(data=>{      this.setState({todayFollowUp:data.data.todayFollowUp})

    })
    .catch(err=>{
      console.log(err)
    })
    setTimeout(() => {
      let count =0
      let t=[]      
      let todaydate= new Date().getDate()
      this.state.todayFollowUp.forEach(item=>{
        count=count+1        
        if(count<3){
          t.push(item)
        }
      })
      if(count>0){
        
        this.setState({
          todayFollowUpCount:count,
          notificationText:t
        })
      }
      if(todaydate==localStorage.getItem('today')){

        this.setState({todayFollowUpCount:''})
      }
    }, 300);



  }
  toggleNotifications(event) {
    this.setState({
      visible: !this.state.visible
    });
    this.toggle()
  }

  toggle=()=>{
    let done ="done"
    let today=new  Date().getDate()
    this.setState({
      todayFollowUpCount:''
    })

    
    localStorage.setItem('followupCount', done)

    localStorage.setItem('today', today)
    // if
    // if(today==localStorage.getItem(today)){

    // }
  }
  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              {this.state.todayFollowUpCount}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
            {this.state.notificationText.map(single=>{
              return (
                <DropdownItem>
                  <div className="notification__icon-wrapper">
                    <div className="notification__icon">
                      <i className="material-icons">&#xE8D1;</i>
                    </div>
                  </div>
                  <div className="notification__content">
                    <span className="notification__category"> {single.name} </span>
                    <p>
                    {single.description}
                    </p>
                  </div>
                </DropdownItem>
              )
            })}
          <DropdownItem className="notification__all text-center">
            <Link  to="/todayfollowup"onClick={this.toggleNotifications} > {this.state.todayFollowUpCount?
            "View  all Follow Up For Today"
            :'No Notification '
            } </Link>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
