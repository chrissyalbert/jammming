import React from 'react';

let userAccessToken = '';
const redirectURI = 'http://localhost:3000/';

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
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }
  searchSpotify(term) {
      fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {Authorization: `Bearer ${userAccessToken}`}
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
        }, networkError => console.log(networkError.message);
      ).then(jsonResponse => {
        if (jsonResponse === null) {
          return [];
        }
        jsonResponse.map(array => {
          return {
            ID: array.track.id,
            Name: array.track.name,
            Artist: array.track.artists[0].name,
            Album: array.track.album.name,
            URI: array.track.uri
          }
        });
          
        })

        };
      });
    // https://api.spotify.com/v1/search?type=TRACK
  }
}

export default Spotify;