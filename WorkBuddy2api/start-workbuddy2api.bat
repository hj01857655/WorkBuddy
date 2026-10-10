@echo off
REM WorkBuddy2api start script
REM   Double-click / run by hand:  start-WorkBuddy2api.bat
REM
REM The gateway only READS ~/.workbuddy/checkin/auth.json (owned by the checkin
REM script) and refreshes an expiring token itself, so starting only requires
REM that the account has been signed in at least once.
setlocal EnableExtensions

set "DIR=%~dp0"
set "PY=%DIR%server.py"
set "PORT=8377"

REM .env may override PORT; fall back to the built-in default 8377
if exist "%DIR%.env" (
    for /f "usebackq tokens=1,* delims==" %%A in ("%DIR%.env") do (
        if /i "%%A"=="PORT" set "PORT=%%B"
    )
)
REM strip possible surrounding whitespace from PORT
set "PORT=%PORT: =%"

REM Already listening means a healthy instance is running; starting another one
REM would only hit a port conflict.
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo WorkBuddy2api already listening on %PORT% - skipped
    exit /b 0
)

cd /d "%DIR%"
REM pythonw has no console window; request.log is rotated by server.py itself
for /f "delims=" %%P in ('where pythonw.exe 2^>nul') do (
    set "PYW=%%P"
    goto :found
)
echo pythonw.exe not found in PATH - install Python or add it to PATH
exit /b 1

:found
start "" "%PYW%" "%PY%"
echo Started WorkBuddy2api on http://127.0.0.1:%PORT% ^(log: request.log^)
endlocal
