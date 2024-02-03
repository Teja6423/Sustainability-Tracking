document.getElementById("calculateButton").addEventListener("click", calculateCarbonFootprint);

function calculateCarbonFootprint() {
    const hasCar = document.getElementById("carInput").value.trim().toLowerCase();
    const carKms = hasCar === "yes" ? document.getElementById("carKmInput").value.trim().toLowerCase():0;

    const hasBus = document.getElementById("busInput").value.trim().toLowerCase();
    const busKms = hasBus === "yes" ? document.getElementById("busKmInput").value.trim().toLowerCase() : 0;

    const hasBike = document.getElementById("bikeInput").value.trim().toLowerCase();
    const bikeKms = hasBike === "yes" ? document.getElementById("bikeKmInput").value.trim().toLowerCase() : 0;

    const electricBillInr = parseFloat(document.getElementById("electricBillInput").value);
    const naturalGasBillInr = parseFloat(document.getElementById("gasBillInput").value);
    const oilBillInr = parseFloat(document.getElementById("oilBillInput").value);
    const recycleNewspaper = parseInt(document.getElementById("recycleNewspaperInput").value);
    const recycleAluminumTin = parseInt(document.getElementById("recycleAluminumTinInput").value);

    // JavaScript code for calculating the carbon footprint
    function calculateTransportationEmissions(vehicleType, monthlyKmsDriven) {
        // Example emissions data (g CO2e per kilometer)
        const emissionsData = {
            car: 120 / 12,  // Convert to monthly emissions
            bus: 50 / 12,   // Convert to monthly emissions
            bike: 40 / 12,  // Convert to monthly emissions
        };

        if (emissionsData.hasOwnProperty(vehicleType)) {
            const emissionsPerKm = emissionsData[vehicleType];
            return (emissionsPerKm * monthlyKmsDriven) / 1000;  // Convert to metric tons
        } else {
            return 0;
        }
    }

    function calculateEnergyEmissions(electricBillInr, naturalGasBillInr, oilBillInr) {
        // Example emissions data (g CO2e per INR)
        const emissionsPerInrElectric = 0.6 / 1000;  // Convert to metric tons
        const emissionsPerInrGas = 0.2 / 1000;  // Convert to metric tons
        const emissionsPerInrOil = 1.0 / 1000;  // Convert to metric tons

        // Calculate monthly emissions
        const monthlyElectricEmissions = electricBillInr * emissionsPerInrElectric;
        const monthlyGasEmissions = naturalGasBillInr * emissionsPerInrGas;
        const monthlyOilEmissions = oilBillInr * emissionsPerInrOil;

        const emissions = monthlyElectricEmissions + monthlyGasEmissions + monthlyOilEmissions;

        return emissions;
    }


    function calculateRecyclingEmissions(recycleNewspaper, recycleAluminumTin) {
        // Example emissions reduction (g CO2e per item)
        const emissionsReductionNewspaper = 40 / 1000;  // Convert to metric tons
        const emissionsReductionAluminumTin = 150 / 1000;  // Convert to metric tons

        const emissionsSaved = (recycleNewspaper * emissionsReductionNewspaper +
                                recycleAluminumTin * emissionsReductionAluminumTin);

        return emissionsSaved;
    }

    // Calculate emissions for each category
    const carEmissions = calculateTransportationEmissions("car", carKms);
    const busEmissions = calculateTransportationEmissions("bus", busKms);
    const bikeEmissions = calculateTransportationEmissions("bike", bikeKms);
    const energyEmissions = calculateEnergyEmissions(electricBillInr, naturalGasBillInr, oilBillInr);
    const recyclingEmissionsSaved = calculateRecyclingEmissions(recycleNewspaper, recycleAluminumTin);

    // Calculate the total carbon footprint in metric tons
    const totalEmissions = (carEmissions + busEmissions + bikeEmissions + energyEmissions - recyclingEmissionsSaved) / 12;

    // Update the result div with the calculated value
    const resultDiv = document.getElementById("result");

    if (totalEmissions < 1) {
        const totalEmissionsKg = (totalEmissions * 1000).toFixed(2);  // Convert to kilograms
        resultDiv.innerHTML = `Your total carbon footprint is approximately ${totalEmissionsKg} kg of CO2e per month.`;
    } else {
        resultDiv.innerHTML = `Your total carbon footprint is approximately ${totalEmissions.toFixed(4)} metric tons of CO2e per month.`;
    }

    if (totalEmissions > 0) {
        resultDiv.innerHTML += "<br>Consider taking actions to reduce your carbon footprint, such as using public transportation, reducing energy consumption, or continuing to recycle newspaper and aluminum/tin. Additionally, consider using energy-efficient appliances to reduce electricity consumption.";
    } else {
        resultDiv.innerHTML += "<br>Your efforts in recycling newspaper and aluminum/tin are reducing your carbon footprint! Keep up the good work!";
    }
}
