#!/bin/bash

# ToyShop App Demo Video Recording Script
# This script helps you record a demo video of your React Native app

echo "🎥 ToyShop App Demo Video Recorder"
echo "=================================="

# Check if ADB is available
if ! command -v adb &> /dev/null; then
    echo "❌ ADB not found. Please install Android SDK and add it to your PATH."
    exit 1
fi

# Check if device is connected
echo "📱 Checking for connected devices..."
adb devices

# Get device ID
DEVICE_ID=$(adb devices | grep -v "List" | grep -v "daemon" | head -n 1 | cut -f1)

if [ -z "$DEVICE_ID" ]; then
    echo "❌ No Android device found. Please connect your device and enable USB debugging."
    exit 1
fi

echo "✅ Device found: $DEVICE_ID"

# Create videos directory if it doesn't exist
mkdir -p docs/videos

# Set recording parameters
RECORDING_FILE="/sdcard/toy-shop-demo.mp4"
LOCAL_FILE="docs/videos/toy-shop-demo.mp4"

echo ""
echo "🎬 Starting screen recording..."
echo "📝 Instructions:"
echo "   1. Navigate through your app following the demo script"
echo "   2. Show all key features (Home, Search, Cart, Checkout, Orders)"
echo "   3. Keep the demo under 3 minutes"
echo "   4. Press Ctrl+C when done recording"
echo ""

# Start recording
echo "⏺️  Recording started... (Press Ctrl+C to stop)"
adb shell screenrecord $RECORDING_FILE

echo ""
echo "📥 Downloading recording..."
adb pull $RECORDING_FILE $LOCAL_FILE

if [ -f "$LOCAL_FILE" ]; then
    echo "✅ Recording saved to: $LOCAL_FILE"
    echo "📊 File size: $(du -h $LOCAL_FILE | cut -f1)"
    
    # Clean up device file
    adb shell rm $RECORDING_FILE
    echo "🧹 Cleaned up device recording file"
    
    echo ""
    echo "🎉 Demo video recording complete!"
    echo "📁 You can now add this video to your GitHub repository:"
    echo "   git add docs/videos/toy-shop-demo.mp4"
    echo "   git commit -m 'Add app demo video'"
    echo "   git push origin main"
else
    echo "❌ Failed to download recording"
    exit 1
fi
