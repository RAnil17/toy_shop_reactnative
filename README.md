# ToyShop - React Native E-commerce App

A modern, feature-rich e-commerce mobile application built with React Native 0.81 and JavaScript.

## 🚀 Features

- **Product Catalog**: Browse toys by categories with search functionality
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Track order status and history
- **Modern UI**: Beautiful design with Material Design icons
- **Responsive Design**: Optimized for different screen sizes
- **Accessibility**: Screen reader support and proper accessibility labels

## 📱 App Screenshots

> **📸 Screenshots Coming Soon!** 
> 
> To add screenshots to your repository:
> 1. Take screenshots of your app
> 2. Save them as `docs/screenshots/home-screen.png`, `docs/screenshots/shopping-cart.png`, etc.
> 3. Run: `git add docs/screenshots/ && git commit -m "Add screenshots" && git push origin main`

### Screenshots to Add:
- **Home Screen** - Welcome screen with featured toys and category filters
- **Product Details** - Product information with add to cart functionality  
- **Shopping Cart** - Cart management with quantity controls and order summary
- **Checkout** - Checkout process with payment options
- **Orders** - Order history and tracking

### Quick Setup:
```bash
# Copy your screenshots to docs/screenshots/ with these exact names:
# - home-screen.png
# - product-details.png  
# - shopping-cart.png
# - checkout-screen.png
# - orders-screen.png

# Then upload them:
git add docs/screenshots/
git commit -m "Add app screenshots"
git push origin main
```

## 🎥 Demo Video

> **🎬 Demo Video Coming Soon!**
> 
> To add a demo video:
> 1. Record a 2-3 minute demo of your app
> 2. Save it as `docs/videos/app-demo.mp4`
> 3. Run: `git add docs/videos/ && git commit -m "Add demo video" && git push origin main`

### Video Recording Options:
- **Use the provided script:** `cd docs && record-demo.bat`
- **Manual recording:** Use your device's built-in screen recorder
- **Follow the script:** See `docs/QUICK_START.md` for detailed instructions

## 🚀 Features Demonstrated

- **Modern UI/UX** with side-by-side product cards
- **Search & Filter** functionality
- **Shopping Cart** management
- **Checkout Process** with payment options
- **Order Tracking** and history
- **Responsive Design** for mobile devices

## 🛠️ Tech Stack

- **React Native**: 0.81
- **JavaScript**: Modern ES6+ syntax
- **React Navigation**: For navigation between screens
- **React Native Vector Icons**: For beautiful icons
- **AsyncStorage**: For local data persistence
- **Context API**: For state management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RAnil17/toyshop-reactnative.git
   cd toyshop-reactnative
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (if developing for iOS)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # For Android
   npx react-native run-android
   
   # For iOS
   npx react-native run-ios
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryChips.js
│   ├── ProductCard.js
│   └── SearchBar.js
├── context/            # State management
│   └── store.js
├── data/               # Mock data
│   └── products.js
├── navigation/         # Navigation configuration
│   └── index.js
├── screens/            # App screens
│   ├── HomeScreen.js
│   ├── CartScreen.js
│   ├── checkoutScreen.js
│   ├── ordersScreen.js
│   ├── detailsScreen.js
│   └── CategoriesScreen.js
└── theme.js           # Design system and colors
```

## 🎨 Design System

The app uses a consistent design system with:
- **Colors**: Primary, secondary, accent, and semantic colors
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing units
- **Icons**: Material Community Icons throughout the app

## 🔧 Key Features Implementation

### Product Management
- Product listing with categories
- Search functionality
- Product details with image gallery
- Wishlist functionality

### Shopping Cart
- Add/remove items
- Quantity management
- Price calculation with tax
- Order summary

### Order System
- Order placement
- Order tracking
- Order history
- Status updates

## 📱 Platform Support

- **Android**: Fully supported
- **iOS**: Ready for iOS development (requires macOS)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anil Ramavath**
- GitHub: [@RAnil17](https://github.com/RAnil17)
- LinkedIn: [in/anil-ramavath](https://linkedin.com/in/anil-ramavath)

## 🙏 Acknowledgments

- React Native community
- Material Design for icons
- All contributors and testers

---

⭐ Star this repository if you found it helpful!
