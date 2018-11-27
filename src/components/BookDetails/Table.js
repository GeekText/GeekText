import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(img, title, author, price, rating, release, genre, seller) {
    counter += 1;
    return { id: counter, img, title, author, price, rating, release, genre, seller };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'img', numeric: false, disablePadding: false, label: '' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
    { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
    { id: 'rating', numeric: false, disablePadding: false, label: 'Book Rating' },
    { id: 'release', numeric: false, disablePadding: false, label: 'Release Date (yyyy/mm/dd)' },
    { id: 'genre', numeric: false, disablePadding: false, label: 'Genre' },
    { id: 'seller', numeric: false, disablePadding: false, label: 'Top Seller' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="none">
                        
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
          </Typography>
                ) : (
                        <Typography variant="h6" id="tableTitle">
                            Books
          </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    titletablecell: {
        fontSize: 25,
    },
    authortablecell: {
        fontSize: 16,
    },
        tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'title',
        selected: [],
        data: [
            createData('https://images-na.ssl-images-amazon.com/images/I/61GMYPmO%2BrL._SX401_BO1,204,203,200_.jpg', 'Software Engineering (10th Edition)', 'Ian Sommerville', '$49.99', '5.0', '2015/4/3', 'Programming', 'Yes'), 
            createData('https://images-na.ssl-images-amazon.com/images/I/41GlJ-dGjoL._SX379_BO1,204,203,200_.jpg', 'Designing Software Synthesizer Plug-Ins', 'Williem Pirkle', '$30.99', '4.5', '2014/11/26', 'Programming', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/41eRuKxPb3L._SX327_BO1,204,203,200_.jpg', 'Becoming', 'Michelle Obama', '$15.99', '5.0', '2018/11/13', 'Biographies', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/51Mpyi1NzNL._SX327_BO1,204,203,200_.jpg', 'Calypso', 'David Sedaris', '$15.99', '4.0', '2018/5/29', 'Literature & Fiction', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/41aCsKYeDwL._SX326_BO1,204,203,200_.jpg', 'It: A Novel', 'Stephen King', '$10.99', '5.0', '2016/1/5', 'Literature & Fiction', 'Yes'),
            createData('https://images-na.ssl-images-amazon.com/images/I/51oGf6GzusL._SX428_BO1,204,203,200_.jpg', 'Fantastic Beasts and Where to Find Them', 'J.K. Rowling', '$10.99', '4.5', '2017/3/14', 'Literature & Fiction', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/41qI9quGIdL._SX324_BO1,204,203,200_.jpg', 'Fahrenheit 451', 'Ray Bradbury', '$10.99', '3.0', '2012/1/10', 'Science Fiction & Fantasy', 'Yes'),
            createData('https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg', 'Twilight (The Twilight Saga, Book 1)', 'Stephenie Meyer', '$12.99', '5.0', '2011/8/15', 'Science Fiction & Fantasy', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/51etXxuYADL._SX330_BO1,204,203,200_.jpg', 'To Kill a Mockingbird', 'Harper Lee', '$10.99', '4.0', '2005/6/5', 'Literature & Fiction', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/61-ihJwgBBL._SX331_BO1,204,203,200_.jpg', 'Naruto, Vol. 1: Uzumaki Naruto', 'Masashi Kishimoto', '$12.99', '5.0', '2003/6/9', 'Manga', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/51NuYi4-XoL.jpg', 'Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '$10.99', '5.0', '2001/9/11', 'Fantasy', 'No'),
            createData('https://images-na.ssl-images-amazon.com/images/I/51sw9sAJJ3L._SX327_BO1,204,203,200_.jpg', 'Fire & Blood: 300 Years Before A Game of Thrones', 'George R. R. Martin', '$15.99', '5.0', '2018/11/20', 'Fantasy', 'No'),
        ],
        page: 0,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow 
                                        >
                                            <TableCell
                                                padding="default">                                              
                                            </TableCell>
                                            <TableCell padding="default">
                                                <img src={n.img} height={220} width={170} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="default" className={classes.titletablecell}>
                                                {n.title}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.author}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.price}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.rating}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.release}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.genre}
                                            </TableCell>
                                            <TableCell padding="default" className={classes.authortablecell}>
                                                {n.seller}
                                            </TableCell>
                                           
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);