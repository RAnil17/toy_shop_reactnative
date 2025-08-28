@echo off
REM ToyShop App Demo Video Recording Script for Windows
REM This script helps you record a demo video of your React Native app

echo 🎥 ToyShop App Demo Video Recorder
echo ==================================

REM Check if ADB is available
adb version >nul 2>&1
if errorlevel 1 (
    echo ❌ ADB not found. Please install Android SDK and add it to your PATH.
    pause
    exit /b 1
)

REM Check if device is connected
echo 📱 Checking for connected devices...
adb devices

REM Get device ID
for /f "tokens=1" %%i in ('adb devices ^| findstr /v "List" ^| findstr /v "daemon"') do (
    set DEVICE_ID=%%i
    goto :found_device
)

echo ❌ No Android device found. Please connect your device and enable USB debugging.
pause
exit /b 1

:found_device
echo ✅ Device found: %DEVICE_ID%

REM Create videos directory if it doesn't exist
if not exist "docs\videos" mkdir docs\videos

REM Set recording parameters
set RECORDING_FILE=/sdcard/toy-shop-demo.mp4
set LOCAL_FILE=docs\videos\toy-shop-demo.mp4

echo.
echo 🎬 Starting screen recording...
echo 📝 Instructions:
echo    1. Navigate through your app following the demo script
echo    2. Show all key features (Home, Search, Cart, Checkout, Orders)
echo    3. Keep the demo under 3 minutes
echo    4. Press Ctrl+C when done recording
echo.

REM Start recording
echo ⏺️  Recording started... (Press Ctrl+C to stop)
adb shell screenrecord %RECORDING_FILE%

echo.
echo 📥 Downloading recording...
adb pull %RECORDING_FILE% %LOCAL_FILE%

if exist "%LOCAL_FILE%" (
    echo ✅ Recording saved to: %LOCAL_FILE%
    
    REM Clean up device file
    adb shell rm %RECORDING_FILE%
    echo 🧹 Cleaned up device recording file
    
    echo.
    echo 🎉 Demo video recording complete!
    echo 📁 You can now add this video to your GitHub repository:
    echo    git add docs/videos/toy-shop-demo.mp4
    echo    git commit -m "Add app demo video"
    echo    git push origin main
) else (
    echo ❌ Failed to download recording
)

pause
