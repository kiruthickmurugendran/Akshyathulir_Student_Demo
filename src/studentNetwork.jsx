import React, { useState } from 'react';

// 1. CORE IMPORTS
import {
  Box, Grid, Paper, Typography, Button, Avatar, Chip,
  Card, CardContent, CardActions, Divider,
  List, ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar,
  TextField, Snackbar, Alert, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
  ThemeProvider, createTheme, CssBaseline,
  Breadcrumbs, Link as MuiLink,
  Collapse, Tabs, Tab
} from '@mui/material';

// 2. ICON IMPORTS
import {
  School,                 
  ConnectWithoutContact,  
  Event as EventIcon,     
  ChatBubbleOutline,      
  Search, LocationOn, AccessTime, Logout,
  AppRegistration,        
  Menu as MenuIcon,
  ArrowBack,              
  NavigateNext,           
  Star,                   
  CalendarToday,          
  Person,
  Send,
  FilterList,
  ExpandLess,       
  ExpandMore,       
  WorkOutline,      
  Assignment,       
  EmojiEvents,      
  LibraryBooks,     
  Circle,
  Home,
  Dashboard,
  AccountCircle,
  Settings,
  Notifications,
  Campaign,
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
      default: '#f8f9fa',
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
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
          border: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', 
          flexDirection: 'column'
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
    expertise: ["Sustainable Farming", "STEM"], available: true, isProBono: true, status: 'idle',
    bio: "Dr. Anjali has over 15 years of experience in sustainable agriculture.",
    reviews: 4.9, sessions: 120
  },
  { 
    id: 2, name: "Rajesh Kumar", role: "Social Worker", org: "Rural Trust", 
    expertise: ["Mental Health", "Career"], available: false, isProBono: false, status: 'idle',
    bio: "Rajesh helps rural students navigate career choices.",
    reviews: 4.7, sessions: 85
  },
  { 
    id: 3, name: "Vikram Singh", role: "Supply Chain Lead", org: "FreshExports", 
    expertise: ["Logistics", "Export Mgmt"], available: true, isProBono: false, status: 'idle',
    bio: "Expert in cold chain logistics.",
    reviews: 4.8, sessions: 45
  }
];

const initialStudents = [
  { 
    id: 1, name: "Rahul Verma", course: "Vocational Training", connectionStatus: "Connect", location: "Pune, MH",
    skills: ["Irrigation", "Hardworking", "Field Mgmt"],
    about: "Focused on implementing modern irrigation techniques in drought-prone areas."
  },
  { 
    id: 2, name: "Sneha Gupta", course: "Agri-Business MBA", connectionStatus: "Pending", location: "Delhi, DL",
    skills: ["Business Strategy", "Marketing", "Finance"],
    about: "MBA student specializing in supply chain optimization for perishable goods."
  },
  { 
    id: 3, name: "Amit Patel", course: "B.Sc Agriculture", connectionStatus: "Connect", location: "Surat, GJ",
    skills: ["Drones", "Organic Chem", "Soil Testing"],
    about: "Researching the impact of organic pesticides on long-term soil health."
  },
  { 
    id: 4, name: "Priya Sharma", course: "M.Tech Biotech", connectionStatus: "Connect", location: "Bangalore, KA",
    skills: ["Genetics", "Lab Research", "Data Analysis"],
    about: "Working on genetically modified seeds for better yield in arid climates."
  },
  { 
    id: 5, name: "Karthik Iyer", course: "Computer Science", connectionStatus: "Accepted", location: "Chennai, TN",
    skills: ["React Native", "UI/UX", "IoT"],
    about: "Building an app to connect farmers directly to local consumers."
  }
];

const initialEvents = [
  { 
    id: 1, title: "Smart Irrigation Hackathon 2024", type: "Hackathon", date: "Oct 24, 10:00 AM", venue: "Innovation Hub", seats: 100, isRegistered: false,
    description: "48-hour coding marathon to solve water scarcity issues using IoT.",
    agenda: ["10:00 AM - Kickoff", "12:00 PM - Hacking Starts"]
  },
  { 
    id: 2, title: "Future of Agri-Tech", type: "Webinar", date: "Nov 02, 06:00 PM", venue: "Google Meet", seats: 500, isRegistered: false,
    description: "Global experts discuss AI in agriculture.",
    agenda: ["06:00 PM - Keynote", "07:30 PM - Q&A"]
  },
  { 
    id: 3, title: "National Agriculture Summit", type: "Conference", date: "Dec 15, 09:00 AM", venue: "Exhibition Center", seats: 200, isRegistered: true,
    description: "Networking with industry leaders and policymakers.",
    agenda: ["09:00 AM - Registration", "10:00 AM - Opening Ceremony"]
  },
  { 
    id: 4, title: "Drone Pilot Challenge", type: "Hackathon", date: "Jan 10, 08:00 AM", venue: "Campus Field", seats: 20, isRegistered: false,
    description: "Programming automated flight paths for crop spraying.",
    agenda: ["08:00 AM - Safety Brief", "09:00 AM - Flight Tests"]
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
  },
  { 
    id: 4, title: "Is hydroponics profitable for small scale?", category: "General", author: "Karthik", date: "5h ago", replies: 2, views: 45,
    content: "I have a small terrace space. Is it worth setting up a hydroponic system?",
    comments: []
  },
  { 
    id: 5, title: "Internship opportunities in Supply Chain?", category: "Career Help", author: "Sneha G.", date: "1d ago", replies: 0, views: 12,
    content: "Does anyone know startups hiring for logistics interns in Mumbai?",
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
    items: ["My Courses", "Skill Development", "Certifications", "Webinars", "Learning Path"]
  },
  {
    type: 'group', label: "Career", icon: <WorkOutline />,
    items: ["Internships", "Startup Projects", "Part-time Jobs"]
  },
  {
    type: 'group', label: "Applications", icon: <Assignment />,
    items: ["My Applications", "Student Grants", "Project Funding"]
  },
  {
    type: 'group', label: "Competitions", icon: <EmojiEvents />,
    items: ["Hackathons", "Competitions", "Idea Submission"]
  },
  {
    type: 'group', label: "Network", icon: <ConnectWithoutContact />,
    items: ["Mentorship", "Student Network", "Events", "Discussion Forum"]
  },
  {
    type: 'group', label: "Resources", icon: <LibraryBooks />,
    items: ["Templates Library", "Toolkits", "Case Studies", "Research Papers"]
  },
  { type: 'divider' },
  { type: 'link', label: 'Settings', icon: <Settings /> },
  { type: 'link', label: 'Notifications', icon: <Notifications /> },
  { type: 'link', label: 'Campus Ambassador', icon: <Campaign /> },
];

export default function ProfessionalDashboard() {
  // State
  const [currentView, setCurrentView] = useState('Mentorship');
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
  
  const toggleCategory = (catName) => {
    setExpandedCats(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  const handleMenuClick = (itemName) => {
    setCurrentView(itemName);
    setSelectedItem(null);
    setEventTab(0); 
  };

  const handleEventTabChange = (event, newValue) => {
    setEventTab(newValue);
  };

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

  // --- SUB-VIEWS ---

  const renderDetailView = () => {
    if (!selectedItem) return null;

    // FORUM DETAIL
    if (currentView === 'Discussion Forum') {
        return (
          <Box>
            <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mb: 2 }}>Back to Discussions</Button>
            <Paper sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Chip label={selectedItem.category} color="secondary" size="small" sx={{ fontWeight: 'bold', mb: 2 }} />
                <Typography variant="h4" gutterBottom>{selectedItem.title}</Typography>
                <Box display="flex" alignItems="center" gap={1} color="text.secondary" mb={3}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{selectedItem.author[0]}</Avatar>
                    <Typography variant="subtitle2">{selectedItem.author} • {selectedItem.date}</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>{selectedItem.content}</Typography>
            </Paper>
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>Comments ({selectedItem.comments ? selectedItem.comments.length : 0})</Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={4}>
                {selectedItem.comments && selectedItem.comments.map((comment, idx) => (
                    <Paper key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: '#fafafa' }} elevation={0} variant="outlined">
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography fontWeight="bold" variant="subtitle2">{comment.user}</Typography>
                            <Typography variant="caption" color="textSecondary">{comment.time}</Typography>
                        </Box>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Paper>
                ))}
            </Box>
          </Box>
        );
    }

    // GENERIC DETAIL HEADER
    return (
      <Box animation="fadeIn">
        <Box mb={3}>
           <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mb: 2 }}>Back to List</Button>
           <Paper sx={{ p: 4, bgcolor: theme.palette.primary.main, color: 'white', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
              <Box position="relative" zIndex={1}>
                {selectedItem.type && <Chip label={selectedItem.type} size="small" sx={{ bgcolor: 'white', color: 'primary.main', mb: 1, fontWeight: 'bold' }} />}
                <Typography variant="h4" gutterBottom>{selectedItem.title || selectedItem.name}</Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {selectedItem.role ? `${selectedItem.role} at ${selectedItem.org}` : (selectedItem.venue || selectedItem.course)}
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
           </Paper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Overview</Typography>
              <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                {selectedItem.bio || selectedItem.description || selectedItem.about}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
               <Button fullWidth variant="contained" size="large">
                 Perform Action
               </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderContent = () => {
    // 1. MENTORSHIP
    if (currentView === 'Mentorship') {
      return (
        <Grid container spacing={3}>
           {mentors.map((mentor) => (
             <Grid item xs={12} md={6} lg={4} key={mentor.id}>
               {/* FIXED HEIGHT CARD */}
               <Card sx={{ height: 320 }}>
                 <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.light', fontSize: '1.5rem' }}>{mentor.name[0]}</Avatar>
                      <Box>
                        <Typography variant="h6" noWrap sx={{ maxWidth: 200 }}>{mentor.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{mentor.role}</Typography>
                        <Typography variant="caption" color="text.secondary">{mentor.org}</Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" gap={1} flexWrap="wrap">
                        {mentor.expertise.slice(0, 3).map(t => <Chip key={t} label={t} size="small" />)}
                    </Box>
                 </CardContent>
                 <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button fullWidth variant="outlined" onClick={() => handleViewDetail(mentor)}>Profile</Button>
                    <Button fullWidth variant="contained" disabled={!mentor.available} onClick={() => handleMentorRequest(mentor.id)}>
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
      if (eventTab === 2) filteredEvents = events.filter(e => e.type === 'Webinar');
      if (eventTab === 3) filteredEvents = events.filter(e => e.type === 'Conference');

      return (
        <Box>
           <Paper sx={{ mb: 3, borderRadius: 2 }}>
             <Tabs value={eventTab} onChange={handleEventTabChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" sx={{ px: 2 }}>
               <Tab label="All Events" icon={<CalendarToday />} iconPosition="start" />
               <Tab label="Hackathons" icon={<Code />} iconPosition="start" />
               <Tab label="Webinars" icon={<VideoCameraFront />} iconPosition="start" />
               <Tab label="Conferences" icon={<Groups />} iconPosition="start" />
             </Tabs>
           </Paper>

           {filteredEvents.length === 0 ? (
             <Box p={5} textAlign="center"><Typography color="text.secondary">No events found.</Typography></Box>
           ) : (
             <Grid container spacing={3}>
               {filteredEvents.map((evt) => (
                 <Grid item xs={12} md={4} key={evt.id}>
                   {/* FIXED HEIGHT CARD */}
                   <Card sx={{ height: 380 }}>
                      <Box sx={{ 
                         height: 140, 
                         background: evt.type === 'Hackathon' ? 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)' :
                                     evt.type === 'Webinar' ? 'linear-gradient(135deg, #1b3a2f 0%, #4caf50 100%)' :
                                     'linear-gradient(135deg, #667db6 0%, #0082c8 100%)',
                         position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                       }}>
                         {evt.type === 'Hackathon' ? <Code sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 80 }} /> :
                          evt.type === 'Webinar' ? <VideoCameraFront sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 80 }} /> :
                          <Groups sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 80 }} />}
                         <Chip label={evt.type} sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'white', fontWeight: 'bold' }} size="small" />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ minHeight: 64, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{evt.title}</Typography>
                        <Box display="flex" flexDirection="column" gap={1.5} mt={1}>
                          <Box display="flex" alignItems="center" gap={1.5}><AccessTime fontSize="small" color="action" /><Typography variant="body2">{evt.date}</Typography></Box>
                          <Box display="flex" alignItems="center" gap={1.5}><LocationOn fontSize="small" color="action" /><Typography variant="body2" noWrap>{evt.venue}</Typography></Box>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                        <Button size="small" onClick={() => handleViewDetail(evt)}>Details</Button>
                        <Button variant="contained" size="small" onClick={() => handleEventRegister(evt.id)} disabled={evt.isRegistered}>
                          {evt.isRegistered ? "Registered" : "Register"}
                        </Button>
                      </CardActions>
                   </Card>
                 </Grid>
               ))}
             </Grid>
           )}
        </Box>
      );
    }
    
    // 3. FORUM
    if (currentView === 'Discussion Forum') {
       return (
         <Box>
           <Paper sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" fontWeight="800" gutterBottom>Community Forum</Typography>
                <Typography variant="body2" color="text.secondary">Join the conversation, ask questions, and share ideas.</Typography>
              </Box>
              <Button variant="contained" startIcon={<ChatBubbleOutline />} onClick={() => setOpenDialog(true)} size="large" sx={{ px: 4, borderRadius: 2 }}>New Topic</Button>
           </Paper>
           <Grid container spacing={2}>
             {forumThreads.map((thread) => (
               <Grid item xs={12} key={thread.id}>
                 <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', transition: 'all 0.2s', cursor: 'pointer', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }} onClick={() => handleViewDetail(thread)}>
                   <Grid container alignItems="center" spacing={2}>
                     <Grid item xs={2} sm={1} sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">{thread.replies}</Typography>
                        <Typography variant="caption" color="text.secondary">Replies</Typography>
                     </Grid>
                     <Grid item xs={10} sm={11}>
                       <Box display="flex" gap={1} mb={1}>
                          <Chip label={thread.category} size="small" color={thread.category === 'Career Help' ? 'success' : 'default'} variant="outlined" />
                          <Typography variant="caption" sx={{ alignSelf: 'center', color: 'text.secondary' }}>• Posted {thread.date}</Typography>
                       </Box>
                       <Typography variant="h6" fontWeight="600" gutterBottom>{thread.title}</Typography>
                       <Typography variant="body2" color="text.secondary" noWrap>{thread.content}</Typography>
                       <Box display="flex" alignItems="center" gap={1} mt={2}>
                          <Avatar sx={{ width: 20, height: 20, fontSize: 10 }}>{thread.author[0]}</Avatar>
                          <Typography variant="caption" fontWeight="bold">{thread.author}</Typography>
                       </Box>
                     </Grid>
                   </Grid>
                 </Paper>
               </Grid>
             ))}
           </Grid>
         </Box>
       );
    }

    // 4. STUDENT NETWORK (UNIFORM RECTANGLES)
    if (currentView === 'Student Network') {
      return (
        <Grid container spacing={3}>
           {students.map((student) => (
             <Grid item xs={12} md={6} key={student.id}>
               {/* STRICTLY FIXED SIZE RECTANGULAR CARD */}
               <Card sx={{ height: 350 }}> 
                 {/* Top Colored Bar (Inside Card) */}
                 <Box sx={{ 
                    height: 80, 
                    background: 'linear-gradient(90deg, #1b3a2f 0%, #2c5c4b 100%)',
                    width: '100%'
                  }} 
                 />
                 
                 <CardContent sx={{ p: 3, flexGrow: 1, position: 'relative' }}>
                   {/* Avatar floating over the line between color bar and content */}
                   <Avatar sx={{ 
                      width: 72, height: 72, 
                      border: '4px solid white', 
                      bgcolor: 'primary.main', 
                      fontSize: '1.5rem',
                      position: 'absolute',
                      top: -36, // Half the height to straddle the line
                      left: 24
                    }}>
                      {student.name[0]}
                    </Avatar>

                   {/* Spacer to push content down below avatar */}
                   <Box mt={5} display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" fontWeight="bold">{student.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{student.course}</Typography>
                      </Box>
                      <Chip label={student.connectionStatus} color={student.connectionStatus === "Connect" ? "primary" : "default"} size="small" onClick={() => handleConnect(student.id)} disabled={student.connectionStatus !== 'Connect'} />
                   </Box>
                   
                   <Box display="flex" alignItems="center" gap={1} color="text.secondary" mt={1} mb={2}>
                      <LocationOn fontSize="small" />
                      <Typography variant="caption">{student.location}</Typography>
                   </Box>

                   <Typography variant="body2" color="text.secondary" sx={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden',
                      height: '2.8em' // Enforce height even if text is short
                   }}>
                      {student.about}
                   </Typography>
                 </CardContent>
                 
                 <Divider />
                 <CardActions sx={{ p: 1.5, bgcolor: '#f8f9fa' }}>
                    <Button fullWidth size="small" onClick={() => handleViewDetail(student)}>View Profile</Button>
                 </CardActions>
               </Card>
             </Grid>
           ))}
        </Grid>
      );
    }

    // 5. DEFAULT PLACEHOLDER
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh" textAlign="center">
         <Avatar sx={{ width: 80, height: 80, bgcolor: 'grey.200', mb: 3 }}>
            <School sx={{ fontSize: 40, color: 'grey.500' }} />
         </Avatar>
         <Typography variant="h4" gutterBottom color="text.secondary">{currentView}</Typography>
         <Typography variant="body1" color="text.secondary" maxWidth={500}>This section is currently under development.</Typography>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* SIDEBAR */}
        <Paper square sx={{ width: 280, bgcolor: sidebarStyles.bg, color: sidebarStyles.text, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', flexShrink: 0, borderRight: 'none', zIndex: 10, overflowY: 'auto' }}>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, display: 'flex' }}><AppRegistration sx={{ fontSize: 32, color: sidebarStyles.active }} /></Box>
            <Box><Typography variant="overline" sx={{ opacity: 0.7, letterSpacing: 1, lineHeight: 1 }}>ADMIN</Typography><Typography variant="h6" fontWeight="bold" lineHeight={1.2}>Student<br/>Registration</Typography></Box>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 3, mb: 2 }} />
          <List component="nav" sx={{ px: 2 }}>
            {sidebarConfig.map((item, index) => {
              if (item.type === 'divider') return <Divider key={index} sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2, mx: 1 }} />;
              if (item.type === 'group') {
                const isOpen = expandedCats[item.label];
                const isChildActive = item.items.includes(currentView);
                return (
                  <React.Fragment key={index}>
                    <ListItemButton onClick={() => toggleCategory(item.label)} sx={{ borderRadius: 2, mb: 0.5, bgcolor: isChildActive ? 'rgba(255,255,255,0.05)' : 'transparent', '&:hover': { bgcolor: sidebarStyles.hover } }}>
                      <ListItemIcon sx={{ color: 'rgba(255,255,255,0.8)', minWidth: 40 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                      {isOpen ? <ExpandLess sx={{ color: 'rgba(255,255,255,0.5)' }} /> : <ExpandMore sx={{ color: 'rgba(255,255,255,0.5)' }} />}
                    </ListItemButton>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton key={subItem} onClick={() => handleMenuClick(subItem)} sx={{ pl: 4, mb: 0.5, borderRadius: 2, bgcolor: currentView === subItem ? sidebarStyles.active : 'transparent', color: currentView === subItem ? 'white' : 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: currentView === subItem ? sidebarStyles.active : sidebarStyles.subMenuBg } }}>
                            <ListItemIcon sx={{ minWidth: 25 }}><Circle sx={{ fontSize: 6, color: currentView === subItem ? 'white' : 'rgba(255,255,255,0.4)' }} /></ListItemIcon>
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
                  <ListItemButton key={index} onClick={() => handleMenuClick(item.label)} sx={{ borderRadius: 2, mb: 0.5, bgcolor: currentView === item.label ? sidebarStyles.active : 'transparent', color: currentView === item.label ? '#fff' : 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: currentView === item.label ? sidebarStyles.active : sidebarStyles.hover } }}>
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
                  </ListItemButton>
                );
              }
              return null;
            })}
          </List>
          <Box sx={{ mt: 'auto', p: 3 }}><Button startIcon={<Logout />} sx={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'flex-start' }} fullWidth>Sign Out</Button></Box>
        </Paper>

        {/* MAIN AREA */}
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={0} square sx={{ px: 4, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
            <Box display="flex" alignItems="center" gap={2}><MenuIcon sx={{ display: { md: 'none' }, color: 'text.secondary' }} />{selectedItem ? (<Breadcrumbs aria-label="breadcrumb"><MuiLink underline="hover" color="inherit" onClick={handleBack} sx={{ cursor: 'pointer' }}>{currentView}</MuiLink><Typography color="text.primary">Details</Typography></Breadcrumbs>) : (<Typography variant="h5" fontWeight="bold" color="text.primary">{currentView}</Typography>)}</Box>
            <Box display="flex" alignItems="center" gap={2}><IconButton><Search /></IconButton><IconButton><Notifications /></IconButton><Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center' }} /><Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: 'pointer', p: 0.5, borderRadius: 10, '&:hover': { bgcolor: 'grey.100' } }}><Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 14, fontWeight: 'bold', color: 'black' }}>A</Avatar><Typography variant="body2" fontWeight="600" sx={{ display: { xs: 'none', sm: 'block' } }}>Admin User</Typography></Box></Box>
          </Paper>
          <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto', width: '100%' }}>{selectedItem ? renderDetailView() : renderContent()}</Box>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
           <DialogTitle>Start a Discussion</DialogTitle>
           <DialogContent dividers>
             <Box component="form" sx={{ mt: 1 }}>
               <TextField autoFocus margin="dense" label="Topic Title" fullWidth variant="outlined" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
               <FormControl fullWidth margin="dense" sx={{ mt: 2 }}><InputLabel>Category</InputLabel><Select value={newPost.category} label="Category" onChange={(e) => setNewPost({...newPost, category: e.target.value})}><MenuItem value="Career Help">Career Help</MenuItem><MenuItem value="Project Ideas">Project Ideas</MenuItem><MenuItem value="General">General</MenuItem></Select></FormControl>
               <TextField margin="dense" label="What's on your mind?" fullWidth multiline rows={4} variant="outlined" sx={{ mt: 2 }} value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} />
             </Box>
           </DialogContent>
           <DialogActions sx={{ p: 2.5 }}><Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button><Button onClick={() => { if(!newPost.title) return; setForumThreads([{ id: Date.now(), title: newPost.title, category: newPost.category, author: "Admin User", date: "Just now", replies: 0, content: newPost.content, comments: [] }, ...forumThreads]); setOpenDialog(false); setNewPost({ title: '', category: '', content: '' }); setToast({ open: true, msg: "Discussion started successfully!" }); }} variant="contained">Post Topic</Button></DialogActions>
        </Dialog>
        <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Alert severity="success" variant="filled" sx={{ width: '100%' }}>{toast.msg}</Alert></Snackbar>
      </Box>
    </ThemeProvider>
  );
}