var app = require('express');

var Attraction = require('./models/attraction.js');

app.get('/api/attractions', function(req, res){
	Attraction.find({approved: true}, function(err, attractions){
		if (err) {res.send(500, 'Error occurred: database error.');};

		res.json(attractions.map(function(a){
			return{
				name: a.name,
				id: a._id,
				description: a.description,
				location: a.location,
			}
		}));
	});
});

app.post('/api/attraction', function(req, res){
	var a = new Attraction({
		name: req.body.name,
		description: req.body.description,
		location: {lat: req.body.lat, lng: req.body.lng},
		history:{
			event: 'created',
			email: req.body.email,
			date: new Date(),
		},
		approved: false,
	});

	a.save(function(err, a){
		if (err) {res.send(500, 'Error occurred: database error.')};
		res.json({
			name: a.name,
			id: a._id,
			description: a.description,
			location: a.location,
		});
	});
});