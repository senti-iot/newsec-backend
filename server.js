#!/usr/bin/env nodejs
process.title = "newsec-backend"
const dotenv = require('dotenv').config()
if (dotenv.error) {
	console.warn(dotenv.error)
}
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

const sentiAuthClient = require('senti-apicore').sentiAuthClient
const authClient = new sentiAuthClient(process.env.SENTICOREURL, process.env.PASSWORDSALT)
module.exports.authClient = authClient

// API endpoint imports

const port = process.env.NODE_PORT || 3032

app.use(helmet())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors())




const getBuilding = require('./api/building/getBuilding')
const getBuildingImages = require('./api/building/getBuildingImages')
const addBuildingImage = require('./api/building/addBuildingImage')
const getBuildingImage = require('./api/building/getBuildingImage')
const getBuildings = require('./api/building/getBuildings')
const getBuildingsSum = require('./api/data/getBuildingsSum')
const getBuildingYearlyCo2 = require('./api/data/getBuildingYearlyCo2')
const getYearlyCo2 = require('./api/data/getYearlyCo2')
const getActualResult = require('./api/data/getActualResult')
const getBuildingBenchmark = require('./api/data/getBuildingBenchmark')
const getBuildingEmission = require('./api/data/getBuildingEmission')
const getBuildingEmissionStats = require('./api/data/getBuildingEmissionStats')
const getBuildingActualUsage = require('./api/data/getBuildingActualUsage')
const getBuildingEmissionTodate = require('./api/data/getBuildingEmissionTodate')
const getBuildingCo2Score = require('./api/data/getBuildingCo2Score')

app.use([getBuilding, getBuildingImages, addBuildingImage, getBuildingImage, getBuildings, 
	getBuildingsSum, getBuildingYearlyCo2, getYearlyCo2, getActualResult, getBuildingBenchmark, getBuildingEmission, 
	getBuildingEmissionStats, getBuildingActualUsage, getBuildingEmissionTodate, getBuildingCo2Score])

//---Start the express server---------------------------------------------------

const startServer = () => {
	app.listen(port, () => {
		console.log('newsec started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startServer()
