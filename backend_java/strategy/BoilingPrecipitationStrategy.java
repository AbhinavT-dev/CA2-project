package backend_java.strategy;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

public class BoilingPrecipitationStrategy implements FiltrationStrategy {
    @Override
    public String getName() {
        return "Thermal Calcium Carbonate Co-Precipitation (Boiling)";
    }

    @Override
    public FiltrationResult execute(WaterSample sample) {
        // Efficiency is heavily dependent on Calcium hardness (CaCO3)
        // At 180 ppm CaCO3 (hard water), efficiency hits ~88-90% (ACS 2024 study)
        double hardnessFactor = Math.min(1.0, sample.calciumHardnessPpm() / 200.0);
        double efficiency = 0.50 + (0.40 * hardnessFactor); // 50% to 90%
        
        double initial = sample.totalParticles();
        double removed = initial * efficiency;
        double remaining = initial - removed;

        return new FiltrationResult(
            getName(),
            100.0, // Crystal entrapment size
            initial,
            removed,
            remaining,
            efficiency * 100.0,
            true, // Nano-particles are trapped inside limescale crystal matrix!
            1.2,
            "Thermal degassing of CO2 shifts carbonate equilibrium, precipitating crystalline CaCO3 scale that encapsulates micro- and nanoplastics."
        );
    }
}

