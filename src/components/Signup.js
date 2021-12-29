import React, { useState } from 'react'
import {
    Button,
    Label,
    FormGroup,
    FormText
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Signup(props) {
    const handleSubmit = (values) => {
        // console.log(values)
        // add case
        console.log("hendel call", props.signupUser(values))
    };
    const { t } = useTranslation();
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('formfield.validationerrors.format.email'))
            .required(t('dashboard.feilds.email').concat(t('formfield.validationerrors.required'))),
        password: Yup.string()
            .min(3, t('formfield.validationerrors.min.password'))
            .required(t('dashboard.feilds.password').concat(t('formfield.validationerrors.required')))
            .matches(
                /^[a-z0-9]+$/i,
                t('formfield.validationerrors.format.password')
            ),
        firstname: Yup.string()
            .required(t('dashboard.feilds.firstname').concat(t('formfield.validationerrors.required')))
            .matches(
                /^[A-Z]{1}[a-z]{5,15}$/,
                t('formfield.validationerrors.format.fisrtnamelastname')
            ),
        lastname: Yup.string()
            .required(t('dashboard.feilds.lastname').concat(t('formfield.validationerrors.required')))
            .matches(
                /^[A-Z]{1}[a-z]{5,15}$/,
                t('formfield.validationerrors.format.fisrtnamelastname')
            )
            .notOneOf([Yup.ref('firstname')], t('dashboard.feilds.lastname').concat(t('formfield.validationerrors.notsame')).concat(t('dashboard.feilds.firstname')).concat(".")),
        dob: Yup.string()
            .required(t('dashboard.feilds.dob').concat(t('formfield.validationerrors.required')))
    })
    return (
        <div className="container" >
            <div className="row row-content">
                <div className="col-12" >
                    <h3 className='text-center'>{t('signup.heading')}</h3>
                </div>
                <div className="col-md-2"></div>

                <div className="col-12 col-md-8" >
                    <Formik
                        initialValues={{ email: '', password: '', firstname: '', lastname: '', dob: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log(values)
                            handleSubmit(values);
                        }
                        }
                    >{
                            ({ values, touched, errors, isSubmitting }) =>
                                !isSubmitting ? (
                                    <Form className="form">
                                        <FormGroup>
                                            <Label>{t('dashboard.feilds.firstname')}</Label>
                                            <Field
                                                type="text"
                                                name="firstname"
                                                id="exampleFirstName"
                                                placeholder="Enter your first name"
                                                className={`form-control mt-1 ${touched.firstname && errors.firstname ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="firstname"
                                                className="invalid-feedback"
                                            />
                                            {/* <FormText>Your username is most likely your email.</FormText> */}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplelastname">{t('dashboard.feilds.lastname')}</Label>
                                            <Field
                                                type="text"
                                                name="lastname"
                                                id="examplelastname"
                                                placeholder="Enter Last Name"
                                                className={`form-control mt-1 ${touched.lastname && errors.lastname ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="lastname"
                                                className="invalid-feedback"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">{t('dashboard.feilds.email')}</Label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="exampleEmail"
                                                placeholder="example@example.com"
                                                className={`form-control mt-1 ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                autocomplete="off"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="email"
                                                className="invalid-feedback"
                                            />
                                            {/* <FormText>Your username is most likely your email.</FormText> */}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampledob">{t('dashboard.feilds.dob')}</Label>
                                            <Field
                                                type="date"
                                                name="dob"
                                                id="exampledob"
                                                className="form-control mt-1"
                                                className={`form-control mt-1 ${touched.email && errors.email ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="dob"
                                                className="invalid-feedback"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword">{t('dashboard.feilds.password')}</Label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="examplePassword"
                                                placeholder="********"
                                                className={`form-control mt-1 ${touched.password && errors.password ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="password"
                                                className="invalid-feedback"
                                            />
                                        </FormGroup>
                                        <FormGroup>

                                            {!props.isUserLogin ? (<FormText>{t('signup.formtext.signinout')} <Link to="/signin">{t('signin.heading')}</Link> {t('signin.formtext.lastportion')}</FormText>) : (<FormText>{t('signup.formtext.signined')} <Link to="/signin">{t('dashboard.nav.title')}</Link></FormText>)}

                                        </FormGroup>
                                        <Button>Submit</Button>
                                    </Form>
                                ) : (
                                    <div>
                                        <h1 className="p-3 mt-5">SignUp Success!{t('signup.heading')}</h1>

                                        <div className="alert alert-success mt-3">
                                            Thank for signup. Now, You can do your{t('signup.heading')} <Link to="/signin">signin{t('signup.heading')}</Link> to <strong>User Dashboard</strong>. Here, below what you have field.
                                        </div>
                                        <ul className="list-group">
                                            <li className="list-group-item">Firstname: {values.firstname}</li>
                                            <li className="list-group-item">Lastname: {values.lastname}</li>
                                            <li className="list-group-item">Email: {values.email}</li>
                                            <li className="list-group-item">
                                                Password: {values.password}
                                            </li>
                                        </ul>
                                        <p className='pl-3'><small>Also, You can <Link to="/signup">signup</Link> new user!</small></p>
                                    </div>
                                )
                        }
                    </Formik>

                </div>
            </div>
        </div>
    )
}
