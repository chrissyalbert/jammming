import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBar } from './SearchBar/SearchBar';
import { Playlist} from './Playlist/Playlist';
import { SearchResults} from './SearchResults/SearchResults';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
          name: '',
          artist: '',
          album: '',
          id: ''
      }],
      playlistName: 'U2',
      playlistTracks: [{
        name: "I still haven't found what I'm looking for",
        artist: 'U2',
        album: 'Joshua Tree',
        id: 1
      },
      {
        name: 'Beautiful Day',
        artist: 'U2',
        album: "All That You Can't Leave Behind",
        id: 2
      }] 
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render(){
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()} onRemove={this.removeTrack(}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName()}/>
      </div>
    </div>
  </div>
    );
  }

}

export default App;
