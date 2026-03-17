app.factory('authService', function() {
    return {
        getUsers: function() {
            return JSON.parse(localStorage.getItem('lumina_users') || '[]');
        },
        saveUsers: function(users) {
            localStorage.setItem('lumina_users', JSON.stringify(users));
        },
        register: function(name, email, password) {
            let users = this.getUsers();
            if (users.find(u => u.email === email)) {
                return { success: false, message: 'Email already exists' };
            }
            users.push({ id: Date.now(), name, email, password });
            this.saveUsers(users);
            return { success: true };
        },
        login: function(email, password) {
            let users = this.getUsers();
            let user = users.find(u => u.email === email && u.password === password);
            if (user) {
                // remove password from session
                const sessionUser = { id: user.id, name: user.name, email: user.email };
                localStorage.setItem('lumina_currentUser', JSON.stringify(sessionUser));
                return { success: true, user: sessionUser };
            }
            return { success: false, message: 'Invalid credentials' };
        },
        logout: function() {
            localStorage.removeItem('lumina_currentUser');
        },
        getCurrentUser: function() {
            let userStr = localStorage.getItem('lumina_currentUser');
            return userStr ? JSON.parse(userStr) : null;
        },
        isLoggedIn: function() {
            return this.getCurrentUser() !== null;
        }
    };
});
