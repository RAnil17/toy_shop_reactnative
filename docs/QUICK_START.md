# 🚀 Quick Start Guide - Adding Screenshots & Videos

## 📸 Adding Your Screenshots

### Step 1: Save Your Screenshots
1. **Copy your screenshots** to the `docs/screenshots/` directory
2. **Rename them** according to this naming convention:
   - `home-screen.png` - Home screen with featured toys
   - `product-details.png` - Product details with add to cart
   - `shopping-cart.png` - Shopping cart with items
   - `checkout-screen.png` - Checkout process
   - `orders-screen.png` - Orders history

### Step 2: Upload to GitHub
```bash
# Add screenshots to git
git add docs/screenshots/

# Commit the changes
git commit -m "Add app screenshots"

# Push to GitHub
git push origin main
```

## 🎥 Recording Demo Video

### Option 1: Using the Windows Script (Recommended)
1. **Run the recording script:**
   ```bash
   cd docs
   record-demo.bat
   ```

2. **Follow the on-screen instructions** to record your demo

3. **Upload the video:**
   ```bash
   git add docs/videos/toy-shop-demo.mp4
   git commit -m "Add app demo video"
   git push origin main
   ```

### Option 2: Manual Recording
1. **Use your device's built-in screen recorder**
2. **Follow the demo script** from `SCREENSHOTS_AND_VIDEOS.md`
3. **Save the video** as `docs/videos/app-demo.mp4`
4. **Upload to GitHub** using the commands above

## 📋 Demo Video Script (Quick Version)

**Duration:** 2-3 minutes

1. **Home Screen (30 seconds)**
   - Show welcome message
   - Demonstrate search bar
   - Show category filters
   - Highlight side-by-side product cards

2. **Product Details (30 seconds)**
   - Tap on a product
   - Show product information
   - Add item to cart
   - Show confirmation popup

3. **Shopping Cart (30 seconds)**
   - Navigate to cart
   - Show cart items
   - Change quantities
   - Show order summary

4. **Checkout (30 seconds)**
   - Proceed to checkout
   - Fill form fields
   - Select payment method
   - Complete order

5. **Orders (30 seconds)**
   - Navigate to orders
   - Show order history
   - Display order status

## 🎯 Tips for Great Screenshots & Videos

### Screenshots:
- ✅ Take screenshots in good lighting
- ✅ Show the most important features
- ✅ Use consistent device orientation
- ✅ Keep file sizes under 2MB

### Videos:
- ✅ Keep it under 3 minutes
- ✅ Show smooth navigation
- ✅ Highlight key features
- ✅ Use clear, slow movements
- ✅ Keep file size under 50MB

## 📁 File Structure After Upload

```
docs/
├── screenshots/
│   ├── home-screen.png
│   ├── product-details.png
│   ├── shopping-cart.png
│   ├── checkout-screen.png
│   └── orders-screen.png
├── videos/
│   └── app-demo.mp4
├── SCREENSHOTS_AND_VIDEOS.md
├── QUICK_START.md
├── record-demo.sh
└── record-demo.bat
```

## 🔗 Your Repository Will Show

After uploading, your GitHub repository will display:
- ✅ **Professional screenshots** in the README
- ✅ **Embedded demo video** for easy viewing
- ✅ **Clear feature documentation**
- ✅ **Professional presentation**

---

**Need help?** Check the detailed guide in `docs/SCREENSHOTS_AND_VIDEOS.md`
