const axios = require("axios");
const config = require("./config");

const { MongoClient } = require('mongodb');


/*
These are the trackmateGPS api endpoints revealed to me

Requires an API key from their application*/


const userToken = config.userToken;
const getAllVehicles = config.getAllVehicles;
const getUpdates = "GetUpdates/json/?userToken=";
const getSingleVehicle = "GetSingleVehicle/json/?userToken=";
const getSingleVehicleHistory = "GetSingleVehicleHistory/json/?userToken=";

const client = new MongoClient(config.dbhost);
console.log("config.dbhost=", config.dbhost);
console.log("config.dbname=", config.dbname);

const interval = setInterval(() => { getData(getAllVehicles); }, config.scrapeInterval);
console.log("Started trackmategps scraper");


async function getData(endpoint) {
  let response = await axios({ url: config.baseUrl + endpoint + userToken });

  //deposit data into mongodb as is
  depositData(response.data);
}


async function depositData(data) {
  await client.connect();
  const db = client.db(config.dbname);
  const collection = db.collection("location-info");
  const insertResult = await collection.insertOne(data);
  console.log('Inserted documents =>', insertResult);
}
// getData(getAllVehicles);

// Status Code: 200
// Date in Response header: Sun, 03 Apr 2022 04:18:50 GMT
// Response ended:
// {
//   VehiclesList: [
//     {
//       TruckId: 1,
//       TruckName: 'KTM 790 Duke',
//       StopTime: '0001-01-01T00:00:00',
//       RecentMovement: '2022-04-02T20:23:24',
//       Location: [Object],
//       Heading: 161,
//       Lat: 40.05,
//       Lon: -100.05,
//       Speed: 2,
//       Odometer: 0,
//       EngineStatus: false,
//       PtoStatus: '000',
//       ReadingTime: '2022-04-03T03:53:43.8',
//       Temperature: null
//     }
//   ],
//   Status: 0,
//   StatusMessage: null
// }
