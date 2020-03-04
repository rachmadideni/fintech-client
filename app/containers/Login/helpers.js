import store from 'store';

function setTokenInStorage(token){
    store.set('token', token);
}

function removeTokenInStorage(tokenKey){
    store.remove(tokenKey);
}

export {
    setTokenInStorage,
    removeTokenInStorage
}