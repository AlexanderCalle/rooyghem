class Auth {
    constructor() {
        this.user = null;
    }

    isAuthenticated() {
        return this.user !== null;
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
            } else {
                console.log("Login failed");
            }
        });
    }
}

export default new Auth();