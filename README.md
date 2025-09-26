# Kalifind Search Widget

An embeddable React-based search widget for e-commerce platforms, built with modern web technologies including TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Universal E-commerce Integration**: Works with Shopify, WooCommerce, and other platforms
- **Advanced Search & Filtering**: Real-time search with autocomplete, filters by category, price, color, brand, etc.
- **Mobile-First Design**: Responsive design with dedicated mobile and desktop experiences
- **Shadow DOM Isolation**: Style isolation for seamless embedding in any website
- **Performance Optimized**: Lazy loading, debounced search, and optimized bundle size
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 📋 Recent Improvements

This project has undergone a comprehensive audit and improvement process:

### ✅ Security Fixes

- **Fixed all security vulnerabilities** (previously 3 moderate vulnerabilities)
- Updated `vite` and `esbuild` to latest secure versions
- No remaining security issues

### ✅ Code Quality Improvements

- **Reduced ESLint issues from 10 to 4** (eliminated all errors)
- Fixed missing React Hook dependencies
- Replaced all `any` types with proper TypeScript types
- Removed production console.log statements

### ✅ TypeScript Configuration

- **Enabled strict mode** for better type safety
- Added `forceConsistentCasingInFileNames` for cross-platform compatibility
- Fixed invalid ES2023 library target

### ✅ Accessibility Enhancements

- Added `aria-label` and `title` attributes to all interactive buttons
- Improved keyboard navigation support
- Enhanced screen reader compatibility

### ✅ Performance & Best Practices

- **Removed inline styles** in favor of CSS classes
- Added custom animation delay classes
- Standardized package management (removed bun.lockb)
- Bundle size: 449.63 kB (127.55 kB gzipped)

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm (we've standardized on npm for consistency)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd search-insight-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build Commands

```bash
# Development build
npm run build:embed.development

# Production build
npm run build:embed.production

# Standard build
npm run build

# Preview build
npm run preview
```

### Testing

```bash
# Run E2E tests
npm run test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── KalifindSearch.tsx        # Main search component
│   ├── KalifindSearchMobile.tsx  # Mobile-specific search
│   ├── ShadowDOMSearchDropdown.tsx # Shadow DOM wrapper
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Application pages
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

### Key Components

- **KalifindSearch**: Main search component with filtering
- **ShadowDOMSearchDropdown**: Shadow DOM wrapper for style isolation
- **KalifindSearchMobile**: Mobile-optimized search interface
- **Recommendations**: Product recommendation system

## 🔧 Configuration

### Environment Variables

```bash
VITE_FRONTEND_URL=https://your-frontend-url.com
VITE_BACKEND_URL=https://your-backend-api.com/api
```

### Integration Example

```html
<!-- Embed the search widget -->
<script src="https://your-cdn.com/kalifind-search.js?storeUrl=https://your-store.com"></script>
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🧪 Testing

The project includes comprehensive E2E tests using Playwright:

- Initial state validation
- Autocomplete functionality
- Search execution
- Filter interactions
- Mobile responsiveness
- Keyboard navigation
- Loading states

## 🚀 Deployment

The widget is built as a UMD module for easy embedding:

```bash
npm run build:embed.production
```

This generates `dist/kalifind-search.js` ready for CDN deployment.

## 🔄 API Integration

The widget integrates with backend APIs for:

- Product search and filtering
- Autocomplete suggestions
- Recommendations
- Cart operations

## 📊 Performance Metrics

| Metric          | Value     |
| --------------- | --------- |
| Bundle Size     | 449.63 kB |
| Gzipped Size    | 127.55 kB |
| Load Time       | < 2s      |
| Core Web Vitals | Optimized |

## 🛡️ Security

- All dependencies updated to secure versions
- No known security vulnerabilities
- XSS protection through proper sanitization
- CSRF protection for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🆘 Support

For issues or questions:

- Create an issue in the repository
- Check the documentation
- Review the test files for usage examples

---

**Latest Update**: September 2025 - Comprehensive security and code quality improvements implemented.
