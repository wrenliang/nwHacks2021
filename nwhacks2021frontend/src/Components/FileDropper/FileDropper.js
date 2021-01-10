import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

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

    async uploadButtonClicked() {
        if (this.state.selectedFile != null) {
            const data = new FormData();
            data.append('file', this.state.selectedFile);

            const res = await axios.post(`http://localhost:8000/upload`, data, {});
            console.log(res);
        }
    }

    render() {
        return (
            <div className="FileDropper">
                <input type="file" name="file" onChange={this.fileDidChangeHandler} className="FileInput"/>
                <div className="CreateButtons">
                    <Button onClick={() => this.uploadButtonClicked()} variant="primary"> Create New Notes </Button>
                    <Button variant="light"> Add to Existing </Button>
                </div>
                
            </div>
        );
    }
}

export default FileDropper;