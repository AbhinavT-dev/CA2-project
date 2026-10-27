package backend_java.engine;

import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;
import backend_java.strategy.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * High-Performance Multi-Threaded Simulation Engine in Java 17.
 * Uses Java Concurrency (ExecutorService & CompletableFuture) to benchmark
 * filtration technologies simultaneously across municipal water streams.
 */
public class SimulationEngine {

    private final ExecutorService executor;
    private final List<FiltrationStrategy> strategies;

    public SimulationEngine() {
        // Multi-threaded thread pool based on available CPU cores
        int cores = Runtime.getRuntime().availableProcessors();
        this.executor = Executors.newFixedThreadPool(Math.max(2, cores));
        this.strategies = List.of(
            new ReverseOsmosisStrategy(),
            new BoilingPrecipitationStrategy(),
            new UltrafiltrationStrategy(),
            new ActivatedCarbonStrategy()
        );
    }

    public List<FiltrationResult> runParallelSimulation(WaterSample sample) {
        List<CompletableFuture<FiltrationResult>> futures = strategies.stream()
            .map(strategy -> CompletableFuture.supplyAsync(() -> {
                long start = System.nanoTime();
                FiltrationResult res = strategy.execute(sample);
                long durationUs = (System.nanoTime() - start) / 1000;
                // Output benchmark log
                System.out.printf("[Java-Engine] Executed %s in %d µs (Efficiency: %.2f%%)%n",
                    strategy.getName(), durationUs, res.removalEfficiencyPercentage());
                return res;
            }, executor))
            .toList();

        return futures.stream()
            .map(CompletableFuture::join)
            .toList();
    }

    public void shutdown() {
        executor.shutdown();
    }
}

