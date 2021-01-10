import React from 'react';
import {  } from 'react-bootstrap';

// Component Dependencies

// CSS
import './NoteSetTile.css';

// Icons
import ProfileIcon from './ProfileIcon.svg';

class NoteSetTile extends React.Component {

    render() {
        return (
            <div className="NoteSetTile" onClick={this.props.clickHandler}>
                <div className="NoteSetTileInner">
                    <div className="NoteSetTileTop">
                        <h1 className="NoteSetTileTitle">{`${this.props.setTitle}`}</h1>
                        <p className="NoteSetTileTerms">{`${this.props.setNumTerms} terms`}</p>
                    </div>
                    
                    <p className="NoteSetTileCreator"> <img src={ProfileIcon} width={26} height={26} className="d-inline-block align-top"></img>{` ${this.props.setCreator}`}</p>
                </div>
            </div>
        )
    }
}

export default NoteSetTile;