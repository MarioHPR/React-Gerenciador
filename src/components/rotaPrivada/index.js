import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const RotaPrivada = ( { component: Component, ...rest } ) => (
  <Route { ...rest } render={ props => (
    localStorage.getItem( 'token-gerenciador-security' ) ?
      <Component { ...props } /> :
      <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
  ) } />
);

export { RotaPrivada };