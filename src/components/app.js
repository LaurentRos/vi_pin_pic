import { Component } from 'preact';

import Header from './header';
import { Button, Icon } from 'preact-mdl'
import MapContainer from './maps';
import CameraModal from './cameraModal';
import { database } from 'PinPic/service/firebase'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.setState({
            isCameraModalOpen: false,
            pin: {
                name: "Hello!"
            }
        })
        this.toggleCameraModal = this.toggleCameraModal.bind(this);
        this.setPicture = this.setPicture.bind(this);
    }

    componentDidMount() {
        const pinsRef = database.ref("pins/Theodo");
        let self = this;

        pinsRef.on('value', (snapshot) => {
            self.setState({ pin: snapshot.val() });
        });
    }

    toggleCameraModal() {
        const isCameraModalOpen = this.state.isCameraModalOpen;
        this.setState({
            isCameraModalOpen: !isCameraModalOpen
        });
    }

    setPicture(picture) {
        this.img.src = URL.createObjectURL(picture);
        const datetime = new Date();
        database.ref('pins/Theodo').set({
            datetime: datetime.toString(),
            location: {
                lat: 48.8684921,
                lng: 2.3174882
            },
            name: "Hello Theodo!",
            pictureSrc: this.img.src
        });
    }

    render() {
        return (
            <div style={styles.app}>
                <Header />
                <div style={styles.mapContainer}>
                    <img
                        style={styles.picture}
                        ref={(img) => {
                            this.img = img;
                        }}
                    />
                    <MapContainer
                        pinName={this.state.pin.name}
                    />
                </div>
                <CameraModal
                    isModalOpen={this.state.isCameraModalOpen}
                    toggleCameraModal={this.toggleCameraModal}
                    setPicture={this.setPicture}
                />
                <div style={styles.buttonContainer}>
                    <Button
                        fab
                        colored
                        raised
                        onClick={this.toggleCameraModal}
                    >
                        <Icon icon="camera"/>
                    </Button>
                </div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css" />
            </div>
        );
    }
}

const styles = {
    app: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },

    picture: {
        top: 10,
        right: 10,
        position: 'absolute',
        zIndex: 10,
        height: 200,
    },
    
    mapContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    }    
}
