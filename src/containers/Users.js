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
import localStorageService from "../api/localStorageService";

export default function Users(props) {
  const user_id = window.location.href.split('user_id=')[1]
  localStorageService.setUserId(user_id)
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [loginedUser, setUserLogin] = useState(false)
  const [isOpen, setisOpen] = useState(false)
  const { t } = useTranslation();
  const url = window.location.href.split('/')[window.location.href.split.length - 1]
  const toggle = () => {
    setisOpen(!isOpen)
  }
  const changeLanguage = code => e => {
    localStorage.setItem('language', code);
    window.location.reload();
  }
  // alert(props.isUserLogin)
  useEffect(async () => {
    // alert(user_id)
    try {
      let det = await props.checkUserLogin();
      console.log(det);
      console.log("det.userLogin", det.isUserLogin, det.userLogin)
      setIsUserLogin(det.isUserLogin);
      setUserLogin(det.userLogin);
      if (det.isUserLogin !== 1) {
        window.location.href = 'http://localhost:3001/signin/?href=' + "http://localhost:3000/dashboard/user";
      }
    }
    catch {
      window.location.href = 'http://localhost:3001/signin/?href=' + "http://localhost:3000/dashboard/user";

      console.log("Issue in checkUserLogin")
    }
  }, [user_id, isUserLogin])
  // if (isUserLogin===1) {
  // alert(isUserLogin)
  return (
    <>
      {/* {console.log("props",props.loginedUser)} */}
      {/* {console.log(props.isUserLogin, props.loginedUser)} */}
      {/* <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{t('dashboard.nav.title')}</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {t('dashboard.nav.dropdownone.title')}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => {
                  props.signoutUser();
                  setIsUserLogin(0);

                }}>
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
                <DropdownItem onClick={changeLanguage('fr')}>
                  {t('dashboard.languages.french')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar> */}
      <div className="container mt-5 pt-5">
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
                {loginedUser.firstname}
              </div>
            </div>
            <div className="row">

              <div className="col-3 font-weight-bold">
                {t('dashboard.feilds.lastname')}
              </div>
              <div className="col-9">
                {loginedUser.lastname}
              </div>
            </div>
            <div className="row">
              <div className="col-3 font-weight-bold">
                {t('dashboard.feilds.email')}
              </div>
              <div className="col-9">
                {loginedUser.email}
              </div>
            </div>
            <div className="row">
              <div className="col-3 font-weight-bold">
                {t('dashboard.feilds.dob')}
              </div>
              <div className="col-9">
                {loginedUser.dob}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
//   else {
//     alert(isUserLogin)
//     return <Redirect to="/signin" />
//   }
// }
