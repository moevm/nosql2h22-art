import React, {PureComponent} from "react";
import {Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper} from "@mui/material";
import '../App/App'

export default class TableComp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TableContainer component={Paper}>
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
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.genre}</TableCell>
                                <TableCell align="right">{row.museum_name}</TableCell>
                                <TableCell align="right">{row.materials}</TableCell>
                                <TableCell align="right">{row.start_year}</TableCell>
                                <TableCell align="right">{row.end_year}</TableCell>
                                <TableCell align="right"><a href={row.url} target="_blank">Ссылка</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}