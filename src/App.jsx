import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Fab, IconButton, List, ListItem, ListItemText, Grid, Tooltip, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
const App = () => {


    const [data, setData] = useState({ exp_name: "", price: "" });
    const [arr, setArr] = useState([{ exp_name: "", price: "" }]);
    const [isupdate, setIsUpdate] = useState(false);
    const [id, setId] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if (name == 'expense') {
            setData({ ...data, exp_name: value })
        } else {
            setData({ ...data, price: value })
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isupdate) {
            setArr([...arr, { exp_name: data.exp_name, price: data.price }]);
            setData({ exp_name: "", price: "" });
        } else {
            setArr((prevArr) => prevArr.map((e, i) => {
                if (i == id) {
                    return { ...e, exp_name: data.exp_name, price: data.price };
                } else {
                    return e;
                }

            }));
            setData({ exp_name: "", price: "" });
            setIsUpdate(false)

        }

    }

    const handleDel = (id) => {

        setArr((prevArr) => prevArr.filter((e, i) => i != id));


    }

    const handleUpdate = (id) => {
        const exp = arr.filter((e, i) => {
            if (i == id) {
                return e
            }
        });
        console.log(exp)
        setData({ exp_name: exp[0].exp_name, price: exp[0].price });
        setIsUpdate(true);
        setId(id)

    }



    return (
        <><center>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 2 }}
                sx={{ display: "inline-flex", mt: 2, bgcolor: "#FFECD6", p: 3, mb: 3, borderRadius: 5, textAlign: "center" }}
            >

                <TextField label="ExpenseName" type="text" color="secondary" size="small" name="expense" value={data.exp_name} onChange={handleChange} />
                <TextField label="Price" type="number" color="secondary" size="small" name="price" value={data.price} onChange={handleChange} />
                <Fab color="secondary" size="small" onClick={handleSubmit}>
                    <AddIcon />
                </Fab>

            </Stack>
        </center>

            <Stack >
                {
                    arr.map((item, index) => {
                        return (
                            <>
                                <Grid container direction={{ xs: "row" }} spacing={{ xs: 1, sm: 1 }} justifyContent="center">
                                    <Grid item xs={12} sm={8} >
                                        <List sx={{ bgcolor: "skyblue", borderRadius: 5 }} >
                                            <ListItem  >
                                                <ListItemText
                                                    primary={item?.exp_name}

                                                />
                                                <ListItemText
                                                    primary={item?.price}
                                                />
                                                <Tooltip title="Delete" placement="top">
                                                    <IconButton color="error" onClick={() => handleDel(index)}>  <DeleteIcon />  </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Edit" placement="top">
                                                    <IconButton color="error" onClick={() => handleUpdate(index)}><EditIcon /></IconButton>
                                                </Tooltip>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </ >

                        )
                    })
                }
            </Stack >


        </>
    )
}

export default App
