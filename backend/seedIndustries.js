const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Industry = require('./src/models/Industry');
const MonitoringStation = require('./src/models/MonitoringStation');

dotenv.config({ path: path.join(__dirname, '.env') });

const industriesData = [
  {
    industryName: 'Bhilai Steel Plant (SAIL)',
    address: 'Bhilai, Durg District, Chhattisgarh',
    productName: 'Steel Rails, Plates, Structurals',
    productActivity: 'Integrated Steel Manufacturing',
    productionStartingDate: new Date('1959-02-04'),
    productionCapacity: '7.5',
    unit: 'Million Tons/Year',
    entityName: 'Steel Authority of India Limited',
    entityType: 'Maharatna PSU',
    incorporationDate: new Date('1954-01-19'),
    registrationNumber: 'L27109DL1973GOI006454',
    panNumber: 'AAACS1234S',
    officeAddress: 'Ispat Bhavan, Bhilai',
    contactMobile: '07882223456',
    contactEmail: 'contact@sail-bhilai.in',
    ownerName: 'Chairman, SAIL',
    ownerEmail: 'chairman@sail.in',
    ownerMobile: '01124367481',
    place: 'Bhilai',
    district: 'Durg',
    location: { type: 'Point', coordinates: [81.3509, 21.1938] },
    industryType: 'Steel plant'
  },
  {
    industryName: 'NTPC Korba Super Thermal Power Station',
    address: 'Jamnipali, Korba District, Chhattisgarh',
    productName: 'Electricity',
    productActivity: 'Thermal Power Generation',
    productionStartingDate: new Date('1983-03-01'),
    productionCapacity: '2600',
    unit: 'MW',
    entityName: 'NTPC Limited',
    entityType: 'Maharatna PSU',
    incorporationDate: new Date('1975-11-07'),
    registrationNumber: 'L40101DL1975GOI007966',
    panNumber: 'AAACN1234T',
    officeAddress: 'Jamnipali, Korba',
    contactMobile: '07759232323',
    contactEmail: 'info@ntpc-korba.co.in',
    ownerName: 'CMD, NTPC',
    ownerEmail: 'cmd@ntpc.co.in',
    ownerMobile: '01124360100',
    place: 'Korba',
    district: 'Korba',
    location: { type: 'Point', coordinates: [82.7501, 22.3595] },
    industryType: 'Coal power plant'
  },
  {
    industryName: 'BALCO Aluminium Smelter',
    address: 'Korba, Chhattisgarh',
    productName: 'Aluminium Ingots, Wire Rods',
    productActivity: 'Aluminium Smelting',
    productionStartingDate: new Date('1965-11-27'),
    productionCapacity: '570',
    unit: 'KTPA',
    entityName: 'Bharat Aluminium Company Limited',
    entityType: 'Private Limited (Vedanta)',
    incorporationDate: new Date('1965-11-27'),
    registrationNumber: 'U27203DL1965GOI004501',
    panNumber: 'AAACB1234A',
    officeAddress: 'BALCO Nagar, Korba',
    contactMobile: '07759242000',
    contactEmail: 'contact@balco.in',
    ownerName: 'CEO, BALCO',
    ownerEmail: 'ceo@balco.in',
    ownerMobile: '07759242001',
    place: 'Korba',
    district: 'Korba',
    location: { type: 'Point', coordinates: [82.7300, 22.3500] },
    industryType: 'Other'
  },
  {
    industryName: 'Jindal Steel & Power Ltd (JSPL)',
    address: 'Raigarh, Chhattisgarh',
    productName: 'Sponge Iron, Steel Bars',
    productActivity: 'Steel and Power',
    productionStartingDate: new Date('1991-01-01'),
    productionCapacity: '3',
    unit: 'Million Tons/Year',
    entityName: 'Jindal Steel & Power Limited',
    entityType: 'Public Limited',
    incorporationDate: new Date('1979-09-28'),
    registrationNumber: 'L27105HR1979PLC009913',
    panNumber: 'AAACJ1234S',
    officeAddress: 'Kharsia Road, Raigarh',
    contactMobile: '07762227001',
    contactEmail: 'info@jindalsteel.com',
    ownerName: 'Naveen Jindal',
    ownerEmail: 'naveen@jindalsteel.com',
    ownerMobile: '01125740441',
    place: 'Raigarh',
    district: 'Raigarh',
    location: { type: 'Point', coordinates: [83.3950, 21.8974] },
    industryType: 'Steel plant'
  },
  {
    industryName: 'UltraTech Cement (Rawan Unit)',
    address: 'Rawan, Baloda Bazar District, Chhattisgarh',
    productName: 'Cement',
    productActivity: 'Cement Manufacturing',
    productionStartingDate: new Date('1995-10-12'),
    productionCapacity: '4.5',
    unit: 'Million Tons/Year',
    entityName: 'UltraTech Cement Limited',
    entityType: 'Public Limited',
    incorporationDate: new Date('2000-08-24'),
    registrationNumber: 'L26940MH2000PLC128420',
    panNumber: 'AAACU1234C',
    officeAddress: 'Rawan, PO: Grasim Vihar',
    contactMobile: '07727220000',
    contactEmail: 'contact@ultratech.in',
    ownerName: 'Kumar Mangalam Birla',
    ownerEmail: 'km.birla@adityabirla.com',
    ownerMobile: '02266525000',
    place: 'Rawan',
    district: 'Baloda Bazar',
    location: { type: 'Point', coordinates: [82.0494, 21.6515] },
    industryType: 'Cement factory'
  },
  {
    industryName: 'NMDC Bailadila Iron Ore Mines',
    address: 'Kirandul, Dantewada District, Chhattisgarh',
    productName: 'Iron Ore',
    productActivity: 'Iron Ore Mining',
    productionStartingDate: new Date('1968-01-01'),
    productionCapacity: '35',
    unit: 'Million Tons/Year',
    entityName: 'NMDC Limited',
    entityType: 'Navratna PSU',
    incorporationDate: new Date('1958-11-15'),
    registrationNumber: 'L13100TG1958GOI000781',
    panNumber: 'AAACN1234M',
    officeAddress: 'Kirandul, Dantewada',
    contactMobile: '07857255011',
    contactEmail: 'info@nmdc.co.in',
    ownerName: 'CMD, NMDC',
    ownerEmail: 'cmd@nmdc.co.in',
    ownerMobile: '04023538713',
    place: 'Kirandul',
    district: 'Dantewada',
    location: { type: 'Point', coordinates: [81.2408, 18.6236] },
    industryType: 'Other'
  },
  {
    industryName: 'SECL Gevra Open Cast Mine',
    address: 'Korba, Chhattisgarh',
    productName: 'Coal',
    productActivity: 'Coal Mining',
    productionStartingDate: new Date('1981-01-01'),
    productionCapacity: '45',
    unit: 'Million Tons/Year',
    entityName: 'South Eastern Coalfields Limited',
    entityType: 'Miniratna PSU',
    incorporationDate: new Date('1985-11-28'),
    registrationNumber: 'U10101CT1985GOI003100',
    panNumber: 'AAACS1234L',
    officeAddress: 'Gevra Project, Korba',
    contactMobile: '07759232323',
    contactEmail: 'info@secl.co.in',
    ownerName: 'CMD, SECL',
    ownerEmail: 'cmd@secl.co.in',
    ownerMobile: '07752246300',
    place: 'Gevra',
    district: 'Korba',
    location: { type: 'Point', coordinates: [82.6800, 22.3800] },
    industryType: 'Other'
  },
  {
    industryName: 'Sarda Energy & Minerals Ltd',
    address: 'Siltara, Raipur, Chhattisgarh',
    productName: 'Sponge Iron, Billets',
    productActivity: 'Steel and Ferro Alloys',
    productionStartingDate: new Date('1973-01-01'),
    productionCapacity: '0.6',
    unit: 'Million Tons/Year',
    entityName: 'Sarda Energy & Minerals Limited',
    entityType: 'Public Limited',
    incorporationDate: new Date('1973-01-01'),
    registrationNumber: 'L27100CT1973PLC001196',
    panNumber: 'AAACS1234E',
    officeAddress: 'Siltara Industrial Area, Raipur',
    contactMobile: '07712216100',
    contactEmail: 'info@seml.co.in',
    ownerName: 'K.K. Sarda',
    ownerEmail: 'kk.sarda@seml.co.in',
    ownerMobile: '07712216101',
    place: 'Raipur',
    district: 'Raipur',
    location: { type: 'Point', coordinates: [81.6706, 21.3653] },
    industryType: 'Steel plant'
  }
];

const getDistance = (lat1, lon1, lat2, lon2) => {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
};

const seedIndustries = async () => {
  try {
    const uri = (process.env.MONGODB_URI || '').trim();
    if (!uri) throw new Error('MONGODB_URI not found');
    await mongoose.connect(uri);
    console.log('MongoDB Connected');

    // Get all ROs
    const offices = await MonitoringStation.find({ 
      stationType: { $in: ['Head Office', 'Regional Office'] } 
    });

    console.log(`Found ${offices.length} Regional Offices for assignment.`);

    // Clear existing industries
    await Industry.deleteMany({});
    console.log('Cleared existing industry data.');

    for (const ind of industriesData) {
      // Find nearest RO
      let nearestRO = null;
      let minDistance = Infinity;

      for (const office of offices) {
        const dist = getDistance(
          ind.location.coordinates[1], ind.location.coordinates[0],
          office.latitude, office.longitude
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearestRO = office;
        }
      }

      // Assign nearest RO's jurisdiction info
      // Note: We use the regionalOffice name/district info for UI, 
      // and we could assign the regional_officer_id if we had User IDs.
      // For now, let's just make sure the industry is saved with the correct district/place.
      
      const newIndustry = await Industry.create({
        ...ind,
        approval_status: 'Pending' // All new major industries start as pending for review
      });
      console.log(`Seeded: ${ind.industryName} (Nearest RO: ${nearestRO?.stationName || 'N/A'})`);
    }

    console.log('Real Chhattisgarh Industries Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding industries:', error);
    process.exit(1);
  }
};

seedIndustries();
