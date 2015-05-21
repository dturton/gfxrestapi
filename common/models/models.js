module.exports = function(Models) {
	var isStatic = true;
	Models.disableRemoteMethod('deleteById', isStatic);
	Models.disableRemoteMethod('upsert', isStatic);
	Models.disableRemoteMethod('create', isStatic);
	Models.disableRemoteMethod('prototype.updateAttributes', isStatic);
	Models.disableRemoteMethod('find', isStatic);

	//Post.find({where: {and: [{title: 'My Post'}, {content: 'Hello'}]}}, 
	Models.getModels = function(year,make, cb) {
      Models.find({where: {and: [{yearid: year}, {makename: make}]} }, function(err, models) { 
      	cb(null, models)
       });
    }


	Models.remoteMethod(
	    'getModels', 
	    {
	       accepts: [{arg: 'year', type: 'number', requiered: true}, {arg: 'make', type: 'string', requiered: true}],
	       returns: {arg: 'models', type: 'string'},
	       http:    {path: '/get', verb: 'get'}
	     }
	);

};
