# ToyShop - React Native E-commerce App

A modern, feature-rich e-commerce mobile application built with React Native 0.81 and TypeScript.

## 🚀 Features

- **Product Catalog**: Browse toys by categories with search functionality
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Track order status and history
- **Modern UI**: Beautiful design with Material Design icons
- **Responsive Design**: Optimized for different screen sizes
- **Accessibility**: Screen reader support and proper accessibility labels

## 📱 Screenshots

- Home Screen with featured products
- Category browsing with filters
- Product details with image gallery
- Shopping cart with order summary
- Checkout process
- Order tracking

## 🛠️ Tech Stack

- **React Native**: 0.81
- **TypeScript**: For type safety
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
│   ├── CategoryChips.tsx
│   ├── ProductCard.tsx
│   └── SearchBar.tsx
├── context/            # State management
│   └── store.tsx
├── data/               # Mock data and types
│   └── products.tsx
├── navigation/         # Navigation configuration
│   └── index.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── CartScreen.tsx
│   ├── CheckoutScreen.tsx
│   ├── OrdersScreen.tsx
│   └── DetailsScreen.tsx
└── theme.ts           # Design system and colors
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
