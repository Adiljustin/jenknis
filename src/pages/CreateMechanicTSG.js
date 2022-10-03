import { TextField, Button, Box, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import React, { useState,useParams } from 'react';
import Center from '../components/Center';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';
import {useNavigate} from 'react-router-dom';

export default function MainPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        TSGIdentificationNumber: '',
        // 0 - mechanic domain
        TSGType: '0',
        TSGUuid: '0',
        TSGU: '',
        //only for mechatronic
        STSGLink: ''
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
        if(form.TSGIdentificationNumber.length != 15)
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
                .fetchById(form.TSGIdentificationNumber)
                .then(res =>  navigate(
                        `/ViewTSG/${res.data.tsgUuid}`,   {
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
                            <Typography variant="h3" sx={{margin:3}}>Create Mechanic TSG</Typography>
                            <TextField 
                                label="SAP Material Number" 
                                name="TSGIdentificationNumber" 
                                variant="outlined" 
                                value={form.TSGIdentificationNumber} 
                                onChange={onChange}  />
                            <Button type="submit" variant="contained" size="large" sx={{margin:1, width:'45%'}}>Submit</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center> 
    )
}