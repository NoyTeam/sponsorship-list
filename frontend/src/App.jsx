import * as React from "react";
import { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import moment from 'moment';
import axios from "axios";
import "./style.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 1,
            page: 1,
            rows: [],
            load: true,
            err: false
        }
    }

    componentDidMount(){
        this.start = (page, mode)=>{
            axios({
                method: 'POST',
                url: "http://127.0.0.1/api/get",
                data: {page: page?page:this.state.page, type: mode?mode:this.state.mode}
            }).then((res)=>{
                console.log(res.data)
                this.setState({
                    rows: res.data,
                    load: false
                })
            }).catch(err=>{
                this.setState({
                    load: false,
                    err: true
                })
            })
        }
        this.start();
    }

    render() {
        let { mode, page, rows, load, err } = this.state;
        
        return (
            <div
                style={{
                    maxWidth: 1000,
                    margin: "20px auto",
                    padding: "0 10px"
                }}
            >
                <h1>NoyAcg Sponsorship List</h1>
                <ButtonGroup variant="contained" aria-label="outlined button group" sx={{marginBottom: 2.5, display:'flex', maxWidth: 400}}>
                    <Button className="bt" sx={{backgroundColor: mode===1?"#3e3e3e":"#717171"}} onClick={()=>{
                        this.setState({mode: 1});
                        this.start(false, 1);
                    }}>按時間排序</Button>
                    <Button className="bt" sx={{backgroundColor: mode===2?"#3e3e3e":"#717171"}} onClick={()=>{
                        this.setState({mode: 2});
                        this.start(false, 2);
                    }}>按金額排序</Button>
                </ButtonGroup>
                { rows.length > 0 &&
                    <div>
                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            {rows.map((item, index)=>{
                                return (
                                    <span key={index}>
                                        { index !== 0 && <Divider variant="inset" component="li" /> }
                                        <ListItem
                                            alignItems="flex-start"
                                            secondaryAction={
                                                <Typography>${item.money/100} HKD</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={item.username}
                                                    src={item.avatar}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.username}
                                                secondary={moment(new Date(item.time*1000)).format("DD/MM/YYYY")}
                                            />
                                        </ListItem>
                                    </span>
                                )
                            })}
                        </List>
                        <Pagination sx={{margin: '20px 0'}} className="page" count={Math.ceil(rows.length/20)} page={page} onChange={(e, p)=>{
                            this.setState({page: p});
                            this.start(p, false);
                        }} />
                    </div>
                }
                { err &&  
                    <Alert severity="error" variant="filled">
                        <AlertTitle>Error</AlertTitle>
                        載入發生問題，可能是伺服器故障或是網絡問題
                    </Alert>
                }
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}

export default App;
