import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import "../../assets/tourguide.js/tourguide.css";
import Tourguide from "../../assets/tourguide.js/tourguide.esm.js";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  startTour() {

    console.log("in startTour()", Tourguide);
    var tourguide = new Tourguide({
      "id": "tourguideintro",
        "name": " TourGuide Introduction",
        "autorun": true,
      "steps": [
        {
          "selector": "[data-component=content]",
          "step": 1,
          "title": "Lets take a moment to get the look and feel of Tourguide.js",
          "content": "Click <kbd>&gt;</kbd> button to advance to the next step of this tour.<br/>To stop this tour at any time click <kbd>×</kbd> button in the top-right corner.",
          "image": ""
        },
        {
          "selector": "[data-component=Data-Capacity]",
          "step": 2,
          "title": "This is Capacity Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Data-Revenue]",
          "step": 3,
          "title": "This is Revenue Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Data-Errors]",
          "step": 4,
          "title": "This is Errors Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Data-Followers]",
          "step": 5,
          "title": "This is Followers Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Users-Behavior]",
          "step": 6,
          "title": "This is Users Behavior Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Email-Statistics]",
          "step": 7,
          "title": "This is Email Statistics Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Year-Sales]",
          "step": 8,
          "title": "This is 2014-Year Sales Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=Tasks]",
          "step": 9,
          "title": "This is Tasks Block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        }
      ]
    });
    tourguide.start();
  }

  render() {
    return (
      <div className="content">
        <button style={{background: 'lightseagreen',
    border: 'none',
    position: 'relative',
    left: '15px',
    bottom: '14px',
    height: '30px'}} onClick={this.startTour}>Click this button to start Tourguide.js demo</button>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6} data-component="intro">
            <div data-component="Data-Capacity">
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </div>
            </Col>
            <Col lg={3} sm={6}>
            <div data-component="Data-Revenue">
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
              </div>
            </Col>
            <Col lg={3} sm={6}>
            <div data-component="Data-Errors">
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
              </div>
            </Col>
            <Col lg={3} sm={6}>
            <div data-component="Data-Followers">
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
            <div data-component="Users-Behavior">
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
              </div>
            </Col>
            <Col md={4}>
            <div data-component="Email-Statistics">
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
            <div data-component="Year-Sales">
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
              </div>
            </Col>

            <Col md={6}>
            <div data-component="Tasks">
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
