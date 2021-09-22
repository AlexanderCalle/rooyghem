import Cookies from 'js-cookie';

class Auth {
    constructor() {
        this.user = null;
    }

    isAuthenticated() {
        return this.user !== null;
    }

    isValidToken() {
        if(Cookies.get('auth') !== undefined && localStorage.getItem('tokens')) {
            return true;
        } else {
            if(Cookies.get('auth') === null && localStorage.getItem('tokens') !== null){
                localStorage.removeItem('tokens')
            }
            return false;
        }
    }

    logout() {
        Cookies.remove('auth');
        localStorage.removeItem('tokens');
        return true;
    }

    setUser(user) {
        this.user = user;
    }

    async login(credentials) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        }
        
        return fetch('http://localhost:2000/users/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.statuscode === 200) {
                this.user = data.user;
                Cookies.set('auth', data.token, { expires: 2 });
                localStorage.setItem("tokens", JSON.stringify(this.user));
            } else {
                console.log("Login failed");
            }
        });
    }
}

export default new Auth();