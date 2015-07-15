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
    };


	Makes.getAllMakes = function(year, cb) {
		var ds = Makes.dataSource;
		var sql = "select DISTINCT MakeName from results2 where yearid =?";
		var year = [year];
		var makesarray = [];

		ds.connector.query(sql, year, function (err, makes) {
            if (err) console.error(err);
            
			for (i = 0; i < makes.length; i++) { 
			    makesarray.push(makes[i].MakeName);
			}
            cb(err, makesarray);


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

	Makes.remoteMethod(
		'getAllMakes', 
	    {
	       accepts: {arg: 'year', type: 'string', requiered: true},
	       returns: {arg: 'makes', type: 'string'},
	       http:    {path: '/getall', verb: 'get'}
	     }
	);
};
