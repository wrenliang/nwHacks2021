import React from 'react';
import {  } from 'react-bootstrap';

// Component Dependencies

// CSS
import './NoteSetTile.css';

class NoteSetTile extends React.Component {

    render() {
        return (
            <div className="NoteSetTile">
                <div className="NoteSetTileInner">
                    <div className="NoteSetTileTop">
                        <h1 className="NoteSetTileTitle">{`${this.props.setTitle}`}</h1>
                        <p className="NoteSetTileTerms">{`${this.props.setNumTerms} terms`}</p>
                    </div>
                    
                    <p className="NoteSetTileCreator">{`${this.props.setCreator}`}</p>
                </div>
            </div>
        )
    }
}

export default NoteSetTile;