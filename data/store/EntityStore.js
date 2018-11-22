
var store = module.exports = {
    setUserRole(users, response){
        for (let i = 0 ; i < users.length ; i++){	
            if(users[i].id === response.params.userid){
                users[i].name = response.body.name;
                users[i].role = response.body.role;
                break;
            }
        }
        return users;	
    },
    getUser(response,users){
        for(let i = 0 ; i < users.length ; i++){		
            if(users[i].id === response.params.userid){
                    return i;
            }
        }
        return undefined;
    },
    addUser(response,users){
        users.push(response.body);
        return users; 
    },
    deleteUser(response,users){
        var newUsers = [] ;
        for(let i = 0 ; i < users.length; i++){
            if(!(users[i].id === response.params.userid)){
                console.log(users[i] , " " , response.params.userid)
                newUsers.push(users[i]);
            }
        }
        return newUsers;
    }
}




