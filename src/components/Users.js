import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { useTranslation } from 'react-i18next';

export default function Users(props) {
  // useEffect(() => {
  //   console.log("checkUserLogin",props.checkUserLogin())
  // }, [])
  const [isOpen, setisOpen] = useState(false)
  const {t} = useTranslation();
  const url = window.location.href.split('/')[window.location.href.split.length-1]
  const toggle = () => {
    setisOpen(!isOpen)
  }
  const changeLanguage = code => e => {
    localStorage.setItem('language', code);
    window.location.reload();
  }
  // alert(props.isUserLogin)

  if (props.isUserLogin) {
    alert(props.isUserLogin)
    return (
      <>
      {console.log("props",props.loginedUser)}
        {console.log(props.isUserLogin, props.loginedUser)}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">{t('dashboard.nav.title')}</NavbarBrand>
          <NavbarToggler onClick={() => toggle()} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                {t('dashboard.nav.dropdownone.title')}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={()=> props.signoutUser()}>
                    {t('dashboard.nav.dropdownone.item1')}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/signup">{t('dashboard.nav.dropdownone.item2')}</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {t('dashboard.nav.dropdowntwo.title')}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={changeLanguage('en')}>
                    {t('dashboard.languages.english')}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem  onClick={changeLanguage('fr')}>
                    {t('dashboard.languages.french')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12 col-lg-12">
              <h1 className="text-center">{t('dashboard.heading')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-left card">
              <div className="row">
                <div className="col-3 font-weight-bold">
                  {t('dashboard.feilds.firstname')}
                </div>
                <div className="col-9">
                  {props.loginedUser.firstname}
                </div>
              </div>
              <div className="row">

                <div className="col-3 font-weight-bold">
                  {t('dashboard.feilds.lastname')}
                </div>
                <div className="col-9">
                  {props.loginedUser.lastname}
                </div>
              </div>
              <div className="row">
                <div className="col-3 font-weight-bold">
                  {t('dashboard.feilds.email')}
                </div>
                <div className="col-9">
                {props.loginedUser.email}
                </div>
              </div>
              <div className="row">
                <div className="col-3 font-weight-bold">
                  {t('dashboard.feilds.dob')}
                </div>
                <div className="col-9">
                  {props.loginedUser.dob}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  } 
  else {
    // alert(props.isUserLogin)
    return <Redirect to="/signin" />
  }
}
