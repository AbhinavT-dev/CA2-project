package backend_java.strategy;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

public class ReverseOsmosisStrategy implements FiltrationStrategy {
    @Override
    public String getName() {
        return "Reverse Osmosis (RO) Thin-Film Membrane";
    }

    @Override
    public FiltrationResult execute(WaterSample sample) {
        double efficiency = 0.9992; // 99.92% removal
        double initial = sample.totalParticles();
        double removed = initial * efficiency;
        double remaining = initial - removed;

        return new FiltrationResult(
            getName(),
            0.1, // 0.1 nm pore size (0.0001 microns)
            initial,
            removed,
            remaining,
            efficiency * 100.0,
            true, // Nanoplastics eliminated
            2.8,  // ~2.8 kWh / m^3
            "Semi-permeable polyamide thin-film composite membrane blocking ions, nanoplastics, and PFAS via hydraulic pressure."
        );
    }
}

