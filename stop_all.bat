@echo off
TITLE AquaPure - Stop All Microservices
COLOR 0C
echo =====================================================================
echo   Stopping AquaPure Java & Python Background Microservices...
echo =====================================================================
echo.
powershell -Command "Get-Process -Name java,python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*backend_java*' -or $_.CommandLine -like '*server.py*' } | Stop-Process -Force"
echo.
echo [OK] AquaPure microservices stopped.
echo.
pause

