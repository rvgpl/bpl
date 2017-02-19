import React from 'react';
import Header from '../components/header';

export default class Error extends React.Component {
  static getInitialProps({res, xhr}) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return {statusCode}
  }
  render() {
    return  (
      <div>
        <Header />
        <h1 className="f2 lh-solid fw6 mw6 mt5 center tc"> {
          this.props.statusCode ?  `An error ${this.props.statusCode} has occured on server` :
          'An error has occured on Client'
        }</h1>
      </div>  
    )
  }
}
