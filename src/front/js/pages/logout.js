import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Logout= () => {
    const { actions } = useContext(Context);
    const token = localStorage.getItem('jwt-token')
    useEffect(() => {
        if (token) {
            const url = '/logout'
            let log = actions.dataFromAPI(url)

        }
    }, [])

    return (
        <div className="login-body"><h1>Has cerrado sesión</h1></div>
    )
}

