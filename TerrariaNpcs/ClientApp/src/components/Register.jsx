import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Tooltip } from 'reactstrap';
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../auth/AuthProvider'
import { useUtilContext } from '../auth/UtilitiesProvider'

function Register({ modalRegister, toggleRegister }) {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const Auth = useAuthContext()
    const util = useUtilContext()

    useEffect(() => {


        reset();
        setLoading(false);
    }, [modalRegister])
    const Register = async (data) => {
        setLoading(true)

        const response = await fetch(`api/user/register`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        if (!responseData.error) {
            Auth.login(responseData);
            toggleRegister()
            return
        }
        util.toggleToast("Register error", responseData.message)
        setLoading(false)

    };
    return (
        <div>
            <Modal isOpen={modalRegister} toggle={toggleRegister} size="sm" >
                <img src="./pasto.png" style={{ width: "100%" }} alt="grass terraria"></img>
                <Form onSubmit={handleSubmit(Register)}>
                    <ModalHeader style={{ backgroundColor: "#604436", color: "white", borderRadius: "0%" }} >Register</ModalHeader>
                    <ModalBody style={{ backgroundColor: "#604436", color: "white" }} className="">

                        <input type="text" className={`form-control  mt-3 ${errors.Name ? 'is-invalid' : ''}`}
                            placeholder="Name" {...register("Name", { required: true })} />
                        {errors.Name && <div >Name is required</div>}


                        <input type="text" className={`form-control mt-3 ${errors.Email ? 'is-invalid' : ''}`} 
                            placeholder="Email" {...register("Email", {
                                required: true,
                                validate: {
                                    matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
                                }
                            })} />
                        {errors.Email && <div >Write a valid email</div>}

                        <input type="password" className={`form-control  mt-3 ${errors.Password ? 'is-invalid' : ''}`} 
                            placeholder="Password" {...register("Password", { required: true, minLength: 5 })} />

                        {errors.Password && <div >The minimum size is 5 characters</div>}

                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: "#604436", color: "white" }}>
                        {/*<Button type="submit" color="primary" >Register</Button>{' '}*/}
                        <button type="submit" className="btn btn-success " disabled={loading}>
                            {
                                loading ?
                                    <div>
                                        <span> ...</span>
                                        <div className="spinner-border spinner-border-sm text-light ms-1" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    : <span>Register</span>
                            }
                        </button>
                        <Button type="button" color="secondary" onClick={toggleRegister}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default Register;