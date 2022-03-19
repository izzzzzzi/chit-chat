import React from "react";
import { Redirect } from "react-router-dom";
import ApiController from "../../api/ApiController";

export default function OAuth2RedirectHandler(props) {
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    ApiController.defaults.headers.common.Authorization = `Bearer ${token}`;
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: props.location,
          },
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
}
