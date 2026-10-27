package backend_java.model;

/**
 * Result record from executing a filtration strategy on a water sample.
 */
public record FiltrationResult(
    String strategyName,
    double poreSizeNanometers,
    double initialParticles,
    double removedParticles,
    double remainingParticles,
    double removalEfficiencyPercentage,
    boolean nanoplasticsEliminated,
    double energyKwhPerCubicMeter,
    String mechanismDescription
) {}

