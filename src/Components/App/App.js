import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBar } from './SearchBar/SearchBar';
import { Playlist} from './Playlist/Playlist';
import { SearchResults} from './SearchResults/SearchResults';
import { Spotify } from '../util/Spotify/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.search(); 
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({ playlistTracks: track});
  }

  removeTrack(track) {
    return this.state.playlistTracks.filter(track => track.id != this.state.playlistTracks.id);

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      trackURIs.push('spotify:track:'.concat(this.state.playlistTracks[i].id));
    }
    return trackURIs;
    //spotify:track:6rqhFgbbKwnb9MLmUQDhG6
  }

  search(term) {
    return Spotify.search(term);
  }

  render(){
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()} onRemove={this.removeTrack(}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName()} onSave={this.savePlaylist}/>
      </div>
    </div>
  </div>
    );
  }

}

export default App;
