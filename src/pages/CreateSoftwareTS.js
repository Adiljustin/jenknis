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

    const [form, setForm] = useState({
        TSIdentificationNumber: '',
        TSDomainNumber: '1', 
        TSUuid: 'No current uuid',
        TestSampleGroupingName: ''
    });

    const [optionList,setOptionList] = useState([{}]);
    
    const onChange = (e) => {
        const {value, name} = e.target;
        setForm((form) => ({
            ...form,
            [name]: value
        }));
    }
 
    const handleReset = (e) => {
        e.preventDefault();
        setForm({TSIdentificationNumber: '', TSDomainNumber: '1', TSUuid: 'No current uuid', TestSampleGroupingName: ''});
    };

    useEffect ( () => {
        getTestSampleGroupings();
    }, []);

    const getTestSampleGroupings = () => {
        createAPIEndpoint(ENDPOINTS.TestSampleGrouping)
                .fetch(optionList)
                .then(res => setOptionList(res.data))
                .catch(err => console.log(err))
    }

    const check = e => {
        e.preventDefault();
        if(form.TSIdentificationNumber.length != 15 && form.TSDomainNumber == 1)
        {
            alert("The SAP number format is incorrect")
        }
        else if(form.TSDomainNumber != 1 && form.TSIdentificationNumber.length == 0){
            alert("You cant let Material/BuildItem Number field empty")
        }
        else{
            createAPIEndpoint(ENDPOINTS.TestSample)
                .post(form)
                .then(getData)
                .catch(err => console.log(err))
            }  
    };

    const getData = () => {
        createAPIEndpoint(ENDPOINTS.TestSample)
                .fetchById(form.TSIdentificationNumber)
                .then(res => setForm(res.data), console.log(form))
                .catch(err => console.log(err))
    };

    return (
        <Center>
            <Card sx={{width:600}}>
                <CardContent sx={{textAlign:"center"}}>
                    <Box sx={{'& .MuiTextField-root': {margin:1, width:'90%'}}}>
                        <form noValidate autoComplete="off" onSubmit={check} onReset={handleReset}> 
                            <Typography variant="h3" sx={{margin:3}}>Create Software TestSample</Typography>
                            <TextField 
                                label="Material/BuildItem Number" 
                                name="TSIdentificationNumber" 
                                variant="outlined" 
                                value={form.TSIdentificationNumber} 
                                onChange={onChange}  />
                            <FormControl sx={{ width:'90%', margin:1}}>
                                <InputLabel id="simple-select-label-domain">Domain</InputLabel>
                                <Select 
                                    labelId="simple-select-label-domain"
                                    name="TSDomainNumber"
                                    label="Domain"
                                    value={form.TSDomainNumber} 
                                    onChange={onChange}>
                                        <MenuItem value={1}>SAP</MenuItem>
                                        <MenuItem value={2}>Windchill RV&S</MenuItem>
                                        <MenuItem value={3}>Codebeamer</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width:'90%', margin:1}}>
                                <InputLabel id="simple-select-label-grouping">TestSample Grouping</InputLabel>
                                <Select 
                                    labelId="simple-select-label-grouping"
                                    name="TestSampleGroupings"
                                    label="TestSample Grouping"
                                    onChange={onChange}
                                    >
                                       {optionList.map((item) => (
                                        <MenuItem value={item.TSGIdentificationNumber} key={item.TSGIdentificationNumber}>
                                            {item.TSGIdentificationNumber}
                                        </MenuItem>
                                        ))} 
                                </Select>
                            </FormControl>
                            <TextField 
                                label="UUID" 
                                name="TSUuid" 
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} 
                                value={form.TSUuid} />
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