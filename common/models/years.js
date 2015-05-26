module.exports = function(Years) {
	var isStatic = true;
	Years.disableRemoteMethod('deleteById', isStatic);
	Years.disableRemoteMethod('upsert', isStatic);
	Years.disableRemoteMethod('create', isStatic);
	Years.disableRemoteMethod('prototype.updateAttributes', isStatic);

    Years.getYears = function(cb) {
      Years.find( function(err, years) { 
      	cb(null, years.getUnique('yearid'));
       });
    }


	Years.remoteMethod(
	    'getYears', 
	    {
	       returns: {arg: 'years', type: 'string'},
	       http:    {path: '/get', verb: 'get'}
	     }
	);

	Array.prototype.getUnique = function(t){
		var flags = [], output = [], l = this.length, i;
		for( i=0; i<l; i++) {
		    if( flags[this[i][t]]) continue;
		    flags[this[i][t]] = true;
		    output.push(this[i][t]);
		}
		return output;
	}

};


