import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, {useEffect ,useState} from 'react';
import Center from '../components/Center';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';

export default function MainPage() {
    return (
        <Center>
            <Card sx={{width:600}}>
                <CardContent sx={{textAlign:"center"}}>
                    <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                    <Typography variant="h3" sx={{margin:1}}>Learn React</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Center> 
    )
}