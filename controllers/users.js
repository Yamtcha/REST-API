const obj = require('../data/store/EntityStore');
var express = require('express');
var router = express.Router();
var DataManager = require('../data/dataManager.js');


/* If you don't specifyt he id of the user that you are requesting then all the users will be received as a response
*/

router.get('/', function(req,res){
		var users = DataManager.getUsers();
		return res.json({users:users})
});

router.post('/', function(req,res){
	if(!req.body.name){
		return res.json({
			message: 'Name missing',
			error:true
		})
	}

	var users = DataManager.getUsers();
	users = obj.addUser(req,users);
	DataManager.syncUsers(users);
	
	return res.json({
		message: 'Success',
		error:false
	})

});

router.put('/:userid', function(req,res){
	try {
		var users = DataManager.getUsers();
		users = obj.setUserRole(users,req)
		DataManager.syncUsers(users);

		return res.json({
			message: 'Success',
			error:false
		});
	}
	catch (e) {
		return res.status(500).json({
			message: e.message,
			error: true
		})
	}
});

router.delete('/:userid', function(req,res){
	try{
		var users = DataManager.getUsers();
		users = obj.deleteUser(req,users)
		DataManager.syncUsers(users);

	return res.json({
		message: 'Success',
		error:false
	});
	}catch(e){
		return res.status(500).json({
			message: e.message,
			error: true
		})
	}
});

router.get('/:userid', function(req,res){
	const users = DataManager.getUsers();
	const userid = obj.getUser(req,users);
	const hasUser = userid === undefined ? false : true;
	
	if(hasUser){
			return res.json({
				users: users[userid],
			})
	}else{
		return res.status(404).json({
			message: 'User not found',
			error:true
		})
	}
});

module.exports = router;