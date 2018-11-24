'use strict'
const server = require('./server/server')
const config = require('./config/')

console.log('--- API Gateway ---')
server
	.start({
		port: config.serverSettings.port,
		routes: config.routes

	})
	.then(app => {
		console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
		app.on('close', () => {
			console.log(`Server exited.`)
		})
	})
