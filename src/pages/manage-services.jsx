import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Stack, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchFileWatcherStatus, startFileWatcher, stopFileWatcher} from "../api";

class ManageServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetchFileWatcherStatus().then((response) => {
            console.log(response)
            this.setState((state, props) => {
                return {status: response.data["status"]}
            });
        })
    }

    onChange = (e) => {
        const turnOn = e.target.checked
        if ( turnOn ) {
            console.log("*** turning ON File Watcher")
            startFileWatcher().then((response) => {
                const data = response.data

                // Handle errors
                if (data["error"] !== null) {
                    this.setState(() => {
                        return {status: this.state.status, dialog: data["message"]}
                    })
                }

                if (data["status"] === "running") {
                    this.setState(() => {
                        return { status: this.state.status, dialog: "File Watcher has been turned ON."}
                    })
                }

                if (data["status"] === "stopped") {
                    this.setState(() => {
                        return { status: this.state.status, dialog: "File Watcher failed to turn ON."}
                    })
                }
            })
        } else {
            console.log("*** turning OFF File Watcher")
            stopFileWatcher().then((response) => {
                const data = response.data

                // Handle errors
                if (data["error"] !== null) {
                    this.setState(() => {
                        return {status: this.state.status, dialog: data["message"]}
                    })
                }

                if (data["status"] === "stopped") {
                    this.setState(() => {
                        return { status: this.state.status, dialog: "File Watcher has been turned OFF."}
                    })
                }

                if (data["status"] === "running") {
                    this.setState(() => {
                        return { status: this.state.status, dialog: "File Watcher failed to turn OFF."}
                    })
                }
            }

            )
        }


    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Box sx={{height: '100vh'}}>
                        <h2>Manage Services</h2>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={{ paddingRight: '50px' }}>File Watcher Service</Typography>
                            <Typography>Off</Typography>
                            <Switch onChange={this.onChange}/>
                            <Typography>On</Typography>
                        </Stack>
                        <div> Dialog: { this.state.dialog }</div>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}

export default ManageServices
