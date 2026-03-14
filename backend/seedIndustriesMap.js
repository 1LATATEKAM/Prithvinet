require('dotenv').config();
const mongoose = require('mongoose');
const Industry = require('./src/models/Industry');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prithvinet';

const seedIndustries = [
  {
    industryName: 'Bhilai Steel Plant',
    address: 'Bhilai, Chhattisgarh',
    productName: 'Steel',
    productActivity: 'Manufacturing',
    productionStartingDate: new Date('1959-02-04'),
    productionCapacity: '7 Million Tonnes',
    unit: 'Tonnes',
    entityName: 'SAIL',
    entityType: 'PSU',
    incorporationDate: new Date('1973-01-24'),
    registrationNumber: 'BSP12345',
    panNumber: 'ABCDE1234F',
    officeAddress: 'Bhilai',
    contactMobile: '9876543210',
    contactEmail: 'contact@sail.in',
    ownerName: 'MoS',
    ownerMobile: '9876543210',
    ownerEmail: 'owner@sail.in',
    place: 'Bhilai',
    district: 'Durg',
    location: { type: 'Point', coordinates: [81.3509, 21.1938] },
    industryType: 'Steel plant',
    emissionFactor: 0.9,
    approval_status: 'Approved'
  },
  {
    industryName: 'NTPC Korba',
    address: 'Korba, Chhattisgarh',
    productName: 'Electricity',
    productActivity: 'Power Generation',
    productionStartingDate: new Date('1983-01-01'),
    productionCapacity: '2600 MW',
    unit: 'MW',
    entityName: 'NTPC',
    entityType: 'PSU',
    incorporationDate: new Date('1975-11-07'),
    registrationNumber: 'NTPC001',
    panNumber: 'FGHIJ5678K',
    officeAddress: 'Korba',
    contactMobile: '9876543211',
    contactEmail: 'info@ntpc.co.in',
    ownerName: 'Govt of India',
    ownerMobile: '9876543211',
    ownerEmail: 'admin@ntpc.co.in',
    place: 'Korba',
    district: 'Korba',
    location: { type: 'Point', coordinates: [82.7501, 22.3595] },
    industryType: 'Coal power plant',
    emissionFactor: 0.95,
    approval_status: 'Approved'
  },
  {
    industryName: 'ACC Cement Jamul',
    address: 'Jamul, Chhattisgarh',
    productName: 'Cement',
    productActivity: 'Manufacturing',
    productionStartingDate: new Date('1965-01-01'),
    productionCapacity: '1.5 Million Tonnes',
    unit: 'Tonnes',
    entityName: 'ACC Limited',
    entityType: 'Private',
    incorporationDate: new Date('1936-08-01'),
    registrationNumber: 'ACC001',
    panNumber: 'KLMNO9012P',
    officeAddress: 'Jamul',
    contactMobile: '9876543212',
    contactEmail: 'jamul@acclimited.com',
    ownerName: 'Adani Group',
    ownerMobile: '9876543212',
    ownerEmail: 'owner@acclimited.com',
    place: 'Jamul',
    district: 'Durg',
    location: { type: 'Point', coordinates: [81.3650, 21.2150] },
    industryType: 'Cement factory',
    emissionFactor: 0.7,
    approval_status: 'Approved'
  },
  {
    industryName: 'Jindal Steel & Power',
    address: 'Raigarh, Chhattisgarh',
    productName: 'Steel & Power',
    productActivity: 'Manufacturing',
    productionStartingDate: new Date('1990-01-01'),
    productionCapacity: '3 Million Tonnes',
    unit: 'Tonnes',
    entityName: 'JSPL',
    entityType: 'Private',
    incorporationDate: new Date('1979-01-01'),
    registrationNumber: 'JSPL001',
    panNumber: 'QRSTU3456V',
    officeAddress: 'Raigarh',
    contactMobile: '9876543213',
    contactEmail: 'raigarh@jspl.com',
    ownerName: 'Naveen Jindal',
    ownerMobile: '9876543213',
    ownerEmail: 'owner@jspl.com',
    place: 'Raigarh',
    district: 'Raigarh',
    location: { type: 'Point', coordinates: [83.3950, 21.8974] },
    industryType: 'Steel plant',
    emissionFactor: 0.85,
    approval_status: 'Approved'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing industries (optional - maybe only seed if empty)
    // await Industry.deleteMany({ industryName: { $in: seedIndustries.map(i => i.industryName) } });
    
    for (const ind of seedIndustries) {
      await Industry.findOneAndUpdate(
        { industryName: ind.industryName },
        ind,
        { upsert: true, new: true }
      );
    }
    
    console.log('Industries seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
