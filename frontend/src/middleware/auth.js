import Cookies from 'js-cookie';

class Auth {
    constructor() {
        this.user = null;
    }

    isAuthenticated() {
        return this.user !== null;
    }

    isValidToken() {
	    // todo: do not read cookie
	//return true;
    // return localStorage.getItem('tokens') !== undefined;
        if (Cookies.get('auth') !== undefined && localStorage.getItem('tokens')) {
            return true;
        } else {
            if (Cookies.get('auth') === undefined && localStorage.getItem('tokens') !== null) {
                localStorage.removeItem('tokens')
            }
            return false;
        }
    }

    isAdmin() {
        const { is_admin } = JSON.parse(localStorage.getItem('token'));
        if (is_admin) return true;
        return false;
    }

    logout() {
        localStorage.removeItem('tokens');
        Cookies.remove('auth');
        return true;
    }

    setUser(user) {
        this.user = user;
    }

    async login(credentials) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        return fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/login`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statuscode === 200) {
                    this.user = data.user;
                    Cookies.set('auth', data.token, { expires: 1});
                    localStorage.setItem("tokens", JSON.stringify(this.user));
                } else {
                    console.log("Login failed");
                }
            });
    }
}

export default new Auth();
