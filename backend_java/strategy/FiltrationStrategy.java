package backend_java.strategy;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

/**
 * Strategy Pattern Interface for Water Filtration Technologies.
 */
public interface FiltrationStrategy {
    String getName();
    FiltrationResult execute(WaterSample sample);
}

