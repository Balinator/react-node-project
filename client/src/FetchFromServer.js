
export default function fetchFromHost(url){
    if(process.env.REACT_APP_HOST_ENV) {
        return fetch(process.env.REACT_APP_HOST_ENV + url);
    }
    return fetch(url);
};
