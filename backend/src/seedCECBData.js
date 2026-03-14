const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MonitoringStation = require('./models/MonitoringStation');
const User = require('./models/User');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const cecbOffices = [
  {
    stationName: 'CECB Head Office',
    stationType: 'Head Office',
    regionalOffice: 'Raipur',
    latitude: 21.2133,
    longitude: 81.7618,
    address: 'Paryavas Bhavan, North Block, Sector-19, Nava Raipur Atal Nagar, District-Raipur (C.G.) - 492002',
    phone: '0771-2512220',
    email: 'hocecb@gmail.com',
    website: 'enviscecb.org',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-HO-001',
    status: 'Active'
  },
  {
    stationName: 'Raipur Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Raipur',
    latitude: 21.2619,
    longitude: 81.5959,
    address: 'New Office Building, Ring Road No. 2, Tatibandh, Raipur (C.G.)',
    phone: '0771-2573897',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-RPR',
    status: 'Active'
  },
  {
    stationName: 'Bilaspur Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Bilaspur',
    latitude: 22.0797,
    longitude: 82.1391,
    address: 'Vyapar Vihar, Near Pt. Deendayal Upadhyay Park, Bilaspur (C.G.)',
    phone: '07752-261172',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-BSP',
    status: 'Active'
  },
  {
    stationName: 'Durg-Bhilai Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Durg',
    latitude: 21.1938,
    longitude: 81.3509,
    address: 'Bungalow No. 5/32, Bhilai (C.G.)',
    phone: '0788-2242964',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-DURG',
    status: 'Active'
  },
  {
    stationName: 'Korba Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Korba',
    latitude: 22.3595,
    longitude: 82.7501,
    address: 'Near Tehsil Office Rampur, H.I.G. 21 and 22, Korba (C.G.) - 495677',
    phone: '07759-222370',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-KRB',
    status: 'Active'
  },
  {
    stationName: 'Raigarh Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Raigarh',
    latitude: 21.8974,
    longitude: 83.3950,
    address: 'T.V. Tower Road, Raigarh (C.G.)',
    phone: '07762-226569',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-RGR',
    status: 'Active'
  },
  {
    stationName: 'Ambikapur (Surguja) Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Surguja',
    latitude: 23.1235,
    longitude: 83.1843,
    address: 'Bajrang Bhawan, Namnakala, Ambikapur, Dist: Surguja (C.G.)',
    phone: '07774-236438',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-ABK',
    status: 'Active'
  },
  {
    stationName: 'Jagdalpur Regional Office',
    stationType: 'Regional Office',
    regionalOffice: 'Bastar',
    latitude: 19.0762,
    longitude: 82.0294,
    address: 'H.I.G. 5, Aghanpur Colony, Dharampura, Jagdalpur (C.G.)',
    phone: '07782-229367',
    parameters: [],
    units: {},
    installationDate: new Date('1970-01-01'),
    sensorType: 'Manual/Official',
    iotDeviceId: 'CECB-RO-JDP',
    status: 'Active'
  }
];

const seedCECBData = async () => {
  try {
    if (process.env.MONGODB_URI) {
      process.env.MONGODB_URI = process.env.MONGODB_URI.trim();
      console.log('URI DEBUG:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
    }
    await connectDB();
    console.log('MongoDB Connected via connectDB');

    const credentials = [];

    for (const office of cecbOffices) {
      const station = await MonitoringStation.findOneAndUpdate(
        { iotDeviceId: office.iotDeviceId },
        office,
        { upsert: true, new: true }
      );

      // Create/Update Monitoring User
      const email = office.email || `${office.iotDeviceId.toLowerCase()}@cecb.gov.in`;
      const password = `CECB@${office.iotDeviceId.split('-').pop()}`;
      
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: office.stationName,
          email,
          password,
          role: 'Monitoring Team',
          status: 'Active',
          approved_status: true
        });
      } else {
        user.password = password;
        user.role = 'Monitoring Team';
        user.approved_status = true;
        await user.save();
      }

      credentials.push({
        station: office.stationName,
        email,
        password
      });
    }

    console.log('CECB Offices Seeded/Updated Successfully');
    console.log('\n--- MONITORING TEAM CREDENTIALS ---');
    console.table(credentials);
    console.log('-----------------------------------\n');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding CECB data:', error.stack || error);
    process.exit(1);
  }
};

seedCECBData();
