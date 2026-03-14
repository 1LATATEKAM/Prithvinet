const Alert = require('../models/Alert');
const Industry = require('../models/Industry');

const THRESHOLDS = {
  Air: {
    'PM2.5': 60,
    'PM10': 100,
    'SO2': 80,
    'NO2': 80,
    'CO': 2
  },
  Water: {
    'pH': { min: 6.5, max: 8.5 },
    'BOD': 30,
    'COD': 250,
    'DO': { min: 4 } // Minimum Dissolved Oxygen
  },
  Noise: {
    'Daytime (Leq)': 75,
    'Nighttime (Leq)': 70
  }
};

const checkAndTriggerAlerts = async (log) => {
  const { monitoring_type, value, region, submitted_by, station, industry } = log;
  const thresholds = THRESHOLDS[monitoring_type];

  if (!thresholds) return;

  const breaches = [];

  for (const [param, val] of value.entries()) {
    const threshold = thresholds[param];
    if (!threshold) continue;

    let isBreached = false;
    if (typeof threshold === 'number') {
      if (val > threshold) isBreached = true;
    } else if (threshold.max !== undefined && val > threshold.max) {
      isBreached = true;
    } else if (threshold.min !== undefined && val < threshold.min) {
      isBreached = true;
    }

    if (isBreached) {
      breaches.push({
        parameter: param,
        value: val,
        limit: typeof threshold === 'number' ? threshold : (threshold.max || threshold.min)
      });
    }
  }

  if (breaches.length > 0) {
    for (const breach of breaches) {
      await Alert.create({
        alert_type: 'Pollution Exceedance',
        parameter: breach.parameter,
        value: breach.value,
        limit: breach.limit,
        location: log.location?.address || 'Unknown Location',
        station,
        industry,
        region,
        timestamp: log.timestamp
      });
    }
  }
};

module.exports = { checkAndTriggerAlerts };
