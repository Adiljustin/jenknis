import * as React from 'react';
import { AppBar, Box, Toolbar, Button, Link, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar(props) {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const open = Boolean(anchorEl);

    const open1 = Boolean(anchorEl1);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>    
            <AppBar position="static">
                <Toolbar>
                    <div className="TS">
                        <Button
                            id="sipleBtn"
                            color="inherit"
                            aria-controls={open ? 'TS-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} 
                            sx={{margin:1}}>
                                Create Test Sample
                        </Button>
                        <Menu
                            id="TS-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <Link 
                                    href="/CreateMechanicTS" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Mechanic
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link 
                                    href="/CreateMechanicTS" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Mechatronic
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link 
                                    href="/CreateSoftwareTS" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Software
                                </Link>
                            </MenuItem>
                          </Menu>
                    </div>
                    <div className="TSG">
                        <Button 
                            color="inherit"
                            aria-controls={open1 ? 'TSG-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? 'true' : undefined}
                            onClick={handleClick1} 
                            sx={{margin:1}}>
                                Create Test Sample Grouping
                        </Button>
                        <Menu
                            id="TSG-menu"
                            anchorEl={anchorEl1}
                            open={open1}
                            onClose={handleClose1}>
                            <MenuItem onClick={handleClose1}>
                                <Link 
                                    href="/CreateMechanicTSG" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Mechanic
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose1}>
                                <Link 
                                    href="/CreateMechatronicTSG" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Mechatronic
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose1}>
                                <Link 
                                    href="/CreateSoftwareTSG" 
                                    underline="none"
                                    variant="outlined"
                                    color="inherit"> 
                                        Software
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="ViewTSG">
                      <Button color="inherit" onClick={() => navigate("ViewAllTSG")} sx={{margin:1}}>View TSG list</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}