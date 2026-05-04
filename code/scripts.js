const beerTypeSelect = document.getElementById('beerType');
const desiredCarboRange = document.getElementById('desiredCarbo');
const carboOutput = document.getElementById('carboOutput');

beerTypeSelect.addEventListener('change', () => {
    const [min, max] = beerTypeSelect.value.split(',').map(Number);
    desiredCarboRange.min = min;
    desiredCarboRange.max = max;
    desiredCarboRange.value = min;
    carboOutput.textContent = min.toFixed(1);
});

desiredCarboRange.addEventListener('input', () => {
    carboOutput.textContent = desiredCarboRange.value;
});

function calculateCarbo() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    let kegPressure = parseFloat(document.getElementById('kegPressure').value);
    const exchangeSurface = parseFloat(document.getElementById('exchangeSurface').value);
    const initialTension = parseFloat(document.getElementById('initialTension').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const desiredCarbo = parseFloat(desiredCarboRange.value);

    // La formule de pression d'équilibre est en PSI, on convertit la température en °F
    const temperatureF = (temperature * 9/5) + 32;

    const equilibriumPressurePsi = -16.6999
        - 0.010159 * temperatureF
        + 0.00116512 * temperatureF * temperatureF
        + 0.173354 * temperatureF * desiredCarbo
        + 4.24267 * desiredCarbo
        - 0.0684226 * desiredCarbo * desiredCarbo;

    const equilibriumPressureBar = equilibriumPressurePsi * 0.0689476; // 1 PSI = 0.0689476 bar
    if(kegPressure == 0){
        document.getElementById('kegPressure').value = equilibriumPressureBar.toFixed(2);
    }
    kegPressure = parseFloat(document.getElementById('kegPressure').value);

    const kH = (0.000005 * temperature * temperature - 0.0004 * temperature) + 0.0134;
    const kZero = 0.264321;
    const h = volume / 1000 / exchangeSurface;
    const k = (kH * kZero) / h;

    let carbonationDuration = NaN;

    if (kegPressure > initialTension && equilibriumPressureBar > initialTension) {
        carbonationDuration = -Math.log(1 - (equilibriumPressureBar - initialTension) / (kegPressure - initialTension)) / k;
    }

    document.getElementById('result').textContent = `Pression d'équilibre: ${equilibriumPressureBar.toFixed(2)} bar\n\nDurée de carbonatation: ${isNaN(carbonationDuration) ? 'Valeurs invalides' : `${carbonationDuration.toFixed(2)} heures`}`;
}

beerTypeSelect.dispatchEvent(new Event('change'));