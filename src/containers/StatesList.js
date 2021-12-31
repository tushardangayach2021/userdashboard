import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import Input from "@mui/material/Input";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { API } from "../api/api";
import { fetch } from "../api/httpClient";
import { STATESDATA } from "../data/statesdata"
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const CustomTableCell = ({
    row,
    name,
    onChange,
    state_id,
    district_id,
    editOn,
    city_id,
    touched,
    errors,
    values
}) => {
    // const classes = useStyles();
    // alert(state_id);
    const { isEditMode } = row;
    return (
        <TableCell
            align="left"
        // className={classes.tableCell}
        >
            {isEditMode ? (
                <>
                    <Field
                        type="text"
                        name={name}
                        value={row[name]}
                        id="exampleFirstName"
                        placeholder="Enter your first name"
                        className={`form-control mt-1 ${touched[name] && errors[name] ? "is-invalid" : ""}`}
                        onChange={(e) => {
                            console.log("name", errors[name], name, values);
                            values[name]=e.target.value;
                            onChange(e, row, editOn, state_id, district_id, city_id)
                        }
                        }
                    />
                    <ErrorMessage
                        component="span"
                        name={name}
                        className="invalid-feedback"
                    />
                    </>
            ) : (
                row[name]
            )}
        </TableCell>
    );
};
function ChildRow(props) {
    const {
        row,
        onToggleEditMode,
        onChange,
        onRevert,
        state_id,
        district_id
    } = props;
    const [opena, setOpena] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow key={row.date}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpena(!opena)}
                    >
                        {opena ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <CustomTableCell
                    {...{
                        row,
                        name: "name",
                        onChange,
                        editOn: "district",
                        state_id,
                        district_id
                    }}
                />
                <CustomTableCell
                    {...{
                        row,
                        name: "dof",
                        onChange,
                        editOn: "district",
                        state_id,
                        district_id
                    }}
                />
                <CustomTableCell
                    {...{
                        row,
                        name: "description",
                        onChange,
                        editOn: "district",
                        state_id,
                        district_id
                    }}
                />
                <TableCell
                // className={classes.selectTableCell}
                >
                    {row.isEditMode ? (
                        <>
                            <IconButton
                                aria-label="done"
                                onClick={() => onToggleEditMode(state_id, "district", row.id)}
                            >
                                <DoneIcon />
                            </IconButton>
                            <IconButton
                                aria-label="revert"
                                onClick={() => onRevert(state_id, "district", row.id)}
                            >
                                <RevertIcon />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton
                            aria-label="delete"
                            onClick={() => onToggleEditMode(state_id, "district", row.id)}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={opena} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Cities
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>D.O.F.</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row
                                        ? row.cities.map((row) => (
                                            <TableRow>
                                                <CustomTableCell
                                                    {...{
                                                        row,
                                                        name: "name",
                                                        onChange,
                                                        editOn: "city",
                                                        state_id,
                                                        district_id,
                                                        city_id: row.id
                                                    }}
                                                />
                                                <CustomTableCell
                                                    {...{
                                                        row,
                                                        name: "dof",
                                                        onChange,
                                                        editOn: "city",
                                                        state_id,
                                                        district_id,
                                                        city_id: row.id
                                                    }}
                                                />
                                                <CustomTableCell
                                                    {...{
                                                        row,
                                                        name: "description",
                                                        onChange,
                                                        editOn: "city",
                                                        state_id,
                                                        district_id,
                                                        city_id: row.id
                                                    }}
                                                />
                                                <TableCell
                                                // className={classes.selectTableCell}
                                                >
                                                    {row.isEditMode ? (
                                                        <>
                                                            <IconButton
                                                                aria-label="done"
                                                                onClick={() =>
                                                                    onToggleEditMode(
                                                                        state_id,
                                                                        "city",
                                                                        district_id,
                                                                        row.id
                                                                    )
                                                                }
                                                            >
                                                                <DoneIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label="revert"
                                                                onClick={() =>
                                                                    onRevert(
                                                                        state_id,
                                                                        "city",
                                                                        district_id,
                                                                        row.id
                                                                    )
                                                                }
                                                            >
                                                                <RevertIcon />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() =>
                                                                onToggleEditMode(
                                                                    state_id,
                                                                    "city",
                                                                    district_id,
                                                                    row.id
                                                                )
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        : []}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
function Row(props) {
    const { row, onToggleEditMode, onChange, onRevert, state_id } = props;
    const [open, setOpen] = React.useState(false);
    // const [rows, setRows] = React.useState(row);
    // alert(JSON.stringify(row));
    const StateTableSchema = Yup.object().shape({
        name: Yup.string()
            .required("Required"),
        dof: Yup.string()
            .required("Required"),
        description: Yup.string()
            .required("Required"),
    })
    return (
        <React.Fragment>
            <Formik
                initialValues={{ name: row.name, dof: row.dof, description: row.description }}
                validationSchema={StateTableSchema}
                onSubmit={(values) => {
                    console.log(values)
                    // handleSubmit(values);
                }}>{({ values, touched, errors, isSubmitting }) => {
                    console.log(values)
                    return (
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                         {/* <Form> */}

                            <CustomTableCell
                                {...{ row, name: "name", onChange, editOn: "state", state_id, touched, errors, values }}
                            />
                            <CustomTableCell
                                {...{ row, name: "dof", onChange, editOn: "state", state_id, touched, errors, values }}
                            />
                            <CustomTableCell
                                {...{ row, name: "description", onChange, editOn: "state", state_id, touched, errors, values }}
                            />
                        {/* </Form> */}

                            <TableCell
                            // className={classes.selectTableCell}
                            >
                                {row.isEditMode ? (
                                    <>
                                        <IconButton
                                            aria-label="done"
                                            onClick={() => onToggleEditMode(row.id)}
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton aria-label="revert" onClick={() => onRevert(row.id)}>
                                            <RevertIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => onToggleEditMode(row.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    )
                }
                }
            </Formik>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.districts ? "Districts" : "Cities"}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Name</TableCell>
                                        <TableCell>D.O.F.</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.districts
                                        ? row.districts.map((row) => (
                                            <ChildRow
                                                row={row}
                                                onToggleEditMode={onToggleEditMode}
                                                onChange={onChange}
                                                onRevert={onRevert}
                                                district_id={row.id}
                                                state_id={state_id}
                                            />
                                        ))
                                        : null}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired
            })
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired
    }).isRequired
};



export default function CollapsibleTable() {
    const [previous, setPrevious] = React.useState({});
    const [rows, setRows] = React.useState([...STATESDATA]);
    // alert(JSON.stringify(rows));
    // const { isEditMode } = rows;

    //   React.useEffect(async ()=>{
    //     const url = API.CORE.STATEDATA;
    //     try {
    //         const response = await fetch(url);
    //         console.log(response)
    //         setRows(response.data)
    //     }
    //     catch{
    //         console.log("Issue in fetching states data");
    //     }
    // }, [])
    const onToggleEditMode = (
        state_id,
        editOn = "state",
        district_id,
        city_id
    ) => {
        // alert(state_id);
        // state ho
        if (editOn === "state") {
            setRows((state) => {
                return rows.map((row) => {
                    if (row.id === state_id) {
                        return { ...row, isEditMode: !row.isEditMode };
                    }
                    return row;
                });
            });
        }
        if (editOn === "district") {
            // district
            setRows((state) => {
                return rows.map((row) => {
                    if (row.id === state_id) {
                        row.districts = row.districts.map((row) => {
                            if (row.id === district_id) {
                                return { ...row, isEditMode: !row.isEditMode };
                            }
                            return row;
                        });
                        return row;
                    }
                    return row;
                });
            });
        }
        // cities
        if (editOn === "city") {
            setRows((state) => {
                return rows.map((row) => {
                    if (row.id === state_id) {
                        row.districts = row.districts.map((row) => {
                            if (row.id === district_id) {
                                row.cities = row.cities.map((row) => {
                                    if (row.id === city_id) {
                                        return { ...row, isEditMode: !row.isEditMode };
                                    }
                                    return row;
                                });
                                return row;
                            }
                            return row;
                        });
                        return row;
                    }
                    return row;
                });
            });
        }
    };

    const onChange = (e, row, editOn, state_id, district_id, city_id) => {
        // alert(editOn);
        if (editOn === "state") {
            if (!previous[row.id]) {
                setPrevious((state) => ({ ...state, [row.id]: row }));
            }
            const value = e.target.value;
            const name = e.target.name;
            const { id } = row;
            const newRows = rows.map((row) => {
                if (row.id === id) {
                    return { ...row, [name]: value };
                }
                return row;
            });
            setRows(newRows);
        }
        if (editOn === "district") {
            if (!previous[rows[state_id].districts[district_id]]) {
                setPrevious((state) => ({
                    ...state,
                    [rows[state_id]?.districts[district_id]?.id]: row
                }));
            }
            const value = e.target.value;
            const name = e.target.name;
            const newRows = rows.map((row) => {
                if (row.id === state_id) {
                    row.districts = row.districts.map((row) => {
                        if (row.id === district_id) {
                            return { ...row, [name]: value };
                        }
                        return row;
                    });
                    return row;
                }
                return row;
            });
            setRows(newRows);
        }
        if (editOn === "city") {
            // alert(city_id);
            if (!previous[rows[state_id]?.districts[district_id]]?.cities[city_id]) {
                setPrevious((state) => ({
                    ...state,
                    [rows[state_id]?.districts[district_id]?.cities[city_id]?.id]: row
                }));
            }
            const value = e.target.value;
            const name = e.target.name;
            const newRows = rows.map((row) => {
                if (row.id === state_id) {
                    row.districts = row.districts.map((row) => {
                        if (row.id === district_id) {
                            row.cities = row.cities.map((row) => {
                                if (row.id === city_id) {
                                    return { ...row, [name]: value };
                                }
                                return row;
                            });
                            return row;
                        }
                        return row;
                    });
                    return row;
                }
                return row;
            });
            setRows(newRows);
        }
    };

    const onRevert = (state_id, editOn = "state", district_id, city_id) => {
        const newRows = rows.map((row) => {
            if (row.id === state_id) {
                return previous[state_id] ? previous[state_id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious((state) => {
            delete state[state_id];
            return state;
        });
        if (editOn === "state") {
            onToggleEditMode(state_id);
        }
        if (editOn === "district") {
            onToggleEditMode(state_id, "district", district_id);
        }
        if (editOn === "city") {
            onToggleEditMode(state_id, "city", district_id, city_id);
        }
    };
    return (
        <Box className="">

            <div className="container mt-5 pt-5">
                <div className="row">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Name</TableCell>
                                    <TableCell>D.O.F.</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row
                                        key={row.name}
                                        row={row}
                                        state_id={row.id}
                                        onToggleEditMode={onToggleEditMode}
                                        onChange={onChange}
                                        onRevert={onRevert}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Box>
    );
}
