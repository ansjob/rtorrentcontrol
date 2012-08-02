define([
	"order!namespace",
	"order!jquery",
	"order!underscore",
	"order!fake-ajax",
	],
	function(namespace, $, _) {

		n = namespace;

		setupFakeHttp = function() {


			/* Global variable that gets reset before every test*/
			sampleData = [{
				id: "1234",
				name: "Some.Movie",
				sizeInBytes: 1025,
				fileNames:["movie.avi", "sample.avi"]
			},

			{
				id: "2345",
				name: "Good.Movie",
				sizeInBytes: 1023,
				fileNames:["film.avi", "sample.mkv"]
			}];

			sampleServerSettings = [{
				type: "string",
				key: "setting1",
				description: "Some sample setting",
				value : "hello world"
			}];

			fakeAjax({
				registrations: [
				{
					url : "api/torrents",
					successData : sampleData,
				},
				{
					type: 'get',
					url : "api/settings/server",
					successData : sampleServerSettings
				}
				]
			});

		};

	});