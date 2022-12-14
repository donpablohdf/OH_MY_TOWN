import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import opinion1 from "../../img/opinion1.jpg";


import "../../styles/login.css";

export const UserHome = () => {
  const { actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");
  
 
  useEffect(() => {
    if (!token) {
      return (
        <div className="login-body">
          <h1 className="bg-danger">No está autorizado</h1>
        </div>
      );
    }else{
      actions.logIn()
    }
    const promesa = () => {
      return new Promise((resolve, reject) => {
        resolve(actions.dataFromAPI("/api/usuario/" + userid));
      });
    };
    promesa().then((datos) => {
      setListaUsuarios(datos);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="login-body">
        <h1>Cargando...</h1>
      </div>
    );
  }
  
  if (!listaUsuarios.nombre || listaUsuarios.nombre === "") {
    return (
      <div className="login-body">
        <h1>Para continuar debe rellenar su perfil</h1>
        <Link to="/modifica_usuario">
          <button>Rellenar mi perfil</button>
        </Link>
      </div>
    );
  }
 //<img src={"/src/" + listaUsuarios.foto} alt="" />

  return (
    <>
      <div className="login-body">
        <h1>Esta es la pagina de usuario</h1>
        {listaUsuarios.foto ? (
                <img
                  src={
                    process.env.BACKEND_URL + "/" + listaUsuarios.foto
                  }
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              ) : (
                <img
                  src={opinion1}
                  className="card-img-top actividad_guia_imagen"
                  alt="..."
                />
              )}
        
        <h5>Nombre: {listaUsuarios.nombre}</h5>
        <p>Apellidos: {listaUsuarios.apellidos}</p>
        <p>Email: {listaUsuarios.email}</p>
        <p>Ciudad: {listaUsuarios.ciudad}</p>
        {listaUsuarios.tipo == 1 ? (
          <>
            <p>Descripcion: {listaUsuarios.descripcion}</p>
            <div>
              <Link to={"/guia/" + userid}>
                <button>Ir a mi pagina de guía</button>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
        <div>
          <Link to="/modifica_usuario">
            <button>Modificar mis datos de perfil</button>
          </Link>
        </div>
        <div>
          <Link to="/baja_usuario">
            <button>Darme de baja</button>
          </Link>
        </div>
        <div>
        <Link to={"/reservas/"+userid}>
          <button>Ver mis reservas</button>
        </Link>
      </div>
        
      </div>
    </>
  );
};
