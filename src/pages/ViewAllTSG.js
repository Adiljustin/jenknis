import { React,useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api/index';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Card, Button, Typography, TablePagination } from '@mui/material';
import Center from '../components/Center';

export default function BasicTable() {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [rows, setRows] = useState([]);

    const navigate = useNavigate();

    useEffect ( () => {
        getTestSampleGroupings();
    },[]);

    const getTestSampleGroupings = () => {
        createAPIEndpoint(ENDPOINTS.ViewAllTSG)
            .fetch()
            .then(res => setRows(res.data))
            .catch(err => console.log(err))
    }
    
    function goTo (uuid, type, link)  {
        navigate(
            `/ViewTSG/${uuid}`,  { 
              state: {
                  Type: type,
                  Link: link
            }
          })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <Card sx={{mt:3, ml:'auto', mr:'auto', maxWidth:'50%'}}>
            <Typography variant="h4" align="left" sx={{m:4}}>Test Sample Group List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Material Number</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow key={row.tsgId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.tsgUuid}</TableCell>
                                <TableCell align="center">{row.tsgIdentificationNumber}</TableCell>
                                <TableCell align="right" key={row.tsgUuid}>
                                    <button value= {row.tsgType} onClick={() => goTo(row.tsgUuid, row.tsgType, row.stsgLink)}>Details</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Card>
    );
}
