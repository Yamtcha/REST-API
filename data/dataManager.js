var fs = require('fs');
var path = require('path');

function DataManager() {

    var userStore = require('./store/users.json');

    var getUsers = function() {
        return userStore;
    }

    var addUsers = function(){
        
    }

    var syncUsers = function(users) {
        userStore = users;
        fs.writeFileSync(path.resolve('data/store/users.json'), JSON.stringify(users, null, 2));
    }


    return {
        getUsers: getUsers,
        syncUsers: syncUsers
    };
}

module.exports = new DataManager();