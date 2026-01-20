import React, { useState } from 'react';

// 1. CORE IMPORTS
import {
  Box, Grid, Paper, Typography, Button, Avatar, Chip,
  Card, CardContent, CardActions, Divider,
  List, ListItem, ListItemButton, ListItemText, ListItemIcon,
  TextField, Snackbar, Alert, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
  ThemeProvider, createTheme, CssBaseline,
  Collapse, Tabs, Tab
} from '@mui/material';

// 2. ICON IMPORTS
import {
  School,                 
  ConnectWithoutContact,  
  ChatBubbleOutline,      
  Search, LocationOn, 
  AppRegistration,        
  Menu as MenuIcon,
  ArrowBack,              
  CalendarToday,          
  ExpandLess,       
  ExpandMore,       
  LibraryBooks,     
  Circle,
  Home,
  Dashboard,
  AccountCircle,
  Settings,
  Notifications,
  Code,             
  VideoCameraFront, 
  Groups
} from '@mui/icons-material';

// --- PROFESSIONAL THEME ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f5132', // Deep Emerald Green
      light: '#198754',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffc107', // Gold/Amber
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600, fontSize: '1.1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
    body2: { fontSize: '0.9rem', lineHeight: 1.5 }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.95rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
          border: '1px solid rgba(0,0,0,0.05)',
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }
        }
      }
    }
  },
});

// --- SIDEBAR STYLES ---
const sidebarStyles = {
  bg: '#1b3a2f',     
  text: '#ffffff',
  hover: 'rgba(255, 255, 255, 0.1)',
  active: '#4caf50', 
  subMenuBg: '#142b23' 
};

// --- MOCK DATA ---
const initialMentors = [
  { 
    id: 1, name: "Dr. Anjali Deshmukh", role: "Senior Researcher", org: "AgriTech India", 
    expertise: ["Sustainable Farming", "STEM"], available: true, status: 'idle',
    bio: "Dr. Anjali has over 15 years of experience in sustainable agriculture and soil health management.",
  },
  { 
    id: 2, name: "Rajesh Kumar", role: "Social Worker", org: "Rural Trust", 
    expertise: ["Mental Health", "Career"], available: false, status: 'idle',
    bio: "Rajesh helps rural students navigate career choices and overcome academic pressure.",
  },
  { 
    id: 3, name: "Vikram Singh", role: "Supply Chain Lead", org: "FreshExports", 
    expertise: ["Logistics", "Export Mgmt"], available: true, status: 'idle',
    bio: "Expert in cold chain logistics and supply management for perishable goods.",
  },
  { 
    id: 4, name: "Sarah Jenkins", role: "AI Specialist", org: "TechFarm", 
    expertise: ["AI", "Machine Learning"], available: true, status: 'idle',
    bio: "Implementing AI solutions for crop disease detection and yield prediction.",
  },
  { 
    id: 5, name: "Arjun Reddy", role: "Hydrologist", org: "WaterWise", 
    expertise: ["Irrigation", "Conservation"], available: true, status: 'idle',
    bio: "Specializes in micro-irrigation systems for arid regions.",
  }
];

const initialStudents = [
  { 
    id: 1, name: "Rahul Verma", course: "Vocational Training", connectionStatus: "Connect", location: "Pune, MH",
    skills: ["Irrigation", "Hardworking"],
    about: "Focused on implementing modern irrigation techniques in drought-prone areas."
  },
  { 
    id: 2, name: "Sneha Gupta", course: "Agri-Business MBA", connectionStatus: "Pending", location: "Delhi, DL",
    skills: ["Business Strategy", "Marketing"],
    about: "MBA student specializing in supply chain optimization for perishable goods."
  },
  { 
    id: 3, name: "Amit Patel", course: "B.Sc Agriculture", connectionStatus: "Connect", location: "Surat, GJ",
    skills: ["Drones", "Organic Chem"],
    about: "Researching the impact of organic pesticides on long-term soil health."
  },
   { 
    id: 4, name: "Priya Sharma", course: "M.Tech Biotech", connectionStatus: "Connect", location: "Bangalore, KA",
    skills: ["Genetics", "Lab Research"],
    about: "Working on genetically modified seeds for better yield in arid climates."
  },
  { 
    id: 5, name: "Karthik Iyer", course: "Computer Science", connectionStatus: "Accepted", location: "Chennai, TN",
    skills: ["React Native", "IoT"],
    about: "Building an app to connect farmers directly to local consumers."
  }
];

const initialEvents = [
  { 
    id: 1, 
    title: "Smart Irrigation Hackathon 2024", 
    type: "Hackathon", 
    date: "Oct 24, 10:00 AM", 
    venue: "Innovation Hub", 
    seats: 100, 
    isRegistered: false,
    description: "48-hour coding marathon to solve water scarcity issues using IoT sensors.",
  },
  { 
    id: 2, 
    title: "Future of Agri-Tech", 
    type: "Webinar", 
    date: "Nov 02, 06:00 PM", 
    venue: "Google Meet", 
    seats: 500, 
    isRegistered: false,
    description: "Global experts discuss AI in agriculture and the future of farming.",
  },
  { 
    id: 3, 
    title: "National Agriculture Summit", 
    type: "Conference", 
    date: "Dec 15, 09:00 AM", 
    venue: "Exhibition Center", 
    seats: 200, 
    isRegistered: true,
    description: "Networking with industry leaders, policymakers, and innovators.",
  },
  { 
    id: 4, 
    title: "Drone Pilot Challenge", 
    type: "Hackathon", 
    date: "Jan 10, 08:00 AM", 
    venue: "Campus Field", 
    seats: 20, 
    isRegistered: false,
    description: "Programming automated flight paths for crop spraying drones.",
  },
  { 
    id: 5, 
    title: "Sustainable Supply Chain", 
    type: "Webinar", 
    date: "Feb 05, 04:00 PM", 
    venue: "Zoom", 
    seats: 300, 
    isRegistered: false,
    description: "Reducing waste in the farm-to-table supply chain process.",
  }
];

const initialForumData = [
  { 
    id: 1, title: "How to apply for 'Green Future' scholarship?", category: "Career Help", author: "Amit S.", date: "2h ago", replies: 5, views: 120,
    content: "I've heard about the Green Future scholarship but can't find the link.",
    comments: [ { user: "Priya M.", text: "Check the government portal.", time: "1h ago" } ]
  },
  { 
    id: 2, title: "Looking for team: IoT Smart Sensor Project", category: "Project Ideas", author: "Priya M.", date: "1d ago", replies: 8, views: 340,
    content: "Building a team for the upcoming Hackathon. Need backend devs.",
    comments: []
  },
  { 
    id: 3, title: "Best resources to learn Python for Data Science?", category: "Learning", author: "Rahul V.", date: "3h ago", replies: 12, views: 85,
    content: "I want to analyze crop yield data. Should I start with pandas or numpy?",
    comments: []
  }
];

// --- NAVIGATION CONFIGURATION ---
const sidebarConfig = [
  { type: 'link', label: 'Home', icon: <Home /> },
  { type: 'link', label: 'Dashboard', icon: <Dashboard /> },
  { type: 'link', label: 'Profile', icon: <AccountCircle /> },
  { type: 'divider' },
  {
    type: 'group', label: "Learning", icon: <School />,
    items: ["My Courses", "Skill Development", "Certifications", "Webinars"]
  },
  {
    type: 'group', label: "Network", icon: <ConnectWithoutContact />,
    items: ["Mentorship", "Student Network", "Events", "Discussion Forum"]
  },
  {
    type: 'group', label: "Resources", icon: <LibraryBooks />,
    items: ["Templates Library", "Toolkits"]
  },
  { type: 'divider' },
  { type: 'link', label: 'Settings', icon: <Settings /> },
  { type: 'link', label: 'Notifications', icon: <Notifications /> },
];

export default function ProfessionalDashboard() {
  // State
  const [currentView, setCurrentView] = useState('Events');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCats, setExpandedCats] = useState({ Network: true }); 
  const [eventTab, setEventTab] = useState(0); 

  // Data State
  const [mentors, setMentors] = useState(initialMentors);
  const [students, setStudents] = useState(initialStudents);
  const [events, setEvents] = useState(initialEvents);
  const [forumThreads, setForumThreads] = useState(initialForumData);

  // UI State
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: '', content: '' });
  const [toast, setToast] = useState({ open: false, msg: '' });

  // --- ACTIONS ---
  const handleViewDetail = (item) => setSelectedItem(item);
  const handleBack = () => setSelectedItem(null);
  const toggleCategory = (catName) => setExpandedCats(prev => ({ ...prev, [catName]: !prev[catName] }));
  const handleMenuClick = (itemName) => { 
    console.log('Menu clicked:', itemName);
    setCurrentView(itemName); 
    setSelectedItem(null); 
    setEventTab(0); 
  };
  const handleEventTabChange = (event, newValue) => setEventTab(newValue);
  const handleMentorRequest = (id) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, status: 'requested', available: false } : m));
    setToast({ open: true, msg: 'Request sent successfully!' });
  };
  const handleEventRegister = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isRegistered: true, seats: e.seats - 1 } : e));
    setToast({ open: true, msg: 'Registered successfully!' });
  };
  const handleConnect = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, connectionStatus: 'Pending' } : s));
    setToast({ open: true, msg: 'Connection request sent!' });
  };

  // Render Detail View
  const renderDetailView = () => {
    return (
      <Box animation="fadeIn">
        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mb: 2 }}>Back to List</Button>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          {selectedItem.type && <Chip label={selectedItem.type} color="primary" sx={{ mb: 2 }} />}
          <Typography variant="h4" gutterBottom>{selectedItem.title || selectedItem.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
             {selectedItem.role ? `${selectedItem.role} at ${selectedItem.org}` : (selectedItem.venue || selectedItem.course)}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {selectedItem.content || selectedItem.bio || selectedItem.description || selectedItem.about}
          </Typography>
          <Box mt={4}>
            <Button variant="contained" size="large">Action</Button>
          </Box>
        </Paper>
      </Box>
    );
  };

  // FIXED WIDTH EVENT CARD COMPONENT
  const EventCard = ({ event }) => (
    <Card sx={{ 
      height: 380, 
      maxWidth: 360, // FIXED MAX WIDTH
      width: '100%',
      mx: 'auto', // CENTER THE CARD
      display: 'flex', 
      flexDirection: 'column',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transform: 'translateY(-4px)',
        transition: 'all 0.3s ease'
      }
    }}>
      {/* Event Type Header */}
      <Box sx={{ 
        height: 100,
        background: event.type === 'Hackathon' 
          ? 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)' 
          : event.type === 'Webinar'
          ? 'linear-gradient(135deg, #1b3a2f 0%, #4caf50 100%)'
          : 'linear-gradient(135deg, #5d4037 0%, #8d6e63 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.2)'
      }}>
        {event.type === 'Hackathon' ? <Code sx={{ fontSize: 60 }} /> : 
         event.type === 'Webinar' ? <VideoCameraFront sx={{ fontSize: 60 }} /> : 
         <Groups sx={{ fontSize: 60 }} />}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Chip 
            label={event.type} 
            size="small" 
            color="primary"
            variant="outlined" 
          />
          <Typography variant="caption" color="text.secondary">
            {event.date}
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ 
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '3em'
        }}>
          {event.title}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocationOn fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {event.venue}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 2
        }}>
          {event.description}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {event.seats} seats available
          </Typography>
        </Box>
      </CardContent>
      
      <Divider />
      <CardActions sx={{ p: 2 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          size="small" 
          onClick={() => handleViewDetail(event)}
        >
          Details
        </Button>
        <Button 
          fullWidth 
          variant="contained" 
          size="small" 
          onClick={() => handleEventRegister(event.id)}
          disabled={event.isRegistered || event.seats <= 0}
        >
          {event.isRegistered ? "Registered" : event.seats <= 0 ? "Full" : "Register"}
        </Button>
      </CardActions>
    </Card>
  );

  const renderContent = () => {
    console.log('Current View:', currentView);
    
    // 1. MENTORSHIP - FIXED WIDTH CARDS
    if (currentView === 'Mentorship') {
      return (
        <Grid container spacing={3} sx={{ maxWidth: 1400, mx: 'auto' }}>
          {mentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mentor.id} sx={{ maxWidth: 360 }}>
              <Card sx={{ 
                height: 380, 
                maxWidth: 360, // FIXED MAX WIDTH
                width: '100%',
                mx: 'auto', // CENTER THE CARD
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                <Box sx={{ 
                  height: 100, 
                  background: 'linear-gradient(135deg, #1b3a2f 0%, #198754 100%)',
                  position: 'relative' 
                }}>
                  <Avatar sx={{ 
                    width: 72, 
                    height: 72, 
                    border: '4px solid white', 
                    position: 'absolute', 
                    bottom: -36, 
                    left: 24,
                    fontSize: '1.5rem', 
                    bgcolor: 'primary.dark' 
                  }}>
                    {mentor.name[0]}
                  </Avatar>
                </Box>
                
                <CardContent sx={{ pt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box mb={1}>
                    <Typography variant="h6" noWrap>{mentor.name}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{mentor.role}</Typography>
                    <Typography variant="caption" color="text.secondary" display="block">{mentor.org}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mt: 1, 
                    mb: 2, 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden',
                    flexGrow: 1 
                  }}>
                    {mentor.bio}
                  </Typography>
                  <Box mt="auto">
                    {mentor.expertise.slice(0, 2).map(t => 
                      <Chip key={t} label={t} size="small" sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }} />
                    )}
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 2 }}>
                  <Button fullWidth variant="outlined" size="small" onClick={() => handleViewDetail(mentor)}>Profile</Button>
                  <Button fullWidth variant="contained" size="small" disabled={!mentor.available} onClick={() => handleMentorRequest(mentor.id)}>
                    {mentor.status === 'requested' ? "Pending" : "Request"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
    
    // 2. EVENTS
    if (currentView === 'Events') {
      let filteredEvents = events;
      if (eventTab === 1) filteredEvents = events.filter(e => e.type === 'Hackathon');
      if (eventTab === 2) filteredEvents = events.filter(e => e.type === 'Webinar' || e.type === 'Conference');

      return (
        <Box>
          <Paper sx={{ mb: 3, borderRadius: 2 }}>
            <Tabs 
              value={eventTab} 
              onChange={handleEventTabChange} 
              indicatorColor="primary" 
              textColor="primary"
              sx={{ px: 2 }}
            >
              <Tab label="All" />
              <Tab label="Hackathons" />
              <Tab label="Webinars & Conferences" />
            </Tabs>
          </Paper>

          <Grid container spacing={3} sx={{ maxWidth: 1400, mx: 'auto' }}>
            {filteredEvents.map((evt) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={evt.id} sx={{ maxWidth: 360 }}>
                <EventCard event={evt} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    // 3. STUDENT NETWORK - FIXED WIDTH CARDS
    if (currentView === 'Student Network') {
      return (
        <Grid container spacing={3} sx={{ maxWidth: 1400, mx: 'auto' }}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student.id} sx={{ maxWidth: 360 }}>
              <Card sx={{ 
                height: 380, 
                maxWidth: 360, // FIXED MAX WIDTH
                width: '100%',
                mx: 'auto', // CENTER THE CARD
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                <Box sx={{ 
                  height: 100, 
                  background: 'linear-gradient(135deg, #006064 0%, #00acc1 100%)', 
                  position: 'relative' 
                }}>
                  <Avatar sx={{ 
                    width: 72, 
                    height: 72, 
                    border: '4px solid white', 
                    position: 'absolute', 
                    bottom: -36, 
                    left: 24,
                    fontSize: '1.5rem', 
                    bgcolor: 'secondary.main', 
                    color: 'black' 
                  }}>
                    {student.name[0]}
                  </Avatar>
                </Box>
                
                <CardContent sx={{ pt: 6, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box sx={{ maxWidth: '65%' }}>
                      <Typography variant="h6" noWrap>{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>{student.course}</Typography>
                    </Box>
                    <Chip 
                      label={student.connectionStatus} 
                      color={student.connectionStatus === "Connect" ? "primary" : "default"} 
                      size="small" 
                      onClick={() => handleConnect(student.id)} 
                      disabled={student.connectionStatus !== 'Connect'} 
                    />
                  </Box>
                  
                  <Box display="flex" alignItems="center" gap={1} color="text.secondary" mt={0.5} mb={2}>
                    <LocationOn fontSize="small" sx={{ fontSize: '1rem' }} />
                    <Typography variant="caption">{student.location}</Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ 
                    flexGrow: 1,
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {student.about}
                  </Typography>
                </CardContent>
                
                <Divider />
                <CardActions sx={{ p: 2 }}>
                  <Button fullWidth variant="outlined" size="small" onClick={() => handleViewDetail(student)}>View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
    
    // 4. FORUM 
    if (currentView === 'Discussion Forum') {
      return (
        <Box>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight="800">Community Forum</Typography>
              <Typography variant="body2" color="text.secondary">Join the conversation.</Typography>
            </Box>
            <Button variant="contained" startIcon={<ChatBubbleOutline />} onClick={() => setOpenDialog(true)}>New Topic</Button>
          </Paper>
          <Grid container spacing={2}>
            {forumThreads.map((thread) => (
              <Grid item xs={12} key={thread.id}>
                <Paper sx={{ p: 3, border: '1px solid #e0e0e0', '&:hover': { borderColor: 'primary.main', bgcolor: '#fafafa' }, cursor: 'pointer' }} onClick={() => handleViewDetail(thread)}>
                  <Box>
                    <Box display="flex" gap={1} mb={1}>
                      <Chip label={thread.category} size="small" color={thread.category === 'Career Help' ? 'success' : 'default'} variant="outlined" />
                      <Typography variant="caption" color="text.secondary">• {thread.date}</Typography>
                    </Box>
                    <Typography variant="h6">{thread.title}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Avatar sx={{ width: 20, height: 20, fontSize: 10 }}>{thread.author[0]}</Avatar>
                      <Typography variant="caption" fontWeight="bold">{thread.author}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    // DEFAULT
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh" textAlign="center">
        <Typography variant="h5" color="error" gutterBottom>
          View not found: "{currentView}"
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Available views: Mentorship, Events, Student Network, Discussion Forum
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setCurrentView('Events')}
          sx={{ mt: 2 }}
        >
          Go to Events
        </Button>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* SIDEBAR */}
        <Paper square sx={{ 
          width: 280, 
          bgcolor: sidebarStyles.bg, 
          color: sidebarStyles.text, 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column', 
          flexShrink: 0, 
          borderRight: 'none', 
          zIndex: 10 
        }}>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <AppRegistration sx={{ fontSize: 32, color: sidebarStyles.active }} />
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.7, letterSpacing: 1, lineHeight: 1 }}>ADMIN</Typography>
              <Typography variant="h6" fontWeight="bold" lineHeight={1.2}>Portal</Typography>
            </Box>
          </Box>
          <List component="nav" sx={{ px: 2 }}>
            {sidebarConfig.map((item, index) => {
              if (item.type === 'divider') return <Divider key={index} sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />;
              if (item.type === 'group') {
                const isOpen = expandedCats[item.label];
                return (
                  <React.Fragment key={index}>
                    <ListItemButton 
                      onClick={() => toggleCategory(item.label)} 
                      sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: sidebarStyles.hover } }}
                    >
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.8)', minWidth: 40 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                      {isOpen ? <ExpandLess sx={{ color: 'rgba(255,255,255,0.5)' }} /> : <ExpandMore sx={{ color: 'rgba(255,255,255,0.5)' }} />}
                    </ListItemButton>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton 
                            key={subItem} 
                            onClick={() => handleMenuClick(subItem)} 
                            sx={{ 
                              pl: 4, 
                              mb: 0.5, 
                              borderRadius: 2, 
                              bgcolor: currentView === subItem ? sidebarStyles.active : 'transparent', 
                              '&:hover': { bgcolor: currentView === subItem ? sidebarStyles.active : sidebarStyles.subMenuBg } 
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 25 }}>
                              <Circle sx={{ fontSize: 6, color: currentView === subItem ? 'white' : 'rgba(255,255,255,0.4)' }} />
                            </ListItemIcon>
                            <ListItemText primary={subItem} primaryTypographyProps={{ fontSize: 13 }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              }
              if (item.type === 'link') {
                return (
                  <ListItemButton 
                    key={index} 
                    onClick={() => handleMenuClick(item.label)} 
                    sx={{ 
                      borderRadius: 2, 
                      mb: 0.5, 
                      bgcolor: currentView === item.label ? sidebarStyles.active : 'transparent', 
                      '&:hover': { bgcolor: currentView === item.label ? sidebarStyles.active : sidebarStyles.hover } 
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                  </ListItemButton>
                );
              }
              return null;
            })}
          </List>
        </Paper>

        {/* MAIN AREA */}
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Paper elevation={0} square sx={{ 
            px: 4, 
            py: 2, 
            borderBottom: '1px solid', 
            borderColor: 'divider', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            position: 'sticky', 
            top: 0, 
            zIndex: 10 
          }}>
            <Box display="flex" alignItems="center" gap={2}>
              <MenuIcon sx={{ display: { md: 'none' } }} />
              <Typography variant="h5" fontWeight="bold">{currentView}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton><Search /></IconButton>
              <IconButton><Notifications /></IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
            </Box>
          </Paper>
          <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            {selectedItem ? renderDetailView() : renderContent()}
          </Box>
        </Box>

        {/* DIALOGS & TOASTS */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Start Discussion</DialogTitle>
          <DialogContent dividers>
            <TextField 
              autoFocus 
              margin="dense" 
              label="Topic" 
              fullWidth 
              variant="outlined" 
              onChange={(e) => setNewPost({...newPost, title: e.target.value})} 
            />
            <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select 
                value={newPost.category} 
                label="Category" 
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
              >
                <MenuItem value="Career Help">Career Help</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => { 
              setOpenDialog(false); 
              setToast({ open: true, msg: "Posted!" }); 
            }}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
        
        <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
          <Alert severity="success" sx={{ width: '100%' }}>{toast.msg}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
