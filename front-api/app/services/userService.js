app.service('UserService', function($q, $http, $location) {
  
    const UserService = {
    
        getUsers: () => {
            let users = $http.get('http://localhost:3001/v1/users');
            return users;  
        },

        registerUser: userForm => {
            let user = $http.post('http://localhost:3001/v1/users/add', userForm);
            return user;
        },

        getUserByName: (name, list) => {
            let user = list.filter(function(user) {
                return user.name === name;
            });
            return user[0];
        },        

        loginUser: (login, password) => {
            let user = $http.post('http://localhost:3001/v1/login', {'login': login, 'password': password});
            return user;  
        },

        logoutUser: () => {
            $http.get('http://localhost:3001/v1/logout').then(res => {
                window.localStorage['user'] = null;
                window.localStorage['token'] = null;
                $location.path('/login');
                window.location.reload();
            });
        },

        removeUserSession: () => {
            window.localStorage['user'] = null;
            window.localStorage['token'] = null;
        },

        getUserByLogin: login => {        
            let user = $http.post('http://localhost:3001/v1/users/checkuser', {'login': login});
            return user;
        },

        saveUser: user => {
            window.localStorage['user'] = JSON.stringify(user);
        },

        saveUserAndToken: data => {
            window.localStorage['user'] = JSON.stringify(data.user);
            window.localStorage['token'] = data.token;
        },

        getUserToken: () => {
            return window.localStorage['token'];
        },        

        getUserStore: () => {
            return JSON.parse(window.localStorage['user']);
        },

        isAuthenticaded: () => {
            if (window.localStorage['user'] !== 'null' && window.localStorage['token'] !== 'null') {            
                return true;
            } else {            
                return false;
            }
        }

    };

    return UserService;
});