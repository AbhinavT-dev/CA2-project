package backend_java.model;

import java.util.Map;

/**
 * Immutable Water Sample Model in Java 17.
 * Represents physical and chemical characteristics of contaminated drinking water.
 */
public record WaterSample(
    String sampleId,
    String sourceName,
    double volumeLiters,
    long totalParticles,
    double calciumHardnessPpm,
    double turbidityNtu,
    Map<String, Double> polymerPercentages
) {
    public static WaterSample createStandardBottledWater(double volume) {
        return new WaterSample(
            "SAMPLE-BOTTLE-01",
            "Single-Use Commercial PET Bottle",
            volume,
            (long) (volume * 240_000), // ~240,000 particles/L (Columbia 2024)
            60.0,
            0.15,
            Map.of(
                "PET", 45.0,
                "Polypropylene", 25.0,
                "Polystyrene", 12.0,
                "Polyethylene", 10.0,
                "Others", 8.0
            )
        );
    }

    public static WaterSample createStandardTapWater(double volume) {
        return new WaterSample(
            "SAMPLE-TAP-01",
            "Municipal Piped Tap Water",
            volume,
            (long) (volume * 5_500), // ~5,500 particles/L
            180.0, // Hard water with calcium
            0.85,
            Map.of(
                "Nylon/Microfibers", 55.0,
                "PET", 20.0,
                "PVC", 12.0,
                "Polyethylene", 8.0,
                "Others", 5.0
            )
        );
    }
}

