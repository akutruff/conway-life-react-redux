import React from 'react';
export function Welcome(props: { message: string; }) {
  return (<h1>Howdy, yo {props.message}</h1>);
}
