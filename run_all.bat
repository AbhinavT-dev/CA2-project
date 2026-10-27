@echo off
TITLE AquaPure - Polyglot Microplastic Research Portal Launcher
COLOR 0B
echo =====================================================================
echo           AQUAPURE: MICROPLASTICS IN DRINKING WATER PORTAL
echo           Polyglot Computer Science & Engineering Architecture
echo =====================================================================
echo.
echo [1/3] Compiling Java 17 Enterprise Engine...
if not exist "bin" mkdir bin
javac -d bin backend_java\model\*.java backend_java\strategy\*.java backend_java\engine\*.java backend_java\server\*.java backend_java\Main.java
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java compilation failed. Please verify Java JDK 17 is installed.
    pause
    exit /b %ERRORLEVEL%
)
echo [OK] Java components compiled successfully into ./bin.
echo.

echo [2/3] Launching Java 17 Enterprise Microservice (Port 8080)...
start "AquaPure Java 17 Engine (Port 8080)" cmd /c "java -cp bin backend_java.Main"
echo [OK] Java Microservice dispatched to port 8080.
echo.

echo [3/3] Launching Python Flask & NumPy Analytics API (Port 5000)...
start "AquaPure Python Server (Port 5000)" cmd /c "python server.py"
echo [OK] Python Flask API dispatched to port 5000.
echo.

echo =====================================================================
echo   Waiting 2 seconds for microservices to initialize...
timeout /t 2 /nobreak >nul
echo.
echo Opening AquaPure in your default browser...
start http://localhost:5000
echo.
echo =====================================================================
echo   SYSTEM IS LIVE!
echo   - Web UI / Python Flask: http://localhost:5000
echo   - Java Microservice:     http://localhost:8080/status
echo   - Direct File Access:    index.html
echo.
echo   To shut down all background microservices, run 'stop_all.bat'.
echo =====================================================================
echo.
pause

