import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from 'axios'
import decoder from 'jwt-decode'
class PieChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        woneValue:'',
        lossValue:''

      
      
      };
    }

  componentDidMount(){
    let decoded = decoder(localStorage.getItem('superToken'))
      // lead wone getting
      axios.get('/api/getWoneValue/'+decoded._id)
      .then(data=>{
        console.log(data.data)
        this.setState({woneValue:data.data.woneValue})
      })
      .catch(err=>{
        console.log(err)
      })
      // get loss count
      axios.get('/api/getLossValue/'+decoded._id)
      .then(data=>{
        console.log(data.data)
        this.setState({lossValue:data.data.lossValue})
      })
      .catch(err=>{
        console.log(err)
      })
      console.log(this.state)
    
      // if(this.state.woneValue<0 && this.state.lossValue<=0){
      //   setInterval(() => {
          
      //   this.setState({ series: [50 , 50] })
      //   }, 1200);
      //   return
      // }
      let limit =10
      let set =setInterval(() => {
        
        let wp=this.state.woneValue/(this.state.woneValue+this.state.lossValue)*100
        let lp=this.state.lossValue/(this.state.woneValue+this.state.lossValue)*100
        this.setState({ series: [wp , lp] })
        limit++
        if(limit==100){
          clearInterval(set)
        }
      }, 300);

      // setInterval(() => {
      //   if(this.state.woneValue<=0 && this.state.lossValue<=0){
      //     this.setState({ series: [wp , lp] })

      //   }
      // }, 1200);
  }
  

  getp=()=>{
    console.log(this.state)
  }
  

    render() {
      return (
        

            <div id="chart">
              {console.log(this.getp())}
              {console.log(this.state)}
                <Chart options={this.state.options} series={this.state.series} type="donut" />
            </div>


      );
    }
  }
  export default PieChart