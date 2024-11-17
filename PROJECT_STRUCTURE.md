# Project Structure

```
climate-frontend/
├── .github/                    # GitHub specific files (workflows, templates)
├── public/                     # Static files
├── src/                        # Source code
│   ├── components/            # React components
│   │   ├── common/           # Shared components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── WarningPopup/
│   │   ├── layout/           # Layout components
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   └── features/         # Feature-specific components
│   │       ├── flood/
│   │       ├── rainfall/
│   │       └── tweet/
│   ├── pages/                # Page components
│   │   ├── about/
│   │   ├── home/
│   │   └── warning/
│   ├── services/             # API and other services
│   │   ├── api/             # API related code
│   │   │   ├── rainfall.js
│   │   │   ├── train.js
│   │   │   ├── tweet.js
│   │   │   └── waterlevel.js
│   │   └── index.js
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── constants/           # Constants and configurations
│   ├── styles/             # Global styles
│   │   ├── tailwind/      # Tailwind configurations
│   │   └── global.css     # Global CSS
│   ├── types/              # TypeScript types/interfaces
│   ├── App.js             # Root component
│   └── index.js           # Entry point
├── .gitignore              # Git ignore file
├── LICENSE                 # License file
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
├── CONTRIBUTING.md        # Contribution guidelines
└── tailwind.config.js     # Tailwind configuration
```

## Directory Structure Explanation

### `/src/components`
- `common/`: Reusable components used across the application
- `layout/`: Components that define the layout structure
- `features/`: Feature-specific components grouped by domain

### `/src/pages`
Page components that represent different routes in the application

### `/src/services`
- `api/`: API integration and service layer
- Other services like authentication, analytics, etc.

### `/src/hooks`
Custom React hooks for shared logic

### `/src/utils`
Helper functions and utilities

### `/src/constants`
Application-wide constants and configurations

### `/src/styles`
Global styles and Tailwind configurations

### `/src/types`
TypeScript type definitions (if using TypeScript)

## Best Practices

1. **Component Structure**
   - Each component should have its own directory
   - Include index.js for clean imports
   - Keep related styles, tests, and types together

2. **Naming Conventions**
   - PascalCase for components
   - camelCase for functions and variables
   - kebab-case for CSS classes

3. **Code Organization**
   - Group related code together
   - Keep components small and focused
   - Use proper exports/imports

4. **Testing**
   - Place tests next to the code they test
   - Use `.test.js` or `.spec.js` suffix

5. **Documentation**
   - Include README.md in major directories
   - Document complex logic and APIs
   - Use JSDoc for function documentation
