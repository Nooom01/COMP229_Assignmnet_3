

## Root Directory

```
Assignment1/
├── public/                          # Static assets served publicly
│   ├── logo.png                     # Portfolio logo
│   ├── SampleResume.pdf             # Resume PDF file
│   ├── PXL_20241208_033658075.MP.jpg # Profile photo
│   ├── bugGame.png                  # Project 1 screenshot
│   ├── scheduleInfo.png             # Project 2 screenshot 1
│   ├── scheduleResult.png           # Project 2 screenshot 2
│   ├── table.png                    # Project 3 screenshot
│   └── vite.svg                     # Vite logo
│
├── src/                             # Source code directory
│   ├── components/                  # Reusable React components
│   │   ├── Home.jsx                 # Home page component
│   │   └── Layout.jsx               # Layout with navigation bar
│   │
│   ├── assets/                      # Asset files
│   │   └── react.svg                # React logo
│   │
│   ├── about.jsx                    # About page with profile info
│   ├── contact.jsx                  # Contact page with form
│   ├── education.jsx                # Education page
│   ├── project.jsx                  # Projects showcase page
│   ├── services.jsx                 # Services page
│   ├── App.jsx                      # Main App component
│   ├── App.css                      # App styles
│   ├── index.css                    # Global styles
│   └── main.jsx                     # App entry point
│
├── MainRouter.jsx                   # React Router configuration
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── package-lock.json                # Dependency lock file
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
└── README.md                        # Project documentation
```

## Key Files Description

### Configuration Files
- **package.json**: Defines project dependencies (React, React Router, Vite)
- **vite.config.js**: Vite bundler configuration
- **eslint.config.js**: Code linting rules

### Router
- **MainRouter.jsx**: Central routing configuration mapping URLs to components
  - `/` → Home
  - `/about` → About
  - `/education` → Education
  - `/project` → Projects
  - `/services` → Services
  - `/contact` → Contact

### Components

#### Layout Component (`src/components/Layout.jsx`)
- Navigation bar with logo
- Links to all pages
- Consistent header across all pages

#### Page Components
- **Home.jsx**: Landing page with welcome message
- **about.jsx**: Personal information, profile photo, and resume link
- **education.jsx**: Educational background and qualifications
- **project.jsx**: Project showcase with images and descriptions
- **services.jsx**: List of services offered
- **contact.jsx**: Contact information panel and message form

### Static Assets (`public/`)
All files in the public folder are served at the root URL:
- Images can be referenced as `/image.png`
- PDF files accessible via `/filename.pdf`

### Styling
- **index.css**: Global styles including navigation bar styling
- **App.css**: Application-specific styles
- Inline styles: Component-specific styles using `<style>` tags in JSX

## Technology Stack

- **React 19**: UI library
- **React Router DOM 7**: Client-side routing
- **Vite 7**: Build tool and dev server
- **ESLint 9**: Code quality and linting

## Development

- Entry point: `src/main.jsx`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`