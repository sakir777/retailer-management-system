# Retailer Management System

A comprehensive retailer management system built with Next.js, React, TypeScript, Redux-Saga, and TailwindCSS.

## Features

### 🔐 Authentication
- Login page with email + password form
- Signup page with name, email, password, confirm password
- Mock authentication (no real backend)
- Redux state management for user data
- Route protection for authenticated users

### 📊 Dashboard
- Welcome card with user information
- 4 Stats cards: Total Orders, Monthly Income, Active Products, Pending Deliveries
- Revenue Trend chart (last 6 months dummy data)
- Order Status Distribution with counts and colored labels
- Responsive design with modern UI

### 🧭 Navigation
- Sidebar navigation with sections: Dashboard, Inventory, Orders, Deliveries, Settings
- Top bar with search icon, notifications, and profile dropdown
- Sidebar shows logged-in user's name + picture
- Mobile-responsive sidebar

### 📱 Pages
- **Dashboard**: Main overview with stats and charts
- **Inventory**: Product inventory management (placeholder)
- **Orders**: Order management and tracking (placeholder)
- **Deliveries**: Delivery tracking and management (placeholder)
- **Settings**: Account and application settings (placeholder)

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript** for type safety
- **Redux Toolkit + Redux-Saga** for state management
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd retailer-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

For testing the login functionality, use these demo credentials:
- **Email**: admin@example.com
- **Password**: password

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── inventory/         # Inventory management
│   ├── orders/            # Order management
│   ├── deliveries/        # Delivery management
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard-specific components
│   └── layout/            # Layout components
├── store/                 # Redux store configuration
│   ├── slices/            # Redux slices
│   ├── sagas/             # Redux-Saga middleware
│   └── index.ts           # Store configuration
└── providers/             # Context providers
```

## State Management

The application uses Redux Toolkit with Redux-Saga for state management:

- **Auth Slice**: Handles user authentication state
- **Dashboard Slice**: Manages dashboard data (stats, charts, order distribution)
- **Sagas**: Handle side effects and mock API calls

## Mock Data

The application includes mock data for:
- User authentication
- Dashboard statistics
- Revenue trend data (6 months)
- Order status distribution

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Customization

### Adding New Pages

1. Create a new page in the `src/app/` directory
2. Add navigation item to the sidebar in `src/components/layout/Sidebar.tsx`
3. Use the `DashboardLayout` component for consistent styling

### Styling

The application uses TailwindCSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/app/globals.css`
- Component-specific styles using Tailwind classes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.