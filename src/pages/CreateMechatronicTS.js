import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
import React, {useEffect ,useState} from 'react';
import Center from '../components/Center';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';
import {useLocation, useNavigate} from 'react-router-dom';

export default function MainPage() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [form, setForm] = useState({
        tsIdentificationNumber: '',
        // 1 - mechatronic domain
        tsType: '', 
        tsgUuid: '',
    });

    useEffect ( () => {
        if(state != null){
            setForm({
                tsgUuid: state.TSG,
                tsType: '1'
            });
        }else{
            setForm({
                tsgUuid: '',
                tsType: '1'
            });
        }
      },[]);
    
    const onChange = (e) => {
        const {value, name} = e.target;
        setForm((form) => ({
            ...form,
            [name]: value,
        }));
    }
    
    const check = e => {
        e.preventDefault();
        if(form.tsIdentificationNumber.charAt(0) != "P")
        {
            alert("The SAP number format is incorrect")
        }else if(form.tsIdentificationNumber.length != 9)
        {
            alert("The SAP number format is incorrect")
        }else{
            createAPIEndpoint(ENDPOINTS.TestSample)
                .post(form)
                .then(alert("TestSample created succesfully"))
                .then(res => navigate(
                    `/ViewTSG/${res.data.tsgUuid}`,   { 
                        state: {
                            Type: res.data.tsType
                      }
                  }))
                .catch(err => console.log(err))
            }  
    };

    return (
        <Center>
            <Card sx={{width:600}}>
                <CardContent sx={{textAlign:"center"}}>
                    <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                        <form noValidate autoComplete="off" onSubmit={check}> 
                            <Typography variant="h3" sx={{margin:3}}>Create Mechatronic TestSample</Typography>
                            <TextField 
                                label="SAP Material Number" 
                                name="tsIdentificationNumber" 
                                variant="outlined" 
                                value={form.tsIdentificationNumber} 
                                onChange={onChange}  />
                            <TextField 
                                label="TestSample Grouping" 
                                name="tsgUuid" 
                                variant="outlined" 
                                value={form.tsgUuid} 
                                onChange={onChange}  />
                            <Button type="submit" variant="contained" size="large" sx={{margin:1, width:'45%'}}>Submit</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center> 
    )
}