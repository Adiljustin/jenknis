import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
import React, {useState} from 'react';
import Center from '../components/Center';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';
import {useNavigate} from 'react-router-dom';

export default function MainPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        tsgIdentificationNumber: '',
        // 1 - mechatronic domain
        tsgType: '1', 
        tsgUuid: '0',
        TSG: '',
        //only for mechatronic
        stsgLink: ''
    });
    
    const onChange = (e) => {
        const {value, name} = e.target;
        setForm((form) => ({
            ...form,
            [name]: value
        }));
    }

    const check = e => {
        e.preventDefault();
        if(form.tsgIdentificationNumber.length != 15)
        {
            alert("The SAP number format is incorrect")
        }else{
            createAPIEndpoint(ENDPOINTS.TestSampleGrouping)
                .post(form)
                .then(getData)
                .catch(err => console.log(err))       
        } 
    };

    const getData = () => {
        createAPIEndpoint(ENDPOINTS.TestSampleGrouping)
                .fetchById(form.tsgIdentificationNumber)
                .then(res =>  navigate(
                    `/ViewTSG/${res.data.tsgUuid}`, { 
                        state: {
                            Type: res.data.tsgType
                        }
                    }))
                .catch(err => console.log(err))
    };

    return (
        <Center>
            <Card sx={{width:600}}>
                <CardContent sx={{textAlign:"center"}}>
                    <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                        <form noValidate autoComplete="off" onSubmit={check}> 
                            <Typography 
                                variant="h3" 
                                sx={{margin:3}}>
                                    Create Mechatronic TSG
                            </Typography>
                            <TextField 
                                label="SAP Material Number" 
                                name="tsgIdentificationNumber" 
                                variant="outlined" 
                                value={form.tsgIdentificationNumber} 
                                onChange={onChange}  />
                            <TextField 
                                label="Software TestSample Grouping" 
                                name="stsgLink" 
                                variant="outlined" 
                                value={form.stsgLink} 
                                onChange={onChange}  />
                            <Button 
                                type="submit" 
                                variant="contained"
                                 size="large" 
                                 sx={{margin:1, width:'45%'}}>
                                    Submit
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center> 
    )
}