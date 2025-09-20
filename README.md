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
- **Inventory**: Complete product management with CRUD operations
- **Orders**: Full order management with customer details and status tracking
- **Deliveries**: Comprehensive delivery scheduling and tracking system
- **Settings**: Account and application settings (placeholder)

### 🛍️ Product Management
- **Add Products**: Create new products with name, description, price, category, stock, and SKU
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from inventory
- **Search & Filter**: Find products by name, SKU, or category
- **Sort Products**: Sort by name, price, stock, or category
- **Stock Management**: Visual stock level indicators (low stock warnings)
- **Product Images**: Support for product images via URL

### 📦 Order Management
- **Create Orders**: Add new orders with customer information and multiple items
- **Order Items**: Add multiple products to orders with quantities
- **Customer Details**: Store customer name, email, phone, and shipping address
- **Order Status**: Track orders through pending, processing, shipped, delivered, cancelled
- **Order Search**: Find orders by order number, customer name, or email
- **Status Updates**: Change order status with dropdown selection
- **Order Totals**: Automatic calculation of order totals

### 🚚 Delivery Management
- **Schedule Deliveries**: Create delivery schedules linked to orders
- **Driver Assignment**: Assign drivers and vehicles to deliveries
- **Address Management**: Store and manage delivery addresses
- **Time Scheduling**: Set specific delivery dates and times
- **Status Tracking**: Monitor delivery progress (scheduled, in transit, delivered, failed)
- **Delivery Notes**: Add special instructions for deliveries
- **Order Integration**: Automatically populate customer details from orders

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
- **Products Slice**: Manages product inventory with full CRUD operations
- **Orders Slice**: Handles order management and status tracking
- **Deliveries Slice**: Manages delivery scheduling and tracking
- **Sagas**: Handle side effects and mock API calls

## Mock Data

The application includes mock data for:
- User authentication
- Dashboard statistics
- Revenue trend data (6 months)
- Order status distribution
- Sample products (Electronics, Appliances)
- Sample orders with customer information
- Sample deliveries with driver assignments

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