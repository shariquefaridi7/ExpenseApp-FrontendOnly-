import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Fab, IconButton, Tooltip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminPanel = () => {


    const [data, setData] = useState({ id: null, exp_name: "", price: null, cname: "" });
    const [arr, setArr] = useState([{ id: "", exp_name: "", price: "", cname: "" }]);
    const [isValid, setIsValid] = useState(false);
    const [isAge, setIsAge] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if (name == 'expense') {
            setData({ ...data, exp_name: value })
        } else if (name == 'price') {
            setData({ ...data, price: value })
        } else if (name == 'id') {
            setData({ ...data, id: value })
        }
        else {
            setData({ ...data, cname: value })
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.exp_name.trim().length == 0 || data.price == "" || data.cname.trim().length == 0) {
            setIsValid(true);
            return;
        }

        if (data.price <= 0) {
            setIsAge(true);
            return;
        }

        localStorage.setItem(data.id, JSON.stringify(data));
        const dataObj = JSON.parse(localStorage.getItem(data.id));

        setArr([...arr, { exp_name: dataObj.exp_name, price: dataObj.price, cname: dataObj.cname, id: dataObj.id }]);
        setData({ exp_name: "", price: "", cname: "", id: "" });
    }


    const handleDel = (id, ID) => {
        localStorage.removeItem(id);
        setArr((prevArr) => prevArr.filter((e, i) => i != ID));

    }


    return (
        <><center>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 2 }}
                sx={{ display: "inline-flex", mt: 2, bgcolor: "#FFECD6", p: 3, mb: 3, borderRadius: 5, }}
            >
                <TextField label="OrderId" type="number" color="secondary" size="small" name="id" value={data.id} onChange={handleChange} />
                <TextField label="Prodectname" type="text" color="secondary" size="small" name="expense" value={data.exp_name} onChange={handleChange} />
                <TextField label="Price" type="number" color="secondary" size="small" name="price" value={data.price} onChange={handleChange} />
                <TextField label="Category" type="text" color="secondary" size="small" name="cname" value={data.cname} onChange={handleChange} />

                <Fab size="small" onClick={handleSubmit} color="secondary">
                    <AddIcon />
                </Fab>

            </Stack>

        </center>

            <TableContainer component={Paper} sx={{ color: "white", border: 1 }}>
                <Table >
                    <TableHead sx={{ bgcolor: "#AFC8AD", fontWeight: "bold" }}>
                        <TableRow>

                            <TableCell>Productname</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Delete/Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            arr?.map((item, i) => {

                                return (
                                    <>
                                        <TableRow>

                                            <TableCell>{item?.exp_name}</TableCell>
                                            <TableCell>{item?.price}</TableCell>
                                            <TableCell>{item?.cname}</TableCell>
                                            <TableCell> <Tooltip title="Delete" placement="top">
                                                <IconButton color="error" onClick={() => handleDel(item.id, i)}>  <DeleteIcon />  </IconButton>
                                            </Tooltip>

                                            </TableCell>

                                        </TableRow>

                                    </>
                                )

                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog Box  for Valid Input*/}

            <Dialog
                open={isValid}
                fullWidth
            >
                <DialogTitle sx={{ bgcolor: "purple", color: "white", lineHeight: 0 }} >
                    <h2>Invalid Input</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h3>Please enter a valid name and age (non empty values)</h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsValid(false)} color="secondary" variant="outlined">close</Button>

                </DialogActions>
            </Dialog>

            {/* Dialog Box for Valid Age */}

            <Dialog
                open={isAge}
                fullWidth
            >
                <DialogTitle sx={{ bgcolor: "purple", color: "white", lineHeight: 0 }} >
                    <h2>Invalid Input</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h3>Please enter a valid age (greater than 0)</h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAge(false)} color="secondary" variant="outlined">close</Button>

                </DialogActions>
            </Dialog>

        </>
    )
}

export default AdminPanel
