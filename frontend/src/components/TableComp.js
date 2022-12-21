import React, {PureComponent} from "react";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import '../App/App'
import DescriptionViewer from "./DescriptionViewer";

export default class TableComp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            desc_editor: false,
            description: ''
        }
        this.handleDescOpen = this.handleDescOpen.bind(this);
        this.handleDescClose = this.handleDescClose.bind(this);
    }

    handleDescOpen = (e) => {
        e.preventDefault();
        this.setState({
            desc_editor: true,
            description: e.target.id
        });
    }

    handleDescClose() {
        this.setState({
            desc_editor: false,
            description: ''
        });
    }

    set_page = (e) => {
        e.preventDefault();
        this.props.setPage(parseInt(e.target.id))
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper} style={{height: '87vh', overflowY: 'scroll'}}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Genre</TableCell>
                                <TableCell align="right">Museum</TableCell>
                                <TableCell align="right">Materials</TableCell>
                                <TableCell align="right">Start</TableCell>
                                <TableCell align="right">End</TableCell>
                                <TableCell align="right">Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">
                                        <Button variant='outlined' color='primary' id={row.description}
                                                onClick={this.handleDescOpen}>Description</Button>
                                    </TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.genre}</TableCell>
                                    <TableCell align="right">{row.museum_name}</TableCell>
                                    <TableCell align="right">{row.materials}</TableCell>
                                    <TableCell align="right">{row.start_year}</TableCell>
                                    <TableCell align="right">{row.end_year}</TableCell>
                                    <TableCell align="right"><a href={row.url}>Ссылка</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DescriptionViewer dataToPass={this.state.description} is_open={this.state.desc_editor}
                                   func={this.handleDescClose}/>
                <Box xs="12" display={"flex"} justifyContent={"center"}>
                    {this.props.page - 5 >= 1 ? <p style={{margin: '0'}}>...</p> : <p/>}
                    {((rows, i, len) => {
                        while (++i <= len) {
                            if (i >= 1 && i <= this.props.total / 12 + 1 && (i - 1) !== this.props.total / 12) {
                                if (i != this.props.page) {
                                    rows.push(<a id={i} onClick={this.set_page} href=""
                                                 style={{margin: "0 3px 0 3px"}}>{i}</a>)
                                } else {
                                    rows.push(<a style={{margin: "0 3px 0 3px"}}>{i}</a>)
                                }
                            }
                        }
                        return rows;
                    })([], this.props.page - 5, this.props.page + 5)}
                    {this.props.page + 5 <= this.props.total / 12
                        ? <p style={{margin: '0'}}>...</p>
                        : <p/>
                    }
                </Box>
            </div>
        );
    }
}