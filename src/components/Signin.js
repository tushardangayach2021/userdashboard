import React, { useEffect, useState } from 'react'
import {
    Button,
    Label,
    FormGroup,
    FormText
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Signin(props) {
//   const a =1;

    // useEffect(() => {
    //     console.log("checkUserLogin",props.checkUserLogin())
    //   }, [a])
    const [showPassword, setShowPassword]=useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        // add case
        let data = {
            email: e.target['email'].value,
            password: e.target['password'].value,
        }
        console.log(data)
        // add case
        console.log(props.signinUser(data))
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email format must be correct")
            .required("Email is required."),
        password: Yup.string()
            .min(3, "Password must be 3 length minimum.")
            .required("Password is required.")
            .matches(
                /^[a-z0-9]+$/i,
                "Must Be Alphumeric."
              )
    })
    const {t} = useTranslation();

    if (!props.isUserLogin) {
        window.location.href = 'http://localhost:3001/signin/?href='+"http://localhost:3000"; 
        return null;
        return (
            <div className="container" >
                <div className="row row-content">
                    <div className="col-12" >
                        <h3 className='text-center'>{t('signin.heading')} </h3>
                    </div>
                    <div className="col-md-2" ></div>
                    <div className="col-12 col-md-8" >
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values => {
                                console.log(values);
                                alert("Form submit done.")
                            })}
                            validationSchema={LoginSchema}
                        >
                            {({ touched, errors, values }) =>
                            (
                                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                                    <FormGroup>
                                        <Label for="exampleEmail">{t('dashboard.feilds.email')}</Label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="exampleEmail"
                                            autoComplete="off"
                                            placeholder="example@example.com"
                                            className={`form-control mt-1 ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                        {/* <FormText>Your username is most likely your email.</FormText> */}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">{t('dashboard.feilds.password')}</Label>
                                        <Field
                                            type={!showPassword?"password":"text"}
                                            name="password"
                                            id="examplePassword"
                                            placeholder="********"
                                            className={`form-control mt-1 ${touched.password && errors.password ? "is-invalid" : ""}`}
                                        />
                                        <i className={showPassword?'fa fa-eye position-absolute':"fa fa-eye-slash position-absolute"} style={{top: '8.5rem', right: '1.2rem'}} onClick={()=>setShowPassword(!showPassword)}/>
                                        <ErrorMessage
                                            component="div"
                                            name="password"
                                            className="invalid-feedback"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormText>
                                            {t('signin.formtext.firstportion')}<Link to="/signup">{t('signup.heading')}</Link> {t('signin.formtext.lastportion')}
                                        </FormText>
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>)}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/" />
    }
}
