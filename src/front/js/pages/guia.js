import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import fondo from "../../img/fondo.jpg";
import madrid from "../../img/madrid.jpg";

import "../../styles/guia.css";

export const Guia = () => {
  const { actions } = useContext(Context);
  const params = useParams();
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("jwt-token");


  const [guia, setGuia] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //cargando guias
  const [isLoading2, setIsLoading2] = useState(true); //cargando actividades
  const [isLoading3, setIsLoading3] = useState(true); //cargando reservas

  const promesaGuias = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/usuario/" + params.theid));
    });
  };
  const promesaActividades = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/actividad_guia/" + params.theid));
    });
  };
  const promesaReservas = () => {
    return new Promise((resolve, reject) => {
      resolve(actions.dataFromAPI("/api/reserva_guia/" + params.theid));
    });
  };
  useEffect(() => {
    if (token) {
      actions.logIn();
    }
    promesaGuias().then((datosG) => {
      setGuia(datosG);
      setIsLoading(false);
    });

    promesaActividades().then((datosA) => {
      setActividades(datosA);
      setIsLoading2(false);
      promesaReservas().then((datosR) => {
        setReservas(datosR);
        setIsLoading3(false);
      });
    });
  }, []);

  if (isLoading && isLoading2 && isLoading3) {
    return (
      <div className="guia-body">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="guia-body" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="container">
        <div className="container">
          <div className="card mb-5">
            <div className="row g-0">
              <div className="col-md-2">
              {guia.foto ? (
                    <img
                      src={process.env.BACKEND_URL + "/" + guia.foto}
                      className="imagen_actividad_header"
                      alt="..."
                    />
                  ) : (
                    <img
                      src={madrid}
                      className="imagen_actividad_header"
                      alt="..."
                    />
                  )}
              </div>
              <div className="col-md-10 cuerpo-guia-carta">
                <div className="card-body">
                  <h1 className="card-title nombre-guia">{guia.nombre}</h1>
                  <p className="card-text descripcion-guia">{guia.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="texto_actividades mb-5">ACTIVIDADES</h3>
        {guia.tipo === 1 && userid === params.theid ? (
          <div className="mb-5">
            <Link to="/nueva_actividad">
              <button>Nueva actividad</button>
            </Link>
          </div>
        ) : (
          ""
        )}
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-5 pb-3">
          {actividades.map((element) => (
            <div key={element.id} className="col">
              {" "}
              {/*Link a la pagina de actividades + index. Variable global en flux.js */}
              <div className="card h-100">
              {element.foto ? (
                  <img
                    src={process.env.BACKEND_URL + "/" + element.foto}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                ) : (
                  <img
                    src={madrid}
                    className="imagen_actividad_header"
                    alt="..."
                  />
                )}
                <div className="card-body tarjeta_actividad_body">
                  <Link to={"/actividades/" + element.id}>
                    <h5 className="card-title tarjeta_actividad_nombre">
                      {element.nombre}
                    </h5>
                  </Link>
                  <p className="card-text tarjeta_actividad_texto">
                    CIUDAD:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.ciudad}
                    </span>
                  </p>
                  <p className="card-text tarjeta_actividad_texto">
                    PRECIO:{" "}
                    <span className="tarjeta_actividad_variable">
                      {element.precio}
                    </span>
                  </p>
                  {guia.tipo === 1 && userid === params.theid ? (
                    <div className="mb-5">
                      <Link
                        id={"navLink" + element.id}
                        to={"/modifica_actividad/" + element.id}
                      >
                        <div>Modificar</div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {userid === params.theid ? (
          <>
                  <h3 className="texto_actividades my-5">RESERVAS</h3>

                  <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
                    {reservas.map((element) => (
                      <div key={element.id} className="col">
                        <div className="card h-100">
                        {element.obj_actividad.foto ? (
                            <img
                              src={process.env.BACKEND_URL + "/" + element.obj_actividad.foto}
                              className="imagen_actividad_header"
                              alt="..."
                            />
                          ) : (
                            <img
                              src={madrid}
                              className="imagen_actividad_header"
                              alt="..."
                            />
                          )}
                          <div className="card-body tarjeta_actividad_body">
                            <h5 className="card-title tarjeta_actividad_nombre">
                              RESERVA:{" "}
                              <span className="tarjeta_actividad_variable">
                                {element.num_reserva}
                              </span>
                            </h5>
                            <p className="card-text tarjeta_actividad_texto">
                              ACTIVIDAD:{" "}
                              <span className="tarjeta_actividad_variable">
                                {element.obj_actividad.nombre}
                              </span>
                            </p>
                            <p className="card-text tarjeta_actividad_texto">
                              REALIZADA:{" "}
                              <span className="tarjeta_actividad_variable">
                                {element.fecha_realizacion}
                              </span>
                            </p>
                            <p className="card-text tarjeta_actividad_texto">
                              EMITIDA:{" "}
                              <span className="tarjeta_actividad_variable">
                                {element.fecha_reserva}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  </>
                ) : (
                 <></>
                )}
        

      </div>
    </div>
  );
};

Guia.propTypes = {
  match: PropTypes.object,
};
