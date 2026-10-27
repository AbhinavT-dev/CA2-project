package backend_java;

import backend_java.server.JavaEnterpriseServer;

public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Starting AquaPure Java 17 Enterprise Engine...");
            JavaEnterpriseServer server = new JavaEnterpriseServer();
            server.start();
        } catch (Exception e) {
            System.err.println("Error initializing Java Server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

