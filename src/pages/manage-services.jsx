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
        this.state = { checked: false };
    }

    componentDidMount() {
        fetchFileWatcherStatus().then((response) => {
            console.log(response)
            this.setState((state, props) => {
                console.log("inside componentDidMount status is : ", response.data["status"])
                return {checked: response.data["status"] === "running"}
            });
        })
    }

    switchHandler = (e) => {
        const checked = e.target.checked
        if ( checked ) {
            startFileWatcher().then((response) => {
                const data = response.data

                if (data["status"] === "running") {
                    this.setState(() => {
                        return { checked: true, dialog: "File Watcher has been turned ON."}
                    })
                }

                if (data["status"] === "stopped") {
                    this.setState(() => {
                        return { checked: false, dialog: "File Watcher failed to turn ON."}
                    })
                }
            })
        } else {
            stopFileWatcher().then((response) => {
                const data = response.data

                if (data["status"] === "stopped") {
                    this.setState(() => {
                        return { checked: false, dialog: "File Watcher has been turned OFF."}
                    })
                }

                if (data["status"] === "running") {
                    this.setState(() => {
                        return { checked: true, dialog: "File Watcher failed to turn OFF."}
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
                            <Switch checked={this.state.checked} onChange={this.switchHandler}/>
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
