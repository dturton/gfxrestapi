module.exports = function(Makes) {
	var isStatic = true;
	Makes.disableRemoteMethod('deleteById', isStatic);
	Makes.disableRemoteMethod('upsert', isStatic);
	Makes.disableRemoteMethod('create', isStatic);
	Makes.disableRemoteMethod('prototype.updateAttributes', isStatic);
	Makes.disableRemoteMethod('find', isStatic);
	
	Makes.getMakes = function(year, cb) {
      Makes.find({where: {yearid: year} }, function(err, makes) { 
      	cb(null, makes)
       });
    }


	Makes.remoteMethod(
	    'getMakes', 
	    {
	       accepts: {arg: 'year', type: 'string', requiered: true},
	       returns: {arg: 'makes', type: 'string'},
	       http:    {path: '/get', verb: 'get'}
	     }
	);

};
