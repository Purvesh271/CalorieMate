let IS_PROD = true;  //if want to work on local host make this false 
const server = IS_PROD ?
  import.meta.env.VITE_BACKEND_URL
  : "http://localhost:8080";


export default server;