import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './RegistrationPage.css'

export default function RegistrationPage() {

    let [InputError, setInputError] = useState({})
    let [InputValue, setInputValue] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phoneNumber: "",
        checkBox: false
    })

    const HandleInputValue = (name, value) => {
        setInputValue({ ...InputValue, [name]: value })
        if (!!InputError[name])
            setInputError({ ...InputError, [name]: null })
    }

    // -----------------checking validation for each input--------------
    const ValidatedForm = () => {
        let { email, password, confirmPassword, fullName, phoneNumber, checkBox } = InputValue
        let newError = {}
        if (!email || !email.includes('@') || !email.includes('.') || email.length < 12)
            newError.email = 'Invalid email'
        if (!password || password === "")
            newError.password = 'Password required!'
        else if (password.length < 8)
            newError.password = 'password can not be less than 8 character'
        if (!confirmPassword || confirmPassword === " ")
            newError.confirmPassword = 'Confirm password required!'
        else if (confirmPassword !== password)
            newError.confirmPassword = 'Password not match'
        if (!fullName || fullName === "")
            newError.fullName = 'Full name required!'
        if (!phoneNumber || phoneNumber === " ")
            newError.phoneNumber = 'Phone number required!'
        else if (phoneNumber.length !== 10)
            newError.phoneNumber = 'Invalid Phone Number'
        if (checkBox === false)
            newError.checkBox = 'Check this box to proceed'
        return newError
    }

    // ----------------submit button----------------
    const navigate = useNavigate();
    const RegistrationFormSubmit = (e) => {
        e.preventDefault();
        let hasInputError = ValidatedForm();
        if (Object.keys(hasInputError).length > 0) {
            setInputError(hasInputError);
        }
        else {
            navigate('./displaychart')

        }
    }
    return (
        <div className='Container'>

            {/* --------------adding Image and text in left side----------------- */}
            <div className='container__leftSide'>
                <div className='container__leftSide__Image'>
                    <img width="100%" src="Image/frontImage.png" alt="websiteImage"></img>
                </div>
                <div className='container__leftSide__text' >
                    <h3>Choose the data Range</h3>
                    <p>Lorem Ipsum is simply dummy text <br />of the printing and type setting industry. </p>
                </div>
            </div>

            {/* ----------------------display registration form----------------------- */}
            <div className='container__rightSide'>
                <Form className='container__rightSide__registrationForm'>
                    <h1>Create an Account</h1>
                    <Form.Group>
                        <Form.Label>Your Email address</Form.Label>
                        <Form.Control
                            className="__registrationForm--inputStyle"
                            type="email"
                            value={InputValue.email}
                            isInvalid={!!InputError.email}
                            onChange={(e) => HandleInputValue('email', e.target.value)} />
                        <Form.Control.Feedback type="invalid">{InputError.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="__registrationForm--inputStyle"
                            type="password"
                            value={InputValue.password}
                            isInvalid={!!InputError.password}
                            onChange={(e) => HandleInputValue('password', e.target.value)} />
                        <Form.Control.Feedback type="invalid">{InputError.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm your password</Form.Label>
                        <Form.Control
                            className="__registrationForm--inputStyle"
                            type="password"
                            value={InputValue.confirmPassword}
                            isInvalid={!!InputError.confirmPassword}
                            onChange={(e) => HandleInputValue('confirmPassword', e.target.value)} />
                        <Form.Control.Feedback type="invalid">{InputError.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your full name</Form.Label>
                        <Form.Control
                            className="__registrationForm--inputStyle"
                            type="text"
                            value={InputValue.fullName}
                            isInvalid={!!InputError.fullName}
                            onChange={(e) => HandleInputValue('fullName', e.target.value)} />
                        <Form.Control.Feedback type="invalid">{InputError.fullName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your phone number</Form.Label>
                        <Form.Control
                            className="__registrationForm--inputStyle"
                            type="text"
                            value={InputValue.phoneNumber}
                            isInvalid={InputError.phoneNumber}
                            onChange={(e) => HandleInputValue('phoneNumber', e.target.value)} />
                        <Form.Control.Feedback type="invalid">{InputError.phoneNumber}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            onChange={(e) => HandleInputValue('checkBox', e.target.checked)}
                            label="I read and agree Terms and Condition"
                            isInvalid={!!InputError.checkBox}
                            feedback={InputError.checkBox}
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Button className="__registrationForm--buttonStyle" variant="primary" type="submit"
                        onClick={RegistrationFormSubmit}>
                        Create account
                    </Button>
                </Form>
            </div>
        </div>
    )
}
