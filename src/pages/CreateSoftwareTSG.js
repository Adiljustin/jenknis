import { TextField, Button, Box, Card, CardContent, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import React, {useEffect ,useState} from 'react';
import Center from '../components/Center';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';

export default function MainPage() {

    const [form, setForm] = useState({
        TSGIdentificationNumber: '',
        TSGDomainNumber: '1', 
        TSGUuid: 'No current uuid',
    });
    
    const onChange = (e) => {
        const {value, name} = e.target;
        setForm((form) => ({
            ...form,
            [name]: value
        }));
    }
 
    const handleReset = (e) => {
        e.preventDefault();
        setForm({TSGIdentificationNumber: '', TSGDomainNumber: '1', TSGUuid: 'No current uuid'});
    };

    const check = e => {
        e.preventDefault();
        if(form.TSGIdentificationNumber.length != 15 && form.TSGDomainNumber == 1)
        {
            alert("The SAP number format is incorrect")
        }
        else if(form.TSGDomainNumber != 1 && form.TSGIdentificationNumber.length == 0){
            alert("You cant let Material/BuildItem Number field empty")
        }
        else{
            createAPIEndpoint(ENDPOINTS.TestSampleGrouping)
                .post(form)
                .then(getData)
                .catch(err => console.log(err))
            }  
    };

    const getData = () => {
        createAPIEndpoint(ENDPOINTS.TestSampleGrouping)
                .fetchById(form.TSGIdentificationNumber)
                .then(res => setForm(res.data), console.log(form))
                .catch(err => console.log(err))
    };

    return (
        <Center>
            <Card sx={{width:600}}>
                <CardContent sx={{textAlign:"center"}}>
                    <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                        <form noValidate autoComplete="off" onSubmit={check} onReset={handleReset}> 
                            <Typography variant="h3" sx={{margin:3}}>Create Software TSG</Typography>
                            <TextField 
                                label="Material/BuildItem Number" 
                                name="TSGIdentificationNumber" 
                                variant="outlined" 
                                value={form.TSGIdentificationNumber} 
                                onChange={onChange}  />
                            {/* <FormControl sx={{ width:'90%', margin:1}}>
                                <InputLabel id="simple-select-label-domain">Domain</InputLabel>
                                <Select 
                                    labelId="simple-select-label-domain"
                                    name="TSGDomainNumber"
                                    label="Domain"
                                    value={form.TSGDomainNumber} 
                                    onChange={onChange}>
                                        <MenuItem value={1}>SAP</MenuItem>
                                        <MenuItem value={2}>Windchill RV&S</MenuItem>
                                        <MenuItem value={3}>Codebeamer</MenuItem>
                                </Select>
                            </FormControl> */}
                            <TextField 
                                label="UUID" 
                                name="TSGUuid" 
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} 
                                value={form.TSGUuid} />
                            <div>
                                <Button type="submit" variant="contained" size="large" sx={{margin:1, width:'45%'}}>Submit</Button>
                                <Button type="reset" variant="contained" size="large" sx={{margin:1, width:'45%'}}>Reset</Button>
                            </div>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center> 
    )
}