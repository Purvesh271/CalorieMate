let IS_PROD = false;  //if want to work on local host make this false 
const server = IS_PROD ?
    "live_server_url" :

    "http://localhost:8080"


export default server;