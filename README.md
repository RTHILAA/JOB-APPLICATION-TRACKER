# Job Application Tracker

A modern, responsive web application for tracking job applications with a clean interface and intuitive user experience.

## 🎯 Live Demo : 

🔗 [Job Tracker](https://rth-job-tracker.netlify.app/)

We would appreciate it if you decide to use this project. Please include credit when using it. Thank you! 🙏

## 🚀 Features :

### Core Functionality
- **Add Job Applications**: Track job title, company, application date, and status
- **Edit Applications**: Update existing job application details
- **Delete Applications**: Remove job applications from your tracker
- **Status Management**: Track applications through different stages (Pending, Interview, Accepted, Rejected)
- **Search & Filter**: Find applications by job title, company, or status
- **Data Persistence**: All data is automatically saved to local storage

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Counters**: Visual dashboard showing application statistics
- **Toast Notifications**: Instant feedback for all user actions
- **Smooth Animations**: Polished interface with modern animations and transitions
- **Loading States**: Visual feedback during save operations

### Visual Design
- **Modern UI**: Clean, professional design with contemporary styling
- **Color-coded Status**: Visual status badges for quick identification
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Proper contrast ratios and semantic markup

## 🛠️ Technologies Used :

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: Pure JavaScript for all functionality
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Poppins font family for typography
- **Local Storage**: Browser storage for data persistence

## 📱 Responsive Design :

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with optimal layout
- **Tablet**: Adapted layout for medium screens (481px - 949px)
- **Mobile**: Touch-friendly interface for smartphones (≤480px)

## 🚀 Getting Started :

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or additional software required

### Installation
1. **Clone or download** the repository
2. **Extract** the files to your desired location
3. **Open** `index.html` in your web browser

### File Structure :
```
job-application-tracker/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 💡 How to Use :

### Adding a Job Application
1. Click the **"+ Add Job"** button in the header
2. Fill in the job details:
   - Job Title
   - Company Name
   - Date Applied
   - Status (Pending, Interview, Accepted, Rejected)
3. Click **"Save"** to add the application

### Managing Applications
- **Edit**: Click the edit icon (pencil) to modify an existing application
- **Delete**: Click the delete icon (trash) to remove an application
- **Search**: Use the search bar to find applications by job title or company
- **Filter**: Use the status dropdown to filter applications by status

### Dashboard Overview
The top section displays counters for:
- **Total**: All job applications
- **Pending**: Applications awaiting response
- **Interview**: Applications in interview process
- **Accepted**: Successful applications
- **Rejected**: Unsuccessful applications

## 🎨 Design Features :

### Status Color Coding
- **Pending**: Yellow/Orange theme
- **Interview**: Teal/Cyan theme
- **Accepted**: Green theme
- **Rejected**: Red theme

### Animations
- Smooth modal transitions
- Counter pulse animations on updates
- Row insertion animations for new entries
- Hover effects on interactive elements
- Loading animations during operations

### Notifications
- Success messages for completed actions
- Error messages for validation issues
- Warning messages for deletions
- Info messages for search results

## 🔧 Customization :

### Colors
The application uses CSS custom properties that can be easily modified:
- Primary: `#2563EB` (Blue)
- Success: `#22C55E` (Green)
- Warning: `#FBBF24` (Yellow)
- Error: `#EF4444` (Red)

### Fonts
Currently uses Google Fonts (Poppins). You can change the font by modifying the `@import` statement in `style.css`.

## 📊 Data Storage :

- All data is stored locally in the browser's localStorage
- Data persists across browser sessions
- No external database or server required
- Data is automatically saved when you add, edit, or delete applications

## 🌐 Browser Compatibility :

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Modern mobile browsers

## 🤝 Contributing :

Feel free to fork this project and submit pull requests for improvements. Some areas for enhancement:
- Export functionality (PDF, CSV)
- Advanced filtering options
- Data backup/restore features
- Application notes/comments
- Reminder notifications

## 📝 License :

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues :

- Data is stored locally - clearing browser data will remove all applications
- No cloud sync or backup functionality
- Limited to single device usage

## 📞 Contact :

Have questions or suggestions? Feel free to reach out:

- **Author**: ANASS EL HARAZI
- **Email**:  [anaswins35@gmail.com](mailto:anaswins35@gmail.com)
- **LinkedIn**: [ANASS EL HARAZI](https://www.linkedin.com/in/anasselharazi/)
