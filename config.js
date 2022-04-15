var config = {};

config.baseUrl = "https://app.trackmategps.com/service/";
config.userToken = "";
config.getAllVehicles = "GetAllVehicles/json/?userToken=";
config.getUpdates = "GetUpdates/json/?userToken=";
config.getSingleVehicle = "GetSingleVehicle/json/?userToken=";
config.getSingleVehicleHistory = "GetSingleVehicleHistory/json/?userToken=";
config.scrapeInterval = 600000 //in milliseconds

//mongodb instance info
config.dblocation = "localhost";
config.dbuser = "user";
config.dbpass = "pass";
config.dbname = "trackmate";
//user authentication with default admin collection authentication
config.dbhost = `mongodb://${config.dbuser}:${config.dbpass}@${config.dblocation}/${config.dbname}?authSource=admin`;

module.exports = config;