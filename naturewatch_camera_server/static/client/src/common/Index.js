import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import IdleTimer from 'react-idle-timer';
import Header from './Header'
import CameraFeed from './CameraFeed'
import Settings from '../settings/Settings';
import SessionButton from './SessionButton';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.idleTimer = null;

        this.onSessionButtonClick = this.onSessionButtonClick.bind(this);
        this.onIdle = this.onIdle.bind(this);
        this.handleFeedRefresh = this.handleFeedRefresh.bind(this);

        this.state = {
            feedStatus: "active",
            sessionStatus: "inactive"
        };
    }

    captureStatus() {
        if (this.state.sessionStatus === "inactive") {
            return (
                <p className="feed-status">Capture is <u>off</u></p>
            );
        } else {
            return (
                <p className="feed-status">Capture is <u>on</u></p>
            );
        }
    }

    getSessionButtonText(type) {
        // Deal with terminology...
        if (type === "photo") type = "image";
        let session = this.state.sessionStatus;
        if (session === "photo") type = "image";

        if (session === type) {
            return "Stop " + type + " Capture";
        }
        else {
            return "Start " + type + " Capture";
        }
    }

    onSessionButtonClick(type) {
        if (this.state.sessionStatus === "inactive") {
            this.setState({
                sessionStatus: type
            }, () => {
                console.log(this.state.sessionStatus);
            });
        } else {
            this.setState({
                sessionStatus: "inactive"
            }, () => {
                console.log(this.state.sessionStatus);
            });
        }
    }

    onIdle() {
        console.log("INFO: Feed status timeout.");
        this.setState({
            feedStatus: "inactive"
        });
    }

    handleFeedRefresh() {
        console.log("INFO: Feed refreshed.");
        this.setState({
            feedStatus: "active"
        });
    }

    render() {
        return(
            <div className="index">
                <Container>
                    <Row>
                        <Col>
                            <Header/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <CameraFeed
                                status={this.state.feedStatus}
                                onClick={this.handleFeedRefresh}
                            />
                            {this.captureStatus()}
                        </Col>
                        <Col sm={4}>
                            <SessionButton
                                type={"video"}
                                onButtonClick={this.onSessionButtonClick}
                                sessionStatus={this.state.sessionStatus}
                            />
                            <SessionButton
                                type={"photo"}
                                onButtonClick={this.onSessionButtonClick}
                                sessionStatus={this.state.sessionStatus}
                            />
                            <Settings/>
                        </Col>
                    </Row>
                </Container>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onIdle={this.onIdle}
		            debounce={250}
                    timeout={1000 * 60}
                />
            </div>
        );
    }
}

export default Index;