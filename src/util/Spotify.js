import React from 'react';

let userAccessToken = '';
const redirectURI = 'http://localhost:3000/';

class Spotify extends React.Component {
  getAccessToken() {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (userAccessToken) {
      return userAccessToken;
    } else if (accessTokenMatch && expiresMatch) {
      userAccessToken = accessTokenMatch[1];
      let expirationTime = Number(expiresMatch[1]);
      window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');  
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }

  searchSpotify(term) {
    const userAccessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {Authorization: `Bearer ${userAccessToken}`}
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        if (jsonResponse.tracks === null) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      })
  };

  savePlaylist(nameOfPlaylist, arrayOfURIs) {
    if (nameOfPlaylist === null && arrayOfURIs === null) {
      return;
    }
    userAcessToken = this.getAccessToken();
    const headers = {Authorization: 'Bearer' + userAccessToken};
    let userID;
    // Step 92
     return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(
	    response => {
        if (response.ok) {
          response.json()
      }
        throw new Error('Request failed!');
      }, networkError => {
      console.log(networkError.message)
      // Step 93
    ).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistID = response.json().id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: arrayOfURIs})
        });
      });
    });
  }
}

export default Spotify;