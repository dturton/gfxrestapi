module.exports = function(Transmission) {
	var isStatic = true;
	Transmission.disableRemoteMethod('deleteById', isStatic);
	Transmission.disableRemoteMethod('upsert', isStatic);
	Transmission.disableRemoteMethod('create', isStatic);
	Transmission.disableRemoteMethod('prototype.updateAttributes', isStatic);
	Transmission.disableRemoteMethod('find', isStatic);

	Transmission.getTransmission = function(year, make, model, submodel,  cb) {
      Transmission.find({where: {and: [{yearid: year}, {makename: make}, {modelname: model}, {submodelname: submodel}]} }, function(err, transmission) {  
      	cb(null, transmission)
       });
    }


	Transmission.remoteMethod(
	    'getTransmission', 
	    {
	       accepts: [{arg: 'year', type: 'number', requiered: true}, {arg: 'make', type: 'string', requiered: true}, {arg: 'model', type: 'string', requiered:true}, {arg: 'submodel', type: 'string', requiered:true}],
	       returns: {arg: 'Transmission', type: 'string'},
	       http:    {path: '/get', verb: 'get'}
	     }
	);

};
