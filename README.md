# Ahmed Nasser Portfolio

A modern, responsive portfolio website built with Next.js 13, featuring bilingual support (Arabic/English), beautiful animations, and a stunning UI design.

## ✨ Features

- 🌐 **Bilingual Support**: Full Arabic and English language support with RTL layout
- 🎨 **Modern UI/UX**: Beautiful gradient designs and glass morphism effects
- 🎭 **Smooth Animations**: Framer Motion animations throughout the interface
- 🌙 **Dark/Light Theme**: Automatic theme switching with system preference detection
- 📱 **Responsive Design**: Mobile-first approach with excellent mobile experience
- ⚡ **Performance Optimized**: Built with Next.js 13 App Router for optimal performance
- 🎯 **Interactive Elements**: Hover effects, smooth scrolling, and engaging interactions

## 🚀 Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **Animations**: Framer Motion 11.0.0
- **UI Components**: Radix UI + Shadcn/ui
- **Icons**: Lucide React
- **Theming**: next-themes
- **Forms**: React Hook Form + Zod validation

## 🎨 Design Features

- **Gradient Text**: Beautiful gradient text effects throughout
- **Glass Morphism**: Modern glass-like UI elements
- **Floating Elements**: Subtle floating animations in the background
- **Custom Scrollbar**: Styled scrollbar with gradient colors
- **Hover Effects**: Interactive hover states and micro-animations
- **Color Schemes**: Purple, pink, and blue gradient color palette

## 🌍 Language Support

### Arabic (العربية)
- Full RTL (Right-to-Left) layout support
- Cairo font family for beautiful Arabic typography
- Localized content and navigation
- Arabic-specific UI adjustments

### English
- Standard LTR (Left-to-Right) layout
- Inter font family for clean English typography
- Professional English content

## 📱 Sections

1. **Hero**: Animated landing section with floating elements
2. **About**: Personal information with feature highlights
3. **Skills**: Interactive skills showcase with progress bars
4. **Projects**: Portfolio projects with pagination
5. **Experience**: Work experience timeline
6. **Contact**: Contact form with WhatsApp integration

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
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

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
RESEND_API_KEY=your_resend_api_key
```

### Language Switching
The language automatically switches based on user preference and is stored in localStorage.

### Theme Configuration
The theme automatically detects system preference and can be manually toggled.

## 📁 Project Structure

```
├── app/                    # Next.js 13 App Router
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components
│   ├── navbar.tsx        # Navigation
│   ├── theme-toggle.tsx  # Theme switcher
│   └── language-toggle.tsx # Language switcher
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language management
├── lib/                   # Utility functions
│   ├── i18n.ts           # Translation system
│   └── utils.ts          # Helper functions
└── public/                # Static assets
```

## 🎯 Key Features Implementation

### Bilingual System
- Context-based language management
- Automatic RTL/LTR layout switching
- Localized content and navigation
- Persistent language preference

### Animation System
- Framer Motion integration
- Staggered animations
- Hover and scroll-triggered animations
- Performance-optimized animations

### Theme System
- System preference detection
- Smooth theme transitions
- Persistent theme state
- Dark/light mode support

## 🚀 Deployment

The project is configured for static export:

```bash
npm run build
```

The built files will be in the `out/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ahmed Nasser**
- Front-End Developer with 2+ years of experience
- Specialized in React, Next.js, and modern web technologies
- Based in al-Sharqia, Egypt

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: ahmed269117@gmail.com
- **WhatsApp**: +20 114 239 9186
- **LinkedIn**: [Ahmed Naser](https://www.linkedin.com/in/ahmed-naser-5075232b1)
- **GitHub**: [Ahmed4582](https://github.com/Ahmed4582)

---

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
