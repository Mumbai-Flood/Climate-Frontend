# Climate Frontend - Mumbai Flood Experiment

## Overview
The Climate Frontend is a sophisticated web application developed in collaboration with IIT Bombay for the Mumbai Flood project. It provides real-time flood monitoring, rainfall forecasting, and crowd-sourced flood reporting capabilities for Mumbai city.

## Key Features

### 🌧️ Rainfall Monitoring
- Real-time rainfall data visualization
- 3-day rainfall forecasts
- Interactive station-wise data display
- Historical rainfall patterns

### 💧 Water Level Tracking
- Live water level monitoring from 9 sensors across Mumbai
- Visual alerts for critical water levels
- Historical water level data analysis
- Sensor location mapping

### 🗺️ Crowd-Sourced Flood Reporting
- User-friendly flood reporting interface
- Real-time flood location mapping
- Water depth indicators
- Community-driven flood alerts

### 📱 Mobile Responsiveness
- Optimized for all device sizes
- Touch-friendly interface
- Smooth navigation
- Adaptive layouts

## Tech Stack
- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Mapping:** Leaflet
- **State Management:** React Context
- **Data Visualization:** Chart.js
- **API Integration:** Axios

## Live Demo
🌐 [Visit Mumbai Flood Website](https://mumbaiflood.in)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Mumbai-Flood/Climate-Frontend.git
   ```
2. Navigate to project directory:
   ```bash
   cd Climate-Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create environment file:
   ```bash
   cp .env.example .env
   ```
5. Start development server:
   ```bash
   npm start
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
Climate-Frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── home/          # Home page components
│   │   ├── layout/        # Layout components
│   │   └── common/        # Shared components
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   └── App.js             # Root component
├── public/                # Static assets
└── docs/                  # Documentation
```

## Contributing
We welcome contributions! Please follow these guidelines:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. 💻 Make your changes
4. ✅ Run tests:
   ```bash
   npm test
   ```
5. 📝 Commit with clear messages:
   ```bash
   git commit -m "feat: add new feature"
   ```
6. 🚀 Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
7. 🔄 Create a Pull Request

## Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain mobile-first approach
- Write clean, documented code
- Follow semantic versioning

## API Integration
The application integrates with multiple APIs:
- Rainfall data API
- Water level sensor API
- Crowd-sourced data API
- Weather forecast API

## Performance Optimization
- Lazy loading of components
- Image optimization
- Code splitting
- Caching strategies
- Bundle size optimization

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact & Support
- 📧 Email: [deepaksilaych@iitb.ac.in](mailto:deepaksilaych@iitb.ac.in)
- 🌐 Website: [mumbaiflood.in](https://mumbaiflood.in)
- 🐛 Issues: [GitHub Issues](https://github.com/Mumbai-Flood/Climate-Frontend/issues)

## Acknowledgments
- IIT Bombay research team
- Municipal Corporation of Greater Mumbai (MCGM)
- All contributors and community members

---
Made with ❤️ by the Climate Studies IIT Bombay
