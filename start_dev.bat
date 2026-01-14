@echo off
echo ========================================
echo   Madera Precisa - Dev Environment
echo ========================================

REM Check if venv exists
if not exist "backend\venv" (
    echo [INFO] Creating Python virtual environment...
    cd backend
    py -m venv venv
    cd ..
)

REM Backend Setup
echo [INFO] Setting up Backend...
start "Backend API" cmd /k "cd backend && call venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

REM Frontend Setup
echo [INFO] Starting Frontend...
start "Frontend App" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ----------------------------------------
echo  Servers are starting in new windows...
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:8000/docs
echo ----------------------------------------
pause
