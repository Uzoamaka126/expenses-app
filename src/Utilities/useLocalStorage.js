const STATE = 'EXPENSES'
export const setState = state => {
    try {
        const stringifiedState = JSON.stringify(state);
        localStorage.setItem(STATE, stringifiedState)
        return stringifiedState;
    } catch (err) {
        console.log(err)
    }
}
export const getState = () => {
    try {
        const userObject = localStorage.getItem(STATE);
        if (userObject === null) {
            return undefined;
        } else {
            return JSON.parse(userObject);
        }
    } catch (err) {
        return undefined;
    }
};

export const getToken = () => {
    if (getState()) {
        const { token } = getState();
        return token;
    }
    return null
}

export const getUser = () => {
    if (getState()) {
        const { user } = getState()
        return user
    }
    return null
}

// Define a function to clear the local storage 
export const clearAppState = () => {
    try {
        localStorage.removeItem(STATE);
        window.location.href = '/';
    } catch (err) {
        console.log(err)
    }
};