package backend_java.strategy;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

public class UltrafiltrationStrategy implements FiltrationStrategy {
    @Override
    public String getName() {
        return "Hollow Fiber Ultrafiltration (UF)";
    }

    @Override
    public FiltrationResult execute(WaterSample sample) {
        double efficiency = 0.965; // 96.5% removal
        double initial = sample.totalParticles();
        double removed = initial * efficiency;
        double remaining = initial - removed;

        return new FiltrationResult(
            getName(),
            20.0, // 20 nanometers (0.02 microns)
            initial,
            removed,
            remaining,
            efficiency * 100.0,
            false, // Fails to stop ultrafine particles < 20nm
            0.4,
            "Porous hollow fiber bundle separating suspended microfibers and bacterial aggregates via size exclusion without chemical dosing."
        );
    }
}

