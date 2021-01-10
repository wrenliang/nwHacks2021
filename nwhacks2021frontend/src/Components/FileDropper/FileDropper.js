import React from 'react';
import { Button } from 'react-bootstrap';

// Component Dependencies

// CSS
import './FileDropper.css';

class FileDropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }

        this.fileDidChangeHandler = this.fileDidChangeHandler.bind(this);
        this.uploadButtonClicked = this.uploadButtonClicked.bind(this);
    }

    fileDidChangeHandler(event) {
        this.setState({
            selectedFile: event.target.files[0]
        });
        console.log(event.target.files[0]);
    }

    uploadButtonClicked() {

    }

    render() {
        return (
            <div className="FileDropper">
                <h1>FileDropper</h1>
                <input type="file" name="file" onChange={this.fileDidChangeHandler}/>
                <Button onClick={() => this.uploadButtonClicked}>Upload</Button>
            </div>
        )
    }

}

export default FileDropper;