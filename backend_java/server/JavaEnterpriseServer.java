package backend_java.server;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import backend_java.engine.SimulationEngine;
import backend_java.model.FiltrationResult;
import backend_java.model.WaterSample;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Enterprise Microservice HTTP Server built with native Java JDK 17.
 * Zero external dependencies. Runs on port 8080.
 */
public class JavaEnterpriseServer {

    private static final int PORT = 8080;
    private final HttpServer server;
    private final SimulationEngine engine;

    public JavaEnterpriseServer() throws IOException {
        this.engine = new SimulationEngine();
        this.server = HttpServer.create(new InetSocketAddress(PORT), 0);
        this.server.setExecutor(java.util.concurrent.Executors.newCachedThreadPool());

        registerRoutes();
    }

    private void registerRoutes() {
        // Status Endpoint
        server.createContext("/status", exchange -> {
            addCors(exchange);
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                sendResponse(exchange, 200, "{}");
                return;
            }

            Runtime rt = Runtime.getRuntime();
            long freeMem = rt.freeMemory() / (1024 * 1024);
            long totalMem = rt.totalMemory() / (1024 * 1024);

            String json = """
                {
                    "status": "online",
                    "engine": "Java 17 High-Performance Enterprise Engine",
                    "threads_active": %d,
                    "free_memory_mb": %d,
                    "total_memory_mb": %d,
                    "architecture": "Strategy Pattern + Concurrent Pipeline",
                    "capabilities": [
                        "Multi-Threaded Microplastic Removal Simulation",
                        "Thermodynamic CaCO3 Precipitation Analytics",
                        "Membrane Pore Exclusion Benchmarking"
                    ]
                }
                """.formatted(rt.availableProcessors(), freeMem, totalMem);

            sendResponse(exchange, 200, json);
        });

        // Parallel Simulation Endpoint
        server.createContext("/simulate", exchange -> {
            addCors(exchange);
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                sendResponse(exchange, 200, "{}");
                return;
            }

            WaterSample tapSample = WaterSample.createStandardTapWater(100.0);
            List<FiltrationResult> results = engine.runParallelSimulation(tapSample);

            StringBuilder sb = new StringBuilder();
            sb.append("{\n");
            sb.append("  \"engine\": \"Java 17 Concurrent Benchmark\",\n");
            sb.append("  \"sample\": \"Municipal Tap Water (100 Liters)\",\n");
            sb.append("  \"initial_particles\": ").append(tapSample.totalParticles()).append(",\n");
            sb.append("  \"results\": [\n");

            for (int i = 0; i < results.size(); i++) {
                FiltrationResult r = results.get(i);
                sb.append(String.format("""
                    {
                      "strategy": "%s",
                      "pore_size_nm": %.2f,
                      "efficiency_pct": %.2f,
                      "removed_particles": %.0f,
                      "remaining_particles": %.0f,
                      "nanoplastics_stopped": %b,
                      "energy_kwh_m3": %.2f,
                      "mechanism": "%s"
                    }%s
                    """,
                    r.strategyName(),
                    r.poreSizeNanometers(),
                    r.removalEfficiencyPercentage(),
                    r.removedParticles(),
                    r.remainingParticles(),
                    r.nanoplasticsEliminated(),
                    r.energyKwhPerCubicMeter(),
                    r.mechanismDescription(),
                    (i < results.size() - 1 ? "," : "")
                ));
            }

            sb.append("  ]\n}");
            sendResponse(exchange, 200, sb.toString());
        });

        // 100,000 Liter Municipal Benchmark
        server.createContext("/benchmark", exchange -> {
            addCors(exchange);
            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                sendResponse(exchange, 200, "{}");
                return;
            }

            long start = System.currentTimeMillis();
            WaterSample industrialBatch = WaterSample.createStandardTapWater(100_000.0);
            List<FiltrationResult> results = engine.runParallelSimulation(industrialBatch);
            long durationMs = System.currentTimeMillis() - start;

            String json = """
                {
                    "benchmark": "100,000 Liters Continuous Municipal Stream",
                    "execution_time_ms": %d,
                    "total_particles_processed": %d,
                    "status": "Completed across all concurrent filter workers"
                }
                """.formatted(durationMs, industrialBatch.totalParticles());

            sendResponse(exchange, 200, json);
        });
    }

    private void addCors(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
    }

    private void sendResponse(HttpExchange exchange, int code, String response) throws IOException {
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    public void start() {
        server.start();
        System.out.println("============================================================");
        System.out.println(" AquaPure Java 17 Enterprise Engine");
        System.out.println(" Listening on http://localhost:" + PORT);
        System.out.println(" Endpoints: /status, /simulate, /benchmark");
        System.out.println("============================================================");
    }

    public static void main(String[] args) throws IOException {
        JavaEnterpriseServer server = new JavaEnterpriseServer();
        server.start();
    }
}
