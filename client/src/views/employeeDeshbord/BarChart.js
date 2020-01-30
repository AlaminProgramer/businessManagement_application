import React, { Component } from "react";
import Chart from "react-apexcharts";
import decoder from 'jwt-decode'
import axios from 'axios'


class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Facebook", "Google","YouTube", "Linkdin", "Twitter", "Instagram", "Local",  "Other"]
        }
      },
      series: []
    };
  }
  componentDidMount(){
    let decoded = decoder(localStorage.getItem('superToken'))
    
      axios.get('/api/social/'+decoded._id)
      .then(data=>{
        let facebok=data.data.facebook,
          Google=data.data.google,
          youTube=data.data.youTube,
          linkdin=data.data.linkdin,
          twitter=data.data.twitter,
          instagram=data.data.instagram,
          local=data.data.local,
          other=data.data.other
          console.log(facebok,Google, youTube, linkdin, twitter, instagram, local, other)

          // {
          //   name: "series-1",
          //   data: [0 , 0 ,2 ,0,3,10,0,0]
          // }
          let arr=[{
            name:"Data",
            data:[facebok,Google, youTube, linkdin, twitter, instagram, local, other]
          }]
        
            this.setState({
              series:arr
            })
            console.log(this.state)
      })
      .catch(err=>{
        console.log(err)
      })
      console.log(this.state)

  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;