package backend_java.strategy;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

public class ActivatedCarbonStrategy implements FiltrationStrategy {
    @Override
    public String getName() {
        return "Sub-Micron Extruded Carbon Block";
    }

    @Override
    public FiltrationResult execute(WaterSample sample) {
        double efficiency = 0.825; // 82.5% removal
        double initial = sample.totalParticles();
        double removed = initial * efficiency;
        double remaining = initial - removed;

        return new FiltrationResult(
            getName(),
            500.0, // 500 nanometers (0.5 microns)
            initial,
            removed,
            remaining,
            efficiency * 100.0,
            false,
            0.1,
            "Dense micro-porous carbon matrix adsorbing volatile organics while physically straining particles > 0.5 microns."
        );
    }
}

