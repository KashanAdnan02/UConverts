// Tab switching functionality
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Conversion logic for all tabs
function convert(type, source) {
    const fromInput = document.getElementById(`${type}-from`);
    const toInput = document.getElementById(`${type}-to`);
    const fromUnit = document.getElementById(`${type}-from-unit`).value;
    const toUnit = document.getElementById(`${type}-to-unit`).value;
    const fromValue = parseFloat(fromInput.value);

    if (isNaN(fromValue)) {
        toInput.value = '';
        return;
    }

    let result;

    // Length Conversion
    if (type === 'length') {
        const lengthFactors = {
            meters: 1,
            kilometers: 1000,
            miles: 1609.34,
            yards: 0.9144,
            feet: 0.3048,
            inches: 0.0254
        };
        const valueInMeters = fromValue * lengthFactors[fromUnit];
        result = valueInMeters / lengthFactors[toUnit];
    }

    // Area Conversion
    if (type === 'area') {
        const areaFactors = {
            'square-meters': 1,
            'square-kilometers': 1e6,
            'acres': 4046.86,
            'square-feet': 0.092903
        };
        const valueInSquareMeters = fromValue * areaFactors[fromUnit];
        result = valueInSquareMeters / areaFactors[toUnit];
    }

    // Currency Conversion (Static rates for demo purposes)
    if (type === 'currency') {
        const currencyFactors = {
            usd: 1,
            eur: 0.95, // 1 USD = 0.95 EUR
            gbp: 0.80  // 1 USD = 0.80 GBP
        };
        const valueInUSD = fromValue * currencyFactors[fromUnit];
        result = valueInUSD / currencyFactors[toUnit];
    }

    // Speed Conversion
    if (type === 'speed') {
        const speedFactors = {
            kmh: 1,
            mph: 0.621371,  // 1 km/h = 0.621371 mph
            ms: 0.277778    // 1 km/h = 0.277778 m/s
        };
        const valueInKmh = fromValue * speedFactors[fromUnit];
        result = valueInKmh / speedFactors[toUnit];
    }

    // Temperature Conversion
    if (type === 'temperature') {
        let valueInCelsius;
        if (fromUnit === 'celsius') valueInCelsius = fromValue;
        else if (fromUnit === 'fahrenheit') valueInCelsius = (fromValue - 32) * 5 / 9;
        else if (fromUnit === 'kelvin') valueInCelsius = fromValue - 273.15;

        if (toUnit === 'celsius') result = valueInCelsius;
        else if (toUnit === 'fahrenheit') result = (valueInCelsius * 9 / 5) + 32;
        else if (toUnit === 'kelvin') result = valueInCelsius + 273.15;
    }

    // Time Conversion
    if (type === 'time') {
        const timeFactors = {
            seconds: 1,
            minutes: 60,
            hours: 3600,
            days: 86400
        };
        const valueInSeconds = fromValue * timeFactors[fromUnit];
        result = valueInSeconds / timeFactors[toUnit];
    }

    // Volume Conversion
    if (type === 'volume') {
        const volumeFactors = {
            liters: 1,
            gallons: 3.78541,  // 1 gallon = 3.78541 liters
            'cubic-meters': 1000
        };
        const valueInLiters = fromValue * volumeFactors[fromUnit];
        result = valueInLiters / volumeFactors[toUnit];
    }

    // Weight/Mass Conversion
    if (type === 'weight') {
        const weightFactors = {
            kilograms: 1,
            pounds: 0.453592,  // 1 kg = 2.20462 lbs, so 1 lb = 0.453592 kg
            grams: 0.001
        };
        const valueInKilograms = fromValue * weightFactors[fromUnit];
        result = valueInKilograms / weightFactors[toUnit];
    }

    toInput.value = result ? result.toFixed(2) : '';
}

// Swap units functionality
function swapUnits(type) {
    const fromUnit = document.getElementById(`${type}-from-unit`);
    const toUnit = document.getElementById(`${type}-to-unit`);
    const fromValue = document.getElementById(`${type}-from`).value;

    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    if (fromValue) {
        convert(type, 'from');
    }
}

let year = document.getElementById("year")
const date = new Date()

year.innerText = date.getFullYear()

// Define unit categories, their units, and possible conversions
const unitCategories = {
    'Weight And Mass': {
        units: {
            'kilogram': ['kilogram', 'kg', 'kilograms', 'ka'], // 'ka' from document (likely a typo for 'kg')
            'gram': ['gram', 'g', 'grams'],
            'pound': ['pound', 'lb', 'lbs', 'pounds'],
            'ounce': ['ounce', 'oz', 'ounces'],
            'newton': ['newton', 'N', 'newtons'] // From image: kg to newtons
        },
        convertibleUnits: ['kilogram', 'gram', 'pound', 'ounce', 'newton']
    },
    'Length': {
        units: {
            'kilometer': ['kilometer', 'km', 'kilometers'],
            'mile': ['mile', 'mi', 'miles'],
            'meter': ['meter', 'm', 'meters'],
            'yard': ['yard', 'yd', 'yards'],
            'foot': ['foot', 'ft', 'feet'],
            'inch': ['inch', 'in', 'inches']
        },
        convertibleUnits: ['kilometer', 'mile', 'meter', 'yard', 'foot', 'inch']
    },
    'Temperature': {
        units: {
            'celsius': ['celsius', 'C', '°C'],
            'fahrenheit': ['fahrenheit', 'F', '°F'],
            'kelvin': ['kelvin', 'K']
        },
        convertibleUnits: ['celsius', 'fahrenheit', 'kelvin']
    },
    'Volume': {
        units: {
            'liter': ['liter', 'L', 'liters'],
            'gallon': ['gallon', 'gal', 'gallons'],
            'cubic meter': ['cubic meter', 'm³', 'm3'],
            'cubic foot': ['cubic foot', 'ft³', 'ft3']
        },
        convertibleUnits: ['liter', 'gallon', 'cubic meter', 'cubic foot']
    },
    'Area': {
        units: {
            'acre': ['acre', 'acres'],
            'square foot': ['square foot', 'ft²', 'ft2', 'square feet'],
            'square meter': ['square meter', 'm²', 'm2', 'square meters']
        },
        convertibleUnits: ['acre', 'square foot', 'square meter']
    },
    'Speed': {
        units: {
            'kilometer per hour': ['kilometer per hour', 'km/h', 'kph'],
            'mile per hour': ['mile per hour', 'mph'],
            'meter per second': ['meter per second', 'm/s']
        },
        convertibleUnits: ['kilometer per hour', 'mile per hour', 'meter per second']
    },
    'Time': {
        units: {
            'second': ['second', 's', 'seconds'],
            'minute': ['minute', 'min', 'minutes'],
            'hour': ['hour', 'hr', 'hours'],
            'day': ['day', 'd', 'days']
        },
        convertibleUnits: ['second', 'minute', 'hour', 'day']
    },
    'Currency': {
        units: {
            'usd': ['usd', 'US dollar', 'dollar', '$'],
            'eur': ['eur', 'euro', '€'],
            'gbp': ['gbp', 'pound sterling', '£']
        },
        convertibleUnits: ['usd', 'eur', 'gbp']
    },
    'Force': {
        units: {
            'kilogram-force': ['kilogram-force', 'kgf', 'kilogramforce'],
            'newton': ['newton', 'N', 'newtons']
        },
        convertibleUnits: ['kilogram-force', 'newton']
    },
    // 'Pressure': {
    //     units: {
    //         'kilogram-force/square meter': ['kilogram-force/square meter', 'kgf/m²', 'kgf/m2'],
    //         'kilogram-force/sq. cm': ['kilogram-force/sq. cm', 'kgf/cm²', 'kgf/cm2'],
    //         'kilogram-force/sq. millimeter': ['kilogram-force/sq. millimeter', 'kgf/mm²', 'kgf/mm2'],
    //         'pascal': ['pascal', 'Pa']
    //     },
    //     convertibleUnits: ['kilogram-force/square meter', 'kilogram-force/sq. cm', 'kilogram-force/sq. millimeter', 'pascal']
    // },
    // 'Energy': {
    //     units: {
    //         'kilogram-force centimeter': ['kilogram-force centimeter', 'kgf·cm', 'kgfcm'],
    //         'kilogram-force meter': ['kilogram-force meter', 'kgf·m', 'kgfm'],
    //         'joule': ['joule', 'J']
    //     },
    //     convertibleUnits: ['kilogram-force centimeter', 'kilogram-force meter', 'joule']
    // }
};

// Function to normalize unit input (lowercase, trim spaces)
function normalizeUnit(unit) {
    return unit.toLowerCase().trim();
}

// Function to search for units that start with the input string
function searchUnits(input) {
    const normalizedInput = normalizeUnit(input);
    const matchingUnits = [];

    for (let category in unitCategories) {
        const units = unitCategories[category].units;
        for (let standardUnit in units) {
            const aliases = units[standardUnit];
            if (aliases.some(alias => normalizeUnit(alias).startsWith(normalizedInput))) {
                const shortAlias = aliases.find(alias => alias.length <= 3 && alias !== standardUnit) || standardUnit;
                matchingUnits.push({ standardUnit, shortAlias, category });
            }
        }
    }

    return matchingUnits;
}

// Function to find the standard unit name and its category (for exact match)
function getStandardUnitAndCategory(unit) {
    unit = normalizeUnit(unit);
    for (let category in unitCategories) {
        const units = unitCategories[category].units;
        for (let standardUnit in units) {
            if (units[standardUnit].includes(unit)) {
                const shortAlias = units[standardUnit].find(alias => alias.length <= 3 && alias !== standardUnit) || standardUnit;
                return { standardUnit, shortAlias, category };
            }
        }
    }
    return null;
}

// Function to check both units and display feedback
function checkUnits() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const feedbackDiv = document.getElementById('feedback');
    const conversionsDiv = document.getElementById('conversions');
    const categoryInfoDiv = document.getElementById('categoryInfo');

    // Clear previous feedback
    feedbackDiv.innerHTML = '';
    feedbackDiv.className = 'feedback';
    conversionsDiv.innerHTML = '';
    categoryInfoDiv.innerHTML = '';

    // If "From Unit" is empty, show default message
    if (!fromUnit) {
        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
        return;
    }

    // Search for units that start with the "From Unit" input
    const matchingUnits = searchUnits(fromUnit);
    if (matchingUnits.length === 0) {
        feedbackDiv.innerHTML = `No units found starting with "${fromUnit}"`;
        feedbackDiv.className = 'feedback invalid';
        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
        return;
    }

    // If "To Unit" is empty, show all possible conversions for all matching units
    if (!toUnit) {
        let conversionsHTML = '<h3>Popular Conversions:</h3><ul>';
        matchingUnits.forEach(unitInfo => {
            const { standardUnit, shortAlias, category } = unitInfo;
            const convertibleUnits = unitCategories[category].convertibleUnits;
            const unitsToConvertTo = convertibleUnits.filter(u => u !== standardUnit);

            unitsToConvertTo.forEach(targetUnit => {
                const targetUnitInfo = getStandardUnitAndCategory(targetUnit);
                const targetShortAlias = targetUnitInfo ? targetUnitInfo.shortAlias : targetUnit;
                conversionsHTML += `<li>${shortAlias} to ${targetShortAlias}</li>`;
            });
        });
        conversionsHTML += '</ul>';
        conversionsDiv.innerHTML = conversionsHTML;

        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
        return;
    }

    // Validate "From Unit" for an exact match when "To Unit" is provided
    const fromUnitInfo = getStandardUnitAndCategory(fromUnit);
    if (!fromUnitInfo) {
        feedbackDiv.innerHTML = `Unit "${fromUnit}" does not exist`;
        feedbackDiv.className = 'feedback invalid';
        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
        return;
    }

    const { standardUnit: standardFromUnit, shortAlias: fromShortAlias, category: fromCategory } = fromUnitInfo;

    // Validate "To Unit"
    const toUnitInfo = getStandardUnitAndCategory(toUnit);
    if (!toUnitInfo) {
        feedbackDiv.innerHTML = `Unit "${toUnit}" does not exist`;
        feedbackDiv.className = 'feedback invalid';
        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
        return;
    }

    const { standardUnit: standardToUnit, shortAlias: toShortAlias, category: toCategory } = toUnitInfo;

    // Check if both units are in the same category
    if (fromCategory === toCategory) {
        // Show the specific conversion pair in "Popular Conversions"
        let conversionsHTML = '<h3>Popular Conversions:</h3><ul>';
        conversionsHTML += `<li>${fromShortAlias} to ${toShortAlias}</li>`;
        conversionsHTML += '</ul>';
        conversionsDiv.innerHTML = conversionsHTML;

        // Show the confirmation in "All Conversions"
        categoryInfoDiv.innerHTML = `<h3>All Conversions: (provide both units)</h3>${standardFromUnit} [${fromShortAlias}] to ${standardToUnit} [${toShortAlias}] ${fromCategory}`;
    } else {
        feedbackDiv.innerHTML = `Cannot convert: units are not compatible (${fromCategory} to ${toCategory})`;
        feedbackDiv.className = 'feedback invalid';
        categoryInfoDiv.innerHTML = '<h3>All Conversions: (provide both units)</h3>';
    }
}