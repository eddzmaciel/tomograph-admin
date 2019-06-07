import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
   Button,
   ButtonGroup,
   ButtonToolbar,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   CardTitle,
   Col,
   Row,
   Table
} from 'reactstrap';

class Dashboard extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: true
      };
   }

   async componentWillMount() {}

   render() {
      return (
         <div className="animated fadeIn">
            <Row>
               <Col xs="12" lg="12">
                  <Card>
                     <CardBody>
                        <Row>
                           <Col md={12}>
                              <h4 style={{ color: '#269D9F', fontSize: 30 }}>
                                 Bienvenidos..
                              </h4>
                           </Col>
                        </Row>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default Dashboard;
