# Inktron Comics - AI-Powered Comic Creation Platform

A modern, AI-powered comic book creation platform built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **AI-Powered Comic Creation**: Transform stories into illustrated comics using artificial intelligence
- **Screenplay-Style Writing**: Professional writing interface for comic scripts
- **18 Art Styles**: From cartoon to photorealistic rendering styles
- **Character Management**: Create and manage comic characters with detailed profiles
- **Multi-Tab Workspace**: Work on multiple comics simultaneously
- **Real-time Auto-save**: Never lose your work with automatic saving
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Writer Interface
- **Tab System**: Browser-style tabs for managing multiple projects
- **Character Sidebar**: Quick access to character avatars and information
- **Script Editor**: Screenplay-format editor with panel management
- **Page Navigation**: Easy navigation between comic pages
- **Font Size Control**: Adjustable text size for comfortable writing
- **View Options**: Customizable interface settings

### Art & Styling
- **Multiple Art Styles**: Choose from 18 unique visual styles
- **Character Consistency**: AI maintains character appearance across panels
- **Panel Layouts**: Flexible panel arrangements and compositions
- **Style Previews**: See examples before selecting your art style

### Community & Commerce
- **Comic Marketplace**: Sell your comics in the integrated shop
- **Community Showcase**: Discover comics created by other users
- **User Profiles**: Manage your projects and published works
- **Credit System**: Flexible pricing with credit-based generation

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks and context

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd comic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
comic/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── writer/            # Comic writer interface
│   │   ├── shop/              # Comic marketplace
│   │   ├── mission/           # About/mission page
│   │   ├── faq/               # FAQ page
│   │   ├── pricing/           # Pricing plans
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components (navbar, footer)
│   │   └── features/          # Feature-specific components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── data/                  # Static data and constants
├── public/                    # Static assets
└── tailwind.config.ts         # Tailwind configuration
```

## 🎨 Key Components

### Writer Interface Components
- **WriterToolbar**: Main toolbar with navigation and tools
- **TabSystem**: Browser-style tab management
- **CharacterSidebar**: Character management and quick actions
- **ScriptEditor**: Main script editing interface

### UI Components
- **Button**: Customizable button component with variants
- **Input/Textarea**: Form input components
- **Modal**: Dialog/modal system using Radix UI

### Feature Components
- **HeroSection**: Landing page hero with animations
- **CommunityShowcase**: Scrolling showcase of user comics
- **HowItWorks**: Step-by-step process explanation
- **WhyChoose**: Feature highlights and benefits

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom color schemes and animations. See `tailwind.config.ts` for configuration details.

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with call-to-action
- Community showcase with scrolling comics
- How it works explanation
- Feature highlights

### Writer Interface (`/writer`)
- Full-featured comic creation workspace
- Tab-based project management
- Character and script editing tools
- Real-time preview capabilities

### Shop (`/shop`)
- Browse and purchase comics
- Filter by genre and popularity
- Shopping cart functionality

### Additional Pages
- **Mission** (`/mission`): Company mission and values
- **FAQ** (`/faq`): Frequently asked questions
- **Pricing** (`/pricing`): Subscription plans and pricing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
The project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement responsive design principles

### Component Structure
- Keep components focused and reusable
- Use proper TypeScript interfaces
- Implement proper error boundaries
- Follow accessibility guidelines

### Performance
- Optimize images and assets
- Use Next.js Image component for images
- Implement proper loading states
- Minimize bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the FAQ page
- Open an issue on GitHub
- Contact the development team

## 🔮 Future Enhancements

- Real AI integration for comic generation
- Advanced collaboration features
- Mobile app development
- Enhanced marketplace features
- Social features and community building
- Print-on-demand integration

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS