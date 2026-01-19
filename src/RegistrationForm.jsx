import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Divider,
  Grid,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt'; // Added icon for reset

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20', 
    },
    secondary: {
      main: '#2e7d32',
    },
  },
  typography: {
    h1: { fontSize: '34px', fontWeight: 'bold' },
    h5: { fontSize: '20px', fontWeight: 'bold' },
    h6: { fontSize: '16px', fontWeight: '600' },
    body1: { fontSize: '16px' },
    button: { fontSize: '15px', fontWeight: 'bold' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: { width: '100%' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontSize: '16px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '14px' },
      },
    },
    MuiCard: {
        styleOverrides: {
            root: { border: '2px solid #1b5e20', borderRadius: '8px' }
        }
    }
  },
});

const FormRow = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
    {React.Children.map(children, (child) => (
      <Box sx={{ flex: 1, minWidth: '250px' }}>
        {child}
      </Box>
    ))}
  </Box>
);

const SectionHeader = ({ title }) => (
    <Box sx={{ backgroundColor: '#1b5e20', color: 'white', p: 2 }}>
        <Typography variant="h5">{title}</Typography>
    </Box>
);


const initialFormState = {
  firstName: '', lastName: '', email: '', mobile: '', dob: '', gender: '', religion: '', community: '',
  institutionType: 'school', 
  schoolName: '', schoolClass: '', medium: '', board: '', schoolType: '', schoolState: '', schoolDistrict: '',
  collegeName: '', department: '', degree: '', yearOfStudy: '', collegeState: '', collegeDistrict: '',
  guardianName: '', relationship: '', guardianPhone: '',
  address: '', addrState: '', addrDistrict: '', pincode: '',
  applyAs: 'individual', 
  ideaName: '', domain: '', problemStatement: '', solutionDescription: '',
  declaration: false
};

function App() {
  
  const [formData, setFormData] = useState(initialFormState);
  const [teamMembers, setTeamMembers] = useState([]);

  const [statesList, setStatesList] = useState([]);
  
  const [schoolDistricts, setSchoolDistricts] = useState([]);
  const [collegeDistricts, setCollegeDistricts] = useState([]);
  const [addrDistricts, setAddrDistricts] = useState([]);

  const [isLoading, setIsLoading] = useState({
    states: false, 
    schoolDistricts: false, 
    collegeDistricts: false, 
    addrDistricts: false
  });

  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(prev => ({ ...prev, states: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        });
        const result = await response.json();
        if (result.data?.states) {
            setStatesList(result.data.states.map(s => s.name));
        }
      } catch (error) { console.error("Error fetching states:", error); }
      setIsLoading(prev => ({ ...prev, states: false }));
    };
    fetchStates();
  }, []);

  const fetchDistricts = async (stateName, type) => {
    if (!stateName) return;
    
    const loadingKey = `${type}Districts`; 
    setIsLoading(prev => ({ ...prev, [loadingKey]: true }));

    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: stateName }),
      });
      const result = await response.json();
      
      const cities = result.data || [];
      
      if (type === 'school') setSchoolDistricts(cities);
      if (type === 'college') setCollegeDistricts(cities);
      if (type === 'addr') setAddrDistricts(cities);

    } catch (error) { console.error(`Error fetching districts for ${type}:`, error); }
    
    setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, declaration: event.target.checked });
  };

  const handleStateChange = (field, type) => (event) => {
    const selectedState = event.target.value;
    setFormData(prev => ({ 
        ...prev, 
        [field]: selectedState, 
        [type === 'school' ? 'schoolDistrict' : type === 'college' ? 'collegeDistrict' : 'addrDistrict']: '' 
    }));
    fetchDistricts(selectedState, type);
  };

  const addMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { id: Date.now(), name: '', email: '', mobile: '', gender: '', institution: '' }]);
    }
  };

  const removeMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleMemberChange = (id, field) => (e) => {
    const updatedMembers = teamMembers.map(member => 
        member.id === id ? { ...member, [field]: e.target.value } : member
    );
    setTeamMembers(updatedMembers);
  };

  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the entire form? All data will be lost.")) {
      setFormData(initialFormState);
      setTeamMembers([]);
      setSchoolDistricts([]);
      setCollegeDistricts([]);
      setAddrDistricts([]);
    }
  };

  const handleSubmit = () => {
    if(!formData.declaration) {
        alert("Please accept the declaration.");
        return;
    }
    console.log('Main Form:', formData);
    console.log('Team Members:', teamMembers);
    alert('Registration Submitted Successfully!');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h1" sx={{ color: '#1b5e20', mb: 1 }}>
                Student Registration Portal
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Please fill in the details below to register.
            </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <SectionHeader title="1. Personal Information" />
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField label="First Name *" value={formData.firstName} onChange={handleInputChange('firstName')} />
              <TextField label="Last Name *" value={formData.lastName} onChange={handleInputChange('lastName')} />
            </FormRow>
            <FormRow>
              <TextField label="Email Address *" type="email" value={formData.email} onChange={handleInputChange('email')} />
              <TextField label="Mobile Number *" value={formData.mobile} onChange={handleInputChange('mobile')} />
            </FormRow>
            <FormRow>
              <TextField label="Date of Birth *" type="date" value={formData.dob} onChange={handleInputChange('dob')} InputLabelProps={{ shrink: true }} />
              <TextField select label="Gender *" value={formData.gender} onChange={handleInputChange('gender')}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField select label="Religion *" value={formData.religion} onChange={handleInputChange('religion')}>
                <MenuItem value="Hindu">Hindu</MenuItem>
                <MenuItem value="Islam">Islam</MenuItem>
                <MenuItem value="Christianity">Christianity</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField select label="Community *" value={formData.community} onChange={handleInputChange('community')}>
                <MenuItem value="OC">OC</MenuItem>
                <MenuItem value="BC">BC</MenuItem>
                <MenuItem value="MBC">MBC</MenuItem>
                <MenuItem value="SC/ST">SC/ST</MenuItem>
              </TextField>
            </FormRow>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4, borderColor: '#1b5e20' }}>
            <CardContent>
                <FormControl>
                    <FormLabel sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 1 }}>Which institution do you belong to? *</FormLabel>
                    <RadioGroup row value={formData.institutionType} onChange={handleInputChange('institutionType')}>
                        <FormControlLabel value="school" control={<Radio sx={{ color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }} />} label="School Student" />
                        <FormControlLabel value="college" control={<Radio sx={{ color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }} />} label="College Student" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <SectionHeader title="2. Academic Details" />
          <CardContent sx={{ p: 3 }}>
            {formData.institutionType === 'school' ? (
                <>
                    <FormRow>
                        <TextField label="School Name *" value={formData.schoolName} onChange={handleInputChange('schoolName')} />
                        <TextField select label="Class *" value={formData.schoolClass} onChange={handleInputChange('schoolClass')}>
                            <MenuItem value="9">9th Std</MenuItem>
                            <MenuItem value="10">10th Std</MenuItem>
                            <MenuItem value="11">11th Std</MenuItem>
                            <MenuItem value="12">12th Std</MenuItem>
                        </TextField>
                        <TextField select label="Medium *" value={formData.medium} onChange={handleInputChange('medium')}>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Tamil">Tamil</MenuItem>
                            <MenuItem value="Hindi">Hindi</MenuItem>
                        </TextField>
                    </FormRow>
                    <FormRow>
                         <TextField label="Board (UDISE)" value={formData.board} onChange={handleInputChange('board')} />
                         <TextField label="School Type (Govt/Private)" value={formData.schoolType} onChange={handleInputChange('schoolType')} />
                    </FormRow>
                    <FormRow>
                        <TextField select label="School State *" value={formData.schoolState} onChange={handleStateChange('schoolState', 'school')} disabled={isLoading.states}>
                             {statesList.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                        <TextField select label="School District *" value={formData.schoolDistrict} onChange={handleInputChange('schoolDistrict')} disabled={!formData.schoolState || isLoading.schoolDistricts}>
                             {isLoading.schoolDistricts ? <MenuItem disabled>Loading...</MenuItem> : schoolDistricts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                        </TextField>
                    </FormRow>
                </>
            ) : (
                <>
                    <FormRow>
                        <TextField label="College Name *" value={formData.collegeName} onChange={handleInputChange('collegeName')} />
                        <TextField label="Department/Branch *" value={formData.department} onChange={handleInputChange('department')} />
                    </FormRow>
                    <FormRow>
                        <TextField select label="Degree *" value={formData.degree} onChange={handleInputChange('degree')}>
                            <MenuItem value="BE">B.E / B.Tech</MenuItem>
                            <MenuItem value="BSC">B.Sc</MenuItem>
                            <MenuItem value="ARTS">Arts & Science</MenuItem>
                        </TextField>
                        <TextField select label="Year of Study *" value={formData.yearOfStudy} onChange={handleInputChange('yearOfStudy')}>
                            <MenuItem value="1">1st Year</MenuItem>
                            <MenuItem value="2">2nd Year</MenuItem>
                            <MenuItem value="3">3rd Year</MenuItem>
                            <MenuItem value="4">4th Year</MenuItem>
                        </TextField>
                    </FormRow>
                    <FormRow>
                        <TextField select label="College State *" value={formData.collegeState} onChange={handleStateChange('collegeState', 'college')} disabled={isLoading.states}>
                             {statesList.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </TextField>
                        <TextField select label="College District *" value={formData.collegeDistrict} onChange={handleInputChange('collegeDistrict')} disabled={!formData.collegeState || isLoading.collegeDistricts}>
                             {isLoading.collegeDistricts ? <MenuItem disabled>Loading...</MenuItem> : collegeDistricts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                        </TextField>
                    </FormRow>
                </>
            )}
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <SectionHeader title="3. Guardian & Address Details" />
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField label="Parent/Guardian Name *" value={formData.guardianName} onChange={handleInputChange('guardianName')} />
              <TextField select label="Relationship *" value={formData.relationship} onChange={handleInputChange('relationship')}>
                <MenuItem value="Father">Father</MenuItem>
                <MenuItem value="Mother">Mother</MenuItem>
                <MenuItem value="Guardian">Guardian</MenuItem>
              </TextField>
              <TextField label="Guardian Phone *" value={formData.guardianPhone} onChange={handleInputChange('guardianPhone')} />
            </FormRow>
            
            <Divider sx={{ my: 3 }}><Typography variant="body2" color="textSecondary">PERMANENT ADDRESS</Typography></Divider>

            <FormRow>
                <TextField label="Door No / Street *" value={formData.address} onChange={handleInputChange('address')} />
                <TextField label="Pincode *" value={formData.pincode} onChange={handleInputChange('pincode')} />
            </FormRow>
            <FormRow>
                <TextField select label="State *" value={formData.addrState} onChange={handleStateChange('addrState', 'addr')} disabled={isLoading.states}>
                        {statesList.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
                <TextField select label="District *" value={formData.addrDistrict} onChange={handleInputChange('addrDistrict')} disabled={!formData.addrState || isLoading.addrDistricts}>
                        {isLoading.addrDistricts ? <MenuItem disabled>Loading...</MenuItem> : addrDistricts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </TextField>
            </FormRow>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <SectionHeader title="4. Startup / Idea Information" />
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                 <FormControl>
                    <FormLabel sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 1 }}>How are you applying? *</FormLabel>
                    <RadioGroup row value={formData.applyAs} onChange={(e) => { 
                        handleInputChange('applyAs')(e); 
                        if(e.target.value === 'individual') setTeamMembers([]); 
                    }}>
                        <FormControlLabel value="individual" control={<Radio sx={{ color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }} />} label="Individual" />
                        <FormControlLabel value="team" control={<Radio sx={{ color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }} />} label="Team (2-6 Members)" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <FormRow>
                <TextField label="Startup/Idea Name *" value={formData.ideaName} onChange={handleInputChange('ideaName')} />
                <TextField select label="Domain / Sector *" value={formData.domain} onChange={handleInputChange('domain')}>
                    <MenuItem value="Agri">Agriculture</MenuItem>
                    <MenuItem value="Health">Healthcare</MenuItem>
                    <MenuItem value="EdTech">EdTech</MenuItem>
                    <MenuItem value="Robotics">Robotics / AI</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
            </FormRow>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField multiline rows={2} label="Problem Statement (Max 50 words) *" value={formData.problemStatement} onChange={handleInputChange('problemStatement')} />
                <TextField multiline rows={3} label="Solution Description *" value={formData.solutionDescription} onChange={handleInputChange('solutionDescription')} />
            </Box>

            {formData.applyAs === 'team' && (
                <Box sx={{ mt: 4, p: 3, backgroundColor: '#f1f8e9', borderRadius: 2, border: '1px dashed #1b5e20' }}>
                    <Typography variant="h6" sx={{ color: '#1b5e20', mb: 2 }}>Team Details</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>Note: The main applicant is the Team Leader.</Typography>

                    {teamMembers.map((member, index) => (
                        <Card key={member.id} sx={{ mb: 2, border: '1px solid #ccc' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Member {index + 2}</Typography>
                                    <IconButton size="small" color="error" onClick={() => removeMember(member.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <FormRow>
                                    <TextField size="small" label="Full Name" value={member.name} onChange={handleMemberChange(member.id, 'name')} />
                                    <TextField size="small" label="Email" value={member.email} onChange={handleMemberChange(member.id, 'email')} />
                                    <TextField size="small" label="Mobile" value={member.mobile} onChange={handleMemberChange(member.id, 'mobile')} />
                                </FormRow>
                            </CardContent>
                        </Card>
                    ))}

                    <Button 
                        startIcon={<AddCircleOutlineIcon />} 
                        variant="outlined" 
                        fullWidth 
                        onClick={addMember}
                        sx={{ color: '#1b5e20', borderColor: '#1b5e20', mt: 1 }}
                    >
                        Add Team Member
                    </Button>
                </Box>
            )}
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <SectionHeader title="5. Upload Documents" />
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ height: '56px', borderColor: '#bdbdbd', color: '#424242' }}>
                        Student Photo * <input type="file" hidden accept="image/*" />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ height: '56px', borderColor: '#bdbdbd', color: '#424242' }}>
                        ID Proof * <input type="file" hidden accept=".pdf,.jpg" />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ height: '56px', borderColor: '#bdbdbd', color: '#424242' }}>
                        Bonafide Cert <input type="file" hidden accept=".pdf" />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ height: '56px', borderColor: '#bdbdbd', color: '#424242' }}>
                        Idea PPT/PDF * <input type="file" hidden accept=".pdf,.ppt" />
                    </Button>
                </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <FormControlLabel 
                control={<Checkbox checked={formData.declaration} onChange={handleCheckboxChange} sx={{ color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }} />} 
                label="I hereby declare that the above information is true and correct to the best of my knowledge." 
                sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
               
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handleReset} 
                    sx={{ 
                      backgroundColor: '#d32f2f', 
                      '&:hover': { backgroundColor: '#c62828' }, 
                      px: 5, 
                      py: 1.5 
                    }}
                >
                    RESET
                </Button>

                

                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handleSubmit} 
                    sx={{ backgroundColor: '#1b5e20', '&:hover': { backgroundColor: '#2e7d32' }, px: 5, py: 1.5 }}
                >
                    SUBMIT REGISTRATION  
                </Button>
            </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default App;