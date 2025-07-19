# Aithena - AI-Powered Fitness Companion

A modern, AI-powered fitness application that generates personalized workout and diet plans using Google's Generative AI. Built with Next.js, Convex, Clerk, and TypeScript.

## 🚀 Features

### Core Functionality

- **AI-Generated Plans**: Personalized workout and diet plans using Google Gemini AI
- **Real-time Generation**: Create complete fitness programs in seconds
- **User Authentication**: Secure authentication with Clerk
- **Plan Management**: Create, view, edit, duplicate, and delete fitness plans
- **Profile Management**: Edit profile information and upload profile pictures
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Features

- **Toast Notifications**: Professional feedback system for all user actions
- **Loading States**: Comprehensive loading indicators throughout the app
- **Error Handling**: Robust error handling with user-friendly messages
- **Empty States**: Helpful empty state components for better UX
- **Search & Filter**: Advanced plan management with search and filtering
- **Statistics Dashboard**: Plan analytics and success metrics

## 🛠️ Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **shadcn/ui**: Modern component library

### Backend

- **Convex**: Real-time database and backend
- **Google Generative AI**: AI-powered plan generation
- **Clerk**: Authentication and user management

### Development Tools

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
ai-trainer/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── api/                      # API routes
│   │   ├── generate-program/     # AI plan generation
│   │   └── plans/               # Plan management APIs
│   ├── generate-program/         # Plan generation page
│   ├── plan/[planId]/           # Individual plan view
│   └── profile/                 # User profile page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── Toast.tsx           # Toast notification system
│   │   ├── LoadingSpinner.tsx  # Loading components
│   │   ├── ErrorMessage.tsx    # Error handling
│   │   └── EmptyState.tsx      # Empty state components
│   ├── profile/                 # Profile-related components
│   │   ├── ProfileHeader.tsx   # Profile header with editing
│   │   └── AccountSettings.tsx # Account settings
│   └── plans/                   # Plan management components
│       └── PlanManagement.tsx  # Enhanced plan management
├── convex/                      # Convex backend
│   ├── schema.ts               # Database schema
│   ├── plans.ts                # Plan mutations/queries
│   ├── users.ts                # User management
│   ├── http.ts                 # HTTP functions for AI
│   └── gemini.ts               # Google AI integration
├── hooks/                       # Custom React hooks
│   └── useToast.ts             # Toast management hook
├── lib/                         # Utility libraries
│   └── types.ts                # TypeScript type definitions
├── providers/                   # React providers
│   ├── ConvexClerkProvider.tsx # Convex + Clerk integration
│   └── ThemeProvider.tsx       # Theme management
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account
- Clerk account
- Google AI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-trainer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   ```

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Set up Clerk**

   - Create a Clerk application
   - Configure authentication providers
   - Set up user management

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Convex Setup

1. Create a new Convex project
2. Deploy your schema and functions
3. Update `NEXT_PUBLIC_CONVEX_URL` in your environment variables

### Clerk Setup

1. Create a Clerk application
2. Configure authentication (Google, GitHub, etc.)
3. Set up user management and webhooks
4. Update Clerk keys in environment variables

### Google AI Setup

1. Get API key from Google AI Studio
2. Add to environment variables
3. Configure usage limits and billing

## 📊 Database Schema

### Users Table

```typescript
{
  clerkId: string,
  name: string,
  email: string,
  imageUrl?: string
}
```

### Plans Table

```typescript
{
  name: string,
  userId: Id<"users">,
  firstName: string,
  profilePic: string,
  fitnessGoal: string,
  height: string,
  weight: string,
  age: number,
  workoutDays: number,
  injuries: string,
  fitnessLevel: string,
  equipmentAccess: string,
  dietaryRestrictions: string,
  isActive: boolean,
  workoutPlan: WorkoutPlanSchema,
  dietPlan: DietPlanSchema,
  createdAt: number
}
```

## 🎯 API Endpoints

### Active Endpoints

- `POST /api/generate-program` - Generate AI fitness plans
- `GET /api/plans/user/[userId]` - Get user's plans
- `GET /api/plans/[planId]` - Get specific plan
- `POST /api/plans/reactivate` - Reactivate inactive plan
- `POST /api/plans/duplicate` - Duplicate existing plan
- `POST /api/plans/delete` - Delete plan

### Removed Endpoints

- `POST /api/plans/create` - Removed (handled by Convex directly)
- `POST /api/vapi/generate-program` - Removed (empty/unused)

## 🎨 UI Components

### Foundation Components

- **Toast System**: Professional notification system
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful empty state components

### Profile Components

- **ProfileHeader**: Real-time profile editing with Clerk
- **AccountSettings**: Security and privacy management

### Plan Management

- **PlanManagement**: Advanced plan management with statistics
- **Search & Filter**: Real-time search and filtering
- **Statistics Dashboard**: Plan analytics and metrics

## 🔐 Authentication & Security

### Clerk Integration

- Secure user authentication
- Profile management
- Session handling
- User data synchronization

### Security Features

- Protected API routes
- User-specific data access
- Input validation
- Error handling

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
NEXT_PUBLIC_CONVEX_URL=your_production_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_clerk_key
CLERK_SECRET_KEY=your_production_clerk_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_production_google_ai_key
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality

- ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting
- Consistent code style

## 📱 Features in Detail

### AI Plan Generation

- **Personalized Workouts**: Based on fitness level, goals, and equipment
- **Custom Diet Plans**: Tailored nutrition with dietary restrictions
- **Safety Considerations**: Injury-aware exercise selection
- **Progressive Overload**: Structured workout progression

### Plan Management

- **Create Plans**: AI-generated personalized fitness programs
- **View Details**: Comprehensive plan information
- **Edit Plans**: Modify existing plans
- **Duplicate Plans**: Create copies for variations
- **Delete Plans**: Remove unwanted plans
- **Reactivate Plans**: Restore inactive plans

### User Profile

- **Profile Editing**: Real-time profile updates
- **Picture Upload**: Profile picture management
- **Account Settings**: Security and privacy options
- **Data Export**: Export user data
- **Account Deletion**: Remove account and data

### Enhanced UX

- **Toast Notifications**: Professional feedback system
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful guidance when no data
- **Responsive Design**: Works on all devices
- **Search & Filter**: Advanced plan discovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Generative AI** for intelligent plan generation
- **Convex** for real-time database and backend
- **Clerk** for authentication and user management
- **shadcn/ui** for beautiful UI components
- **Next.js** for the amazing React framework

## 📞 Support

For support, email support@aithena.com or create an issue in the repository.

---

**Aithena** - Your AI-powered fitness companion for personalized workout and diet plans.
