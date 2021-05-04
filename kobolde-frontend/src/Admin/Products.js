import React from "react";
import { makeStyles, createStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from "@material-ui/icons/EditOutlined";
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import ProductCard from '../Admin/ProductCard'
import {
    Button,
    TextField,
    Box,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm, Controller } from "react-hook-form";
  import axios from 'axios';
  //import ItemList from './ItemList';
  import MenuItem from '@material-ui/core/MenuItem';
import { DeleteIcon } from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(30),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(20),
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
      
    button: {
        width:40,
        height:20,
        margin : theme.spacing(3,0,2),  
    },
    Table: {
      width: '100%',
      backgroundColor: 'orange',
      maxWidth: 2200,
      marginTop:350,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export default function Product(props) {
  const classes = useStyles();
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
  const [open, setOpen] = React.useState(false);
  const[x,setX]=React.useState('');
  const[file,setFile]=React.useState('');
  

 
  const openModal=(e)=>{
    e.preventDefault();
    setOpen(!open);
  };
 /* const show=()=>{
    setOpen(true);
  }*/
 const[categoryId,setCategoryId]=React.useState([]);
 const [categoryItem,setCategoryItem]=React.useState([]);
 const[productItem,setProductItem]=React.useState([]);
 const[productId,setProductId]=React.useState([]);
 React.useEffect(()=>{
     axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
         const categories=res.data;
         setCategoryItem(categories);
     
        })
 },[]);

 const onChange=(e)=> {
   
    const file = e.target.files[0]
    setFile(file)
    alert(file.name);
  }

  const resetFile=(event)=> {
    event.preventDefault();
    setFile({ file: null });
  }

  const searchrow=()=>{  
     
    axios.get(`http://localhost:8000/api/v1/admin/productx/${categoryId}`).then(res=> {
      const products=res.data;
      setProductItem(products);  
  
         })
  
    
  
     
  }  

const handleChange = (event) => {
  setCategoryId(event.target.value);
  axios.get(`http://localhost:8000/api/v1/admin/productx/${categoryId}`).then(res=> {
      const products=res.data;
      setProductItem(products);  
    })
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};

  return (
    <div className={classes.root}>
      <Box mt={5} px={2}>
        <Grid container spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper className={classes.paper}>



            <InputLabel id="demo-controlled-open-select-label">Kategori</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onClick={handleChange}
        >
        {categoryItem.map(item =>(
          <MenuItem value={item._id}>
            {item.title }
          </MenuItem>
          
        ))}
        </Select>
      
        <Table>
          <TableHead className={classes.Table}>
          <TableRow>
            <TableCell>titel</TableCell>
            <TableCell>kvantitet</TableCell>
            <TableCell>pris</TableCell>
            <TableCell>ProduktId</TableCell>
            <TableCell>bild</TableCell>
          </TableRow>
          </TableHead>


          {productItem.map(item =>(
             <TableRow>
             <TableCell>{item.title}</TableCell>
             <TableCell>{item.quantity}</TableCell>
             <TableCell>{item.price}</TableCell>
             <TableCell>{item._id}</TableCell>
           </TableRow>
            
            ))}

        
        </Table>
                        
            
            
            
     
           </Paper>
          </Grid>
        </Grid>
      </Box>
    

     </div>
  )
}


class UploadPreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = { file: null };
      this.onChange = this.onChange.bind(this);
      this.resetFile = this.resetFile.bind(this);
    }
    onChange(event) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      });
    }
  
    resetFile(event) {
      event.preventDefault();
      this.setState({ file: null });
    }
    render() {
      return (
        <div>
          <input type="file" onChange={this.onChange} />
          {this.state.file && (
            <div style={{ textAlign: "center" }}>
              <button onClick={this.resetFile}>Ta bort Fil</button>
            </div>
          )}
          <img style={{ width: "100%" }} src={this.state.file} />
          <div> {this.state.file}</div>
        </div>
        
      );
    }
  }
