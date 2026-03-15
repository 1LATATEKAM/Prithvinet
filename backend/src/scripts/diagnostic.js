try {
    console.log('--- Startup Diagnostic ---');
    console.log('Importing models...');
    require('../models/SensorData');
    console.log('Importing services...');
    require('../services/dataFetcher');
    console.log('Importing controllers...');
    require('../controllers/iotController');
    console.log('Importing routes...');
    require('../routes/iotRoutes');
    console.log('All imports successful!');
    process.exit(0);
} catch (error) {
    console.error('Diagnostic FAILED!');
    console.error(error);
    process.exit(1);
}
