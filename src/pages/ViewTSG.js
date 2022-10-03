import { Button, Box, Card, CardContent, Typography, Grid } from '@mui/material';
import React, {useEffect ,useState} from 'react';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function ViewMechatronicTSG(props) {

    const navigate = useNavigate();

    const { state } = useLocation();

    //hook to acces navigation params
    const { id } = useParams();

    //for Software TSG
    const [isActive, setIsActive] = useState(false);

    const [form, setForm] = useState({});

    //type variable for TSG type (string)
    const [type, setType] = useState();

    const [tsgItems, setTsgItems]   = useState([]);

    const [items, setItems]   = useState([]);

    const [compIsShown, setCompIsShown] = useState(false);

    useEffect ( () => {
        setParams();
        getTSGData();
        getTSData(); 
    },[]);

    function setParams () {
        if (state.Type == 0){
            setType("Mechanic");
            if(state.Link == '')
            {
                setIsActive(false);
            }else {
                setIsActive(true);
            } 
        }
        if(state.Type == 1){
            setType("Mechatronic");
            if(state.Link == ''){
                setIsActive(false);
            }else{
                setIsActive(true);
            }
        }
    }

    //display data for every Test Sample
    function displayTestSampleData (item)  {
        setCompIsShown(true);
        setItems(item);
    }

    //get TSG data
    const getTSGData = () => {
        createAPIEndpoint(ENDPOINTS.ViewTestSampleGroup)
            .fetchById(id)
            .then(res => setForm(res.data))
            .catch(err => console.log(err))
    };

    //get TS data
    const getTSData = () => {
        createAPIEndpoint(ENDPOINTS.ViewTestSample)
            .fetchById(id)
            .then(res => setTsgItems(res.data))
            .catch(err => console.log(err))
    };

    const createNewTS = e => {  
        e.preventDefault();
        if(form.tsgType == 0)
        {
            navigate(
                '/CreateMechanicTS',  { 
                    state: {
                        TSG: form.tsgUuid
                  }
            })
        }else if(form.tsgType == 1){
            navigate(
                '/CreateMechatronicTS',  { 
                    state: {
                        TSG: form.tsgUuid
                  }
            })
        }  
    };

    return (
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <Card sx={{width:"100%", minHeight: "45vh", marginTop: "10px", marginLeft:"5px"}}>
                    <CardContent height= "inhert" sx={{textAlign:"left", height:"100%"}}>
                        <Box>
                            <Typography variant="h4" sx={{margin:5, textAlign:"center"}}>{type} TSG</Typography>
                            <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Id: {form.tsgId}</Typography>
                            <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Name: {form.tsgIdentificationNumber}</Typography>
                            <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Type: {form.tsgType}</Typography>
                            <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Uuid: {form.tsgUuid}</Typography>
                        </Box>
                        {compIsShown  && 
                            <Box sx={{float: 'left'}}>
                                 <Typography variant="h6" sx={{margin:5,  textAlign:"center"}}>Test Sample Name: {items.tsIdentificationNumber}</Typography>
                                 <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Test Sample Id: {items.tsId}</Typography>
                                 <Typography variant="body1" sx={{margin:1, paddingLeft: "100px"}}>Test Sample Type: {items.tsType}</Typography>
                            </Box>
                        } 
                    </CardContent>
                </Card>        
            </Grid>
            <Grid item xs={6}>
                <Card sx={{width:"99%", minHeight: "89vh", marginTop: "10px"}}>
                    <CardContent sx={{textAlign:"left"}}>
                        <Button 
                            onClick={createNewTS} 
                            variant="contained" 
                            size="small" 
                            sx={{width:'30%', m:1}}>
                                Create new TestSample
                        </Button>
                        <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                            <Typography variant="h3" sx={{textAlign:"center"}}>Dropdown</Typography>
                            <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                sx={{ height: 240, flexGrow: 1,maxWidth: 600 }}>
                                <TreeItem nodeId="1" label={form.tsgIdentificationNumber}>
                                    {
                                        tsgItems.map((item ) =>(
                                            <TreeItem  nodeId={item.tsId} key={item.tsId} label={item.tsIdentificationNumber} onClick={() => displayTestSampleData(item)} />
                                        ))
                                    }
                                    {isActive &&
                                        <TreeItem nodeId="5" label={form.stsgLink}>
                                            <TreeItem nodeId="3" label="Test"/>
                                        </TreeItem>
                                    }
                                </TreeItem>
                            </TreeView>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}