import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
import { useContext } from 'react';
import { Authentication } from '../Approuter';

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { loggedin, logout } = useContext(Authentication);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const navigate = useNavigate();
  const handleLoginLogout = () => {
    if (loggedin) {
      logout(); 
    } else {
      navigate('/login');
    }
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Quiz
      </Typography>
      <Divider />
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center',textTransform: "capitalize" }}>
              <ListItemText primary="home" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center', textTransform: "capitalize" }}>
              <ListItemText primary="Take quiz" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
          <ListItemButton sx={{ textAlign: 'center', textTransform: "capitalize" }}>
            <ListItemText primary={loggedin ? "Logout" : "Login"} />
          </ListItemButton>
          </ListItem>
      
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom:" 60px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{background:"black"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft:"76px",flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/')}
          >
            Quiz
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block'} ,marginRight:"270px"}}>
           
              <Button onClick={() => navigate('/')} sx={{ color: '#fff', textTransform: "capitalize",marginLeft:"40px" }}>
                Home
              </Button>
              <Button onClick={() => navigate('/takequiz')} sx={{ color: '#fff', textTransform: "capitalize",marginLeft:"40px" }}>
                Take quiz
              </Button>
              <Button onClick={handleLoginLogout} sx={{ color: '#fff', textTransform: "capitalize", marginLeft: "40px" }}>
              {loggedin ? "Logout" : "Login"}
            </Button>
          
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
