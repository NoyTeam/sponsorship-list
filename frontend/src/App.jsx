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
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ChatIcon from '@mui/icons-material/Chat';
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
            err: false,
            usehkd: false,
            count: 0,
            showsearch: false,
            showsearchclose: true,
            openDialog: false,
            dialogText: ''
        }
    }

    componentDidMount() {
        this.start = (page, mode, search) => {
            axios({
                method: 'POST',
                url: "/api/get",
                data: { page: page ? page : this.state.page, type: mode ? mode : this.state.mode, search: search ? search : "" }
            }).then((res) => {
                console.log(res.data)
                this.setState({
                    count: res.data.count,
                    rows: res.data.data,
                    load: false
                })
            }).catch(err => {
                this.setState({
                    load: false,
                    err: true
                })
            })
        }
        this.start();
    }

    render() {
        let { mode, page, rows, load, err, usehkd, count, showsearch, showsearchclose, openDialog, dialogText } = this.state;
        let search_work = null;

        return (
            <div
                style={{
                    maxWidth: 1000,
                    margin: "20px auto",
                    padding: "0 10px"
                }}
            >
                <h1>NoyAcg Sponsorship List</h1>
                <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ marginBottom: 1.5, maxWidth: 400, display: 'flex' }}>
                    <Button className="bt" sx={{ backgroundColor: mode === 1 ? "#3e3e3e" : "#717171" }} onClick={() => {
                        this.setState({ mode: 1 });
                        this.start(false, 1);
                    }}>按時間排序</Button>
                    <Button className="bt" sx={{ backgroundColor: mode === 2 ? "#3e3e3e" : "#717171" }} onClick={() => {
                        this.setState({ mode: 2 });
                        this.start(false, 2);
                    }}>按金額排序</Button>
                </ButtonGroup>
                <div style={{ display: 'flex' }}>
                    <FormGroup sx={{ marginBottom: 2.5, flex: 1, justifyContent: 'center', display: 'flex' }}>
                        <FormControlLabel control={<Switch value={usehkd} onChange={(_, e) => this.setState({ usehkd: e })} />} label="使用 HKD" />
                    </FormGroup>
                    <Fade in={showsearch} style={{ flex: 1, marginBottom: '20px' }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                id="search"
                                placeholder="Search Users"
                                inputProps={{ 'aria-label': 'search users' }}
                                onKeyUp={(e) => {
                                    try { clearTimeout(search_work) } catch (e) { }
                                    search_work = setTimeout(() => {
                                        let value = document.getElementById('search').value;
                                        if (value !== "") {
                                            this.start(false, false, value);
                                        } else {
                                            this.start();
                                        }
                                    }, 500)
                                }}
                            />
                            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => {
                                this.setState({ showsearch: false });
                                setTimeout(() => this.setState({ showsearchclose: true }), 150)
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </Paper>
                    </Fade>
                    <Fade in={showsearchclose} sx={{ display: !showsearchclose ? "none" : "" }} onClick={() => {
                        this.setState({ showsearch: true, showsearchclose: false });
                    }}>
                        <IconButton sx={{ p: '10px' }} style={{ marginBottom: '24px', marginTop: '4px' }} aria-label="close">
                            <SearchIcon />
                        </IconButton>
                    </Fade>
                </div>
                {
                    rows.length > 0 &&
                    <div>
                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            {rows.map((item, index) => {
                                return (
                                    <span key={index}>
                                        {index !== 0 && <Divider variant="inset" component="li" />}
                                        <ListItem
                                            alignItems="flex-start"
                                            secondaryAction={
                                                <Typography>{usehkd ? `$${item.hkd / 100} HKD` : item.money}</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt={item.username} src={item.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={(
                                                    <span>
                                                        <Typography sx={{ display: 'inline-block' }}>{item.username}</Typography>
                                                        {item.comment != null &&
                                                            <IconButton sx={{ height: '24px', padding: 0, display: 'inline-block', ml: 1 }} aria-label="upload picture" component="span" onClick={() => {
                                                                this.setState({
                                                                    openDialog: true,
                                                                    dialogText: item.comment
                                                                })
                                                            }}>
                                                                <ChatIcon />
                                                            </IconButton>
                                                        }
                                                    </span>
                                                )}
                                                secondary={moment(new Date(item.time * 1000)).format("DD/MM/YYYY")}
                                            />
                                        </ListItem>
                                    </span>
                                )
                            })}
                        </List>
                        <Pagination sx={{ margin: '20px 0' }} className="page" count={Math.ceil(count / 20)} page={page} onChange={(e, p) => {
                            this.setState({ page: p });
                            this.start(p, false);
                        }} />
                    </div>
                }
                {
                    err &&
                    <Alert severity="error" variant="filled">
                        <AlertTitle>Error</AlertTitle>
                        載入發生問題，可能是伺服器故障或是網絡問題
                    </Alert>
                }
                <Dialog
                    open={openDialog}
                    onClose={() => this.setState({ openDialog: false })}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ minWidth: '300px' }}>
                        <DialogContentText id="alert-dialog-description">{dialogText}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ openDialog: false })}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div >
        );
    }
}

export default App;
