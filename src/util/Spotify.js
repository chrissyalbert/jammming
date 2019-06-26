import React from 'react';

let userAccessToken = '';

class Spotify extends React.Component {
  getAccessToken(userAccessToken) {
    if (userAccessToken) {
      return userAccessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/
    /expires_in=([^&]*)/) != null) {
      userAccessToken = window.location.href.match(/access_token=([^&]*)/);
      let expirationTime = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');  
    } 
  }
}

export default Spotify;