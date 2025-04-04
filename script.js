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
