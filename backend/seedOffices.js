const mongoose = require('mongoose');
const dotenv = require('dotenv');
const RegionalOffice = require('./src/models/RegionalOffice');

dotenv.config();

const regionalOffices = [
  {
    office_name: 'Bilaspur Regional Office',
    district: 'Bilaspur',
    address: 'Vyapar Vihar near Pt Deendayal Garden, Bilaspur',
    office_head: 'Regional Officer Bilaspur',
    phone: '07752-261172'
  },
  {
    office_name: 'Durg-Bhilai Regional Office',
    district: 'Durg',
    address: 'Bungalow No 5/32 Bhilai',
    office_head: 'Regional Officer Durg',
    phone: '0788-2242964'
  },
  {
    office_name: 'Korba Regional Office',
    district: 'Korba',
    address: 'Near Tehsil Office Rampur, Korba',
    office_head: 'Regional Officer Korba',
    phone: '07759-222370'
  },
  {
    office_name: 'Raigarh Regional Office',
    district: 'Raigarh',
    address: 'TV Tower Road Raigarh',
    office_head: 'Regional Officer Raigarh',
    phone: '07762-226569'
  },
  {
    office_name: 'Jagdalpur Regional Office',
    district: 'Bastar',
    address: 'Aghanpur Colony Dharampura, Jagdalpur',
    office_head: 'Regional Officer Jagdalpur',
    phone: '07782-229367'
  },
  {
    office_name: 'Ambikapur Regional Office',
    district: 'Surguja',
    address: 'Bajrang Bhawan Namnakala, Ambikapur',
    office_head: 'Regional Officer Ambikapur',
    phone: '07774-236438'
  }
];

const seedOffices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await RegionalOffice.deleteMany();
    console.log('Existing offices cleared');

    await RegionalOffice.insertMany(regionalOffices);
    console.log('Regional Offices Seeded Successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding offices:', error);
    process.exit(1);
  }
};

seedOffices();
