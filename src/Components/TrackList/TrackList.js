import React from 'react';
import './TrackList.css';
import { Track } from './Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <!-- You will add a map method that renders a set of Track components  -->
        {this.props.tracks.map(track => {return <Track key={track.id} track={track} onRemove={this.props.onRemove(this.props.track)} isRemoval={this.props.isRemoval} >{this.props.track.name} {this.props.track.artist}{this.props.track.album}</Track>; } )}
            </div> 
        );
    }
}

export default TrackList;