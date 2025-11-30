# We are Pregnant

A comprehensive, interactive guide for expectant parents navigating pregnancy in Montreal, Quebec. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Interactive Action Plan**: Cloud-synced checklist that works across all devices
- **Healthcare Navigation**: Step-by-step guide to Quebec healthcare system
- **QPIP Calculator**: Calculate maternity/paternity benefits with cloud-stored history
- **Pregnancy Timeline**: Month-by-month development tracking with interactive charts
- **Local Resources**: Montreal-specific hospitals, contacts, and services
- **Wellness Guide**: Nutrition, exercise, and mental health tips
- **Cloud Storage**: All data securely stored in Supabase (no local storage)
- **Authentication**: Secure user accounts with email magic links
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: ARIA attributes and keyboard navigation

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Supabase (PostgreSQL database, Authentication, Row Level Security)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Testing**: Vitest + Testing Library
- **State Management**: React hooks with Supabase cloud storage

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
│   ├── Login.tsx
│   └── ErrorBoundary.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx  # Supabase authentication
├── hooks/              # Custom React hooks
│   ├── useStorage.ts   # Cloud storage hooks
│   └── useErrorHandler.ts
├── lib/                # External library configurations
│   └── supabase.ts     # Supabase client
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── supabaseStorage.ts  # Supabase storage manager
│   └── qpipCalculations.ts
├── test/               # Test setup
│   └── setup.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
supabase/
└── migrations/         # Database migrations
    └── 20250101000000_create_user_tables.sql
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

3. Set up Supabase:
   - Create a project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from the project settings
   - Create a `.env.local` file in the root directory:
     ```env
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Set up the database:
   - Link your Supabase project: `npx supabase link --project-ref your-project-ref`
   - Run migrations: `npx supabase db push`
   - Or manually run the SQL in `supabase/migrations/20250101000000_create_user_tables.sql` in your Supabase SQL editor

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
- Supabase storage management
- Error handling
- Currency formatting
- React component rendering

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

- Vercel (Recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Vercel Deployment (Automated)

This repository is configured for automated deployment with Vercel.

1.  **Connect to Vercel**:
    *   Go to [Vercel](https://vercel.com) and sign up/login.
    *   Click "Add New..." -> "Project".
    *   Import this GitHub repository.

2.  **Configure Environment Variables**:
    *   In the Vercel project settings, go to "Settings" -> "Environment Variables".
    *   Add the following variables (get these from your Supabase project settings):
        *   `VITE_SUPABASE_URL` - Your Supabase project URL
        *   `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

3.  **Set up Database**:
    *   Run the migration SQL from `supabase/migrations/20250101000000_create_user_tables.sql` in your Supabase SQL editor
    *   This creates the `user_checklist` and `user_qpip_history` tables with Row Level Security policies

4.  **Deploy**:
    *   Vercel will automatically deploy the `main` branch.
    *   Any Pull Request will generate a preview URL.

## 🔐 Authentication & Data Storage

This application uses **Supabase for all data storage** - no local storage is used. This ensures:

- ✅ Data syncs across all devices
- ✅ Secure user authentication with email magic links
- ✅ Row Level Security (RLS) for data protection
- ✅ Automatic backups and data persistence

**Users must sign in** to save their checklist progress and QPIP calculation history. All data is stored securely in Supabase's PostgreSQL database.

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