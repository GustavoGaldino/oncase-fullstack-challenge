import { useEffect, Dispatch, SetStateAction } from 'react'
import '../styles/components/Alert.css'

import { BsXCircle } from 'react-icons/bs'
import IAlert from '../interfaces/alert';

type AlertProps = {
    alert: IAlert,
    setAlert: Dispatch<SetStateAction<IAlert>>;
}

export function Alert ( { alert , setAlert } : AlertProps) {

    useEffect(() => {

        if (!alert.warning) {

            setTimeout( () => {
                
                setAlert((prevState) => {
                    return (  
                        {
                            warning: prevState.warning,
                            message: prevState.message,
                            show: false,
                        }
                    )
                })

            } , 2000 )


        }

    },
    [alert, setAlert])

    const closeAlert = async () => {

        await setAlert((prevState) => {
            return (  
                {
                    warning: prevState.warning,
                    message: prevState.message,
                    show: false,
                }
            )
        })

    }

    return (
        <div
            className={`alert-container ${alert.warning ? "warning-alert" : "success-alert"}`}
            style={{display: (alert.show ? "flex" : "none") }}
        >
            <span className="alert-message">
                {alert.message}
            </span>

            <div className="alert-closing-icon" onClick={closeAlert} >
                <BsXCircle />
            </div>

        </div>
    )
}