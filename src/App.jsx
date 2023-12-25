import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Fab, IconButton, Tooltip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const App = () => {


  const [data, setData] = useState({ exp_name: "", price: null });
  const [arr, setArr] = useState([{ exp_name: "", price: "" }]);
  const [isupdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isAge, setIsAge] = useState(false);


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

    if (data.exp_name.trim().length == 0 || data.price == "") {
      setIsValid(true);

      return;
    }

    if (data.price <= 0) {
      setIsAge(true);
      return;
    }

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
        sx={{ display: "inline-flex", mt: 2, bgcolor: "#FFECD6", p: 3, mb: 3, borderRadius: 5, }}
      >

        <TextField label="Username" type="text" bgcolor="red" color="secondary" size="small" name="expense" value={data.exp_name} onChange={handleChange} />
        <TextField label="Age(Year)" type="number" color="secondary" size="small" name="price" value={data.price} onChange={handleChange} />
        <Fab size="small" onClick={handleSubmit} color="secondary">
          <AddIcon />
        </Fab>

      </Stack>

    </center>

      <TableContainer component={Paper} sx={{ color: "white", border: 1 }}>
        <Table >
          <TableHead sx={{ bgcolor: "#AFC8AD", fontWeight: "bold" }}>
            <TableRow>

              <TableCell>Username</TableCell>
              <TableCell>Age(Year)</TableCell>
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
                      <TableCell> <Tooltip title="Delete" placement="top">
                        <IconButton color="error" onClick={() => handleDel(i)}>  <DeleteIcon />  </IconButton>
                      </Tooltip>
                        <Tooltip title="Edit" placement="top">
                          <IconButton color="success" onClick={() => handleUpdate(i)}><EditIcon /></IconButton>
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

export default App
