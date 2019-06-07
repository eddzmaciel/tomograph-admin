import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
   Button,
   Card,
   CardBody,
   CardGroup,
   Col,
   Container,
   Form,
   Input,
   InputGroup,
   InputGroupAddon,
   InputGroupText,
   Row,
   Alert
} from 'reactstrap';
import feathers from '../../../feathers';
import auth from '../../../auth';
import Logo_gray from '../../../../src/assets/img/brand/mibazarWhite.png';
import './Login.css';

class Login extends Component {
   state = {
      loging: false,
      logingText: 'Ingresar',
      email: '',
      password: '',
      error: false,
      errorMessage: 'Error',
      viewReset: false,
      passwordChange1: '',
      passwordChange2: ''
   };

   async componentWillMount() {}

   onChange = (name, value) => {
      this.setState({
         [name]: value
      });
   };

   login = async e => {
      e.preventDefault();
      this.setState({
         loging: true,
         logingText: 'Ingresando...'
      });

      let isReset = await feathers.service('is-user-reset').find({
         query: {
            user: this.state.email,
            password: this.state.password
         }
      });

      console.log('isReset', isReset);

      try {
         if (isReset) {
            //isReset
            this.setState({
               viewReset: true,
               error: false,
               errorMessage: ''
            });
         } else {
            await auth.login(this.state.email, this.state.password);
         }
      } catch (err) {
         console.log('err', err.message);
         if (err.message == 'Missing credentials') {
            this.setState({
               error: true,
               errorMessage: 'No capturaste las claves',
               loging: false,
               logingText: 'Ingresar'
            });
         }
         if (err.message == 'Invalid login') {
            this.setState({
               error: true,
               errorMessage: 'Correo o contraseña incorrectas',
               loging: false,
               logingText: 'Ingresar'
            });
         }
         if (err.message == 'Authentication timed out') {
            this.setState({
               error: true,
               errorMessage: 'Error',
               loging: false,
               logingText: 'Ingresar'
            });
         }
      }
   };

   changePassword = async () => {
      if (this.state.passwordChange1 === this.state.passwordChange2) {
         let changePassword = await feathers.service('is-user-reset').create({
            user: this.state.email,
            password: this.state.passwordChange1
         });
         alert('Contraseña cambiada, reingrese nuevamente.');
         this.setState({
            viewReset: false,
            email: '',
            password: '',
            passwordChange1: '',
            passwordChange2: '',
            loging: false,
            logingText: 'Ingresar'
         });
         console.log('Cambio Password', changePassword);
      } else {
         alert('Las contraseñas no son iguales');
      }
   };

   render() {
      return (
         <div className="app flex-row align-items-center">
            <Container>
               <Row className="justify-content-center ">
                  <Col md="8">
                     <CardGroup>
                        <Card className="p-4">
                           <CardBody>
                              <Form onSubmit={this.login}>
                                 <div>
                                    {this.state.viewReset ? (
                                       <div>
                                          <h1>Cambiar password</h1>

                                          <p className="text-muted">
                                             Cambia el password con alguno que
                                             recuerdes
                                          </p>
                                          {this.state.error ? (
                                             <Row>
                                                <Col md={12}>
                                                   <Alert color="danger">
                                                      {this.state.errorMessage}
                                                   </Alert>
                                                </Col>
                                             </Row>
                                          ) : null}
                                          <InputGroup className="mb-3">
                                             <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                   <i className="icon-lock" />
                                                </InputGroupText>
                                             </InputGroupAddon>
                                             <Input
                                                type="text"
                                                placeholder="Contraseña"
                                                autoComplete="username"
                                                value={
                                                   this.state.passwordChange1
                                                }
                                                onChange={event => {
                                                   this.onChange(
                                                      'passwordChange1',
                                                      event.target.value
                                                   );
                                                }}
                                             />
                                          </InputGroup>
                                          <InputGroup className="mb-4">
                                             <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                   <i className="icon-lock" />
                                                </InputGroupText>
                                             </InputGroupAddon>
                                             <Input
                                                type="password"
                                                placeholder="Repite contraseña"
                                                autoComplete="current-password"
                                                value={
                                                   this.state.passwordChange2
                                                }
                                                onChange={event => {
                                                   this.onChange(
                                                      'passwordChange2',
                                                      event.target.value
                                                   );
                                                }}
                                             />
                                          </InputGroup>

                                          <Row>
                                             <Col xs="6">
                                                <Button
                                                   color="primary"
                                                   className="px-4"
                                                   onClick={this.changePassword}
                                                >
                                                   Cambiar password
                                                </Button>
                                             </Col>
                                          </Row>
                                       </div>
                                    ) : (
                                       <div>
                                          <h1>Ingresar</h1>

                                          <p className="text-muted">
                                             Captura los datos correctos
                                          </p>
                                          {this.state.error ? (
                                             <Row>
                                                <Col md={12}>
                                                   <Alert color="danger">
                                                      {this.state.errorMessage}
                                                   </Alert>
                                                </Col>
                                             </Row>
                                          ) : null}
                                          <InputGroup className="mb-3">
                                             <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                   <i className="icon-user" />
                                                </InputGroupText>
                                             </InputGroupAddon>
                                             <Input
                                                type="text"
                                                placeholder="Usuario"
                                                autoComplete="username"
                                                value={this.state.email}
                                                onChange={event => {
                                                   this.onChange(
                                                      'email',
                                                      event.target.value
                                                   );
                                                }}
                                             />
                                          </InputGroup>
                                          <InputGroup className="mb-4">
                                             <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                   <i className="icon-lock" />
                                                </InputGroupText>
                                             </InputGroupAddon>
                                             <Input
                                                type="password"
                                                placeholder="Contraseña"
                                                autoComplete="current-password"
                                                value={this.state.password}
                                                onChange={event => {
                                                   this.onChange(
                                                      'password',
                                                      event.target.value
                                                   );
                                                }}
                                             />
                                          </InputGroup>

                                          <Row>
                                             <Col xs="6">
                                                <Button
                                                   color="primary"
                                                   className="px-4"
                                                   onClick={this.login}
                                                   disabled={this.state.loging}
                                                >
                                                   {this.state.logingText}
                                                </Button>
                                                <input
                                                   type="submit"
                                                   style={{
                                                      display: 'none'
                                                   }}
                                                />
                                             </Col>
                                          </Row>
                                       </div>
                                    )}
                                 </div>
                              </Form>
                           </CardBody>
                        </Card>
                        <Card
                           className="text-white bg-primary py-5 d-md-down-none"
                           style={{ width: '44%' }}
                        >
                           <CardBody className="text-center">
                              <div>
                                 <img
                                    src={Logo_gray}
                                    className="Logo"
                                    width="200px"
                                 />
                              </div>
                           </CardBody>
                        </Card>
                     </CardGroup>
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default Login;
