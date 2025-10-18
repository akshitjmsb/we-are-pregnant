# We are Pregnant

A comprehensive, interactive guide for expectant parents navigating pregnancy in Montreal, Quebec. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Interactive Action Plan**: Checklist with local storage persistence
- **Healthcare Navigation**: Step-by-step guide to Quebec healthcare system
- **QPIP Calculator**: Calculate maternity/paternity benefits with real-time updates
- **Pregnancy Timeline**: Month-by-month development tracking with interactive charts
- **Local Resources**: Montreal-specific hospitals, contacts, and services
- **Wellness Guide**: Nutrition, exercise, and mental health tips
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: ARIA attributes and keyboard navigation

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Testing**: Vitest + Testing Library
- **State Management**: React hooks with localStorage

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ActionPlan.tsx
│   ├── HealthcareGuide.tsx
│   ├── QPIPCalculator.tsx
│   ├── Timeline.tsx
│   ├── Resources.tsx
│   ├── KeyContacts.tsx
│   ├── Wellness.tsx
│   └── ErrorBoundary.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useErrorHandler.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── localStorage.ts
│   ├── qpipCalculations.ts
│   └── __tests__/      # Unit tests
├── test/               # Test setup
│   └── setup.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🧪 Testing

The project includes comprehensive unit tests for utility functions:

- QPIP calculation logic
- Local storage management
- Error handling
- Currency formatting

Tests are written using Vitest and Testing Library for React components.

## 🎨 Design System

The application uses a custom color palette optimized for pregnancy-related content:

- **Primary**: Warm, calming tones (#AF6B51)
- **Background**: Soft, neutral (#FDFBF8)
- **Typography**: Inter font family
- **Components**: Accessible, mobile-first design

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interactions
- Optimized for various screen sizes

## 🔧 Configuration Files

- `vite.config.ts`: Vite build configuration
- `tailwind.config.js`: Tailwind CSS customization
- `vitest.config.ts`: Testing configuration
- `tsconfig.json`: TypeScript configuration

## 🚀 Deployment

The application builds to static files that can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please open an issue on GitHub.

---

**Note**: This guide provides general information and is not a substitute for professional medical advice. Always consult your healthcare provider.

---

**We are Pregnant** - Supporting your journey through pregnancy in Montreal, Quebec.