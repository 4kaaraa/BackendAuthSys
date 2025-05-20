function getTimestamp() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString();
    
    return `${date} ${time}`; 
}

function formatLog(prefixColor, prefix, ...args) {
    let msg = args.join(" ");
    let formattedMessage = `${prefixColor}[${getTimestamp()}] ${prefix}\x1b[0m: ${msg}`;
    console.log(formattedMessage);
}

function backend(...args) {
    let msg = args.join(" ");
    formatLog("\x1b[32m", "Backend Log", ...args);
}

function api(...args) {
    let msg = args.join(" ");
    formatLog("\x1b[33m", "API Log", ...args);
}

function error(...args) {
    let msg = args.join(" ");
    formatLog("\x1b[31m", "Error Log", ...args);
}

function debug(...args) {
    let msg = args.join(" ");
    formatLog("\x1b[35m", "Debug Log", ...args);
}

module.exports = {
    backend,
    api,
    error,
    debug
};