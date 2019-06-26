import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                </div>
                <button className="Track-action" onClick={this.addTrack}>+</button>
                <button className="Track-action" onClick={this.removeTrack}>-</button>
            </div>
        );
    }

    renderAction() {
        if (isRemoval) {
            return <button className="Track-action">-</button>;
        }
        return <button className="Track-action">+</button>;
    }
}

export default Track;