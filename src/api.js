import Axios from "axios";

const ROOT_URL = 'http://localhost:7072/api/controller/'
const FILE_WATCHER_URL = ROOT_URL+'file-watcher'

// FILE WATCHER API
function startFileWatcher() {
    return Axios.post(FILE_WATCHER_URL, { "action": "start" })
}

function stopFileWatcher() {
    return Axios.post(FILE_WATCHER_URL, { "action": "stop" })
}

function fetchFileWatcherStatus() {
    return Axios.get(FILE_WATCHER_URL)
}

export {startFileWatcher, stopFileWatcher, fetchFileWatcherStatus}
