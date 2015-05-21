module.exports = function(SubModels) {
	var isStatic = true;
	SubModels.disableRemoteMethod('deleteById', isStatic);
	SubModels.disableRemoteMethod('upsert', isStatic);
	SubModels.disableRemoteMethod('create', isStatic);
	SubModels.disableRemoteMethod('prototype.updateAttributes', isStatic);
	SubModels.disableRemoteMethod('find', isStatic);

	SubModels.getSubModels = function(year, make, model, cb) {
      SubModels.find({where: {and: [{yearid: year}, {makename: make}, {modelname: model}]} }, function(err, submodel) {  
      	cb(null, submodel)
       });
    }


	SubModels.remoteMethod(
	    'getSubModels', 
	    {
	       accepts: [{arg: 'year', type: 'number', requiered: true}, {arg: 'make', type: 'string', requiered: true}, {arg: 'model', type: 'string', requiered:true}],
	       returns: {arg: 'SubModels', type: 'string'},
	       http:    {path: '/get', verb: 'get'}
	     }
	);

};
