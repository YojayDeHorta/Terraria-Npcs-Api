import React, { useState, useContext } from "react";
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const utilContext = React.createContext();

export function useUtilContext() {
    return useContext(utilContext);
}


export function UtilitiesProvider(props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(false);
    const [message, setMessage] = useState(false);
    const toggleToast = (title, message) => {
        setTitle(title)
        setMessage(message)
        setOpen(true)
        setTimeout(() => setOpen(false), 5000)

    }
    return (
        <utilContext.Provider value={{ toggleToast }}>
            {props.children}
            <div style={{ position: "absolute", bottom: 5, right: 5, zIndex: 9999 }}>
                <Toast isOpen={open} fade={true} >
                    <ToastHeader toggle={() => setOpen(false)} className={title === "Advice" ? 'bg-primary text-white' : 'bg-danger text-white' }>
                        {title }
                    </ToastHeader>
                    <ToastBody>
                        {message }
                    </ToastBody>
                </Toast>
            </div>
        </utilContext.Provider>
    );
}