import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
   Badge,
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   Nav,
   NavItem,
   NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';

import {
   AppAsideToggler,
   AppHeaderDropdown,
   AppNavbarBrand,
   AppSidebarToggler
} from '@coreui/react';
//TODO EDSON - ajustar la imagen IPCO-LOGO para que sea Responsive junto con el template
import logo from '../../assets/img/brand/mibazar-logo.png';
import sygnet from '../../assets/img/brand/mibazar.png';
import feathers from '../../feathers';
import auth from '../../auth';

const propTypes = {
   children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
   logout = async () => {
      await auth.logout();
   };
   render() {
      // eslint-disable-next-line
      const { children, ...attributes } = this.props;

      return (
         <React.Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
               full={{
                  src: logo,
                  width: 165,
                  height: 45,
                  alt: 'Mi Bazar Aida'
               }}
               minimized={{
                  src: sygnet,
                  width: 50,
                  height: 45,
                  alt: 'IPCO'
               }}
            />
            <AppSidebarToggler className="d-md-down-none" display="lg" />

            <Nav className="ml-auto" navbar>
               <NavItem className="d-md-down-none">
                  <NavLink href="#">
                     <i className="icon-bell" />
                     <Badge pill color="danger">
                        5
                     </Badge>
                  </NavLink>
               </NavItem>
               <NavItem className="d-md-down-none" onClick={this.logout}>
                  <NavLink href="#">Salir</NavLink>
               </NavItem>
            </Nav>
            {/* <AppAsideToggler className="d-md-down-none" /> */}
            {/*<AppAsideToggler className="d-lg-none" mobile />*/}
         </React.Fragment>
      );
   }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
