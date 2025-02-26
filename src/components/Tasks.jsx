import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Tab, Tabs, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Tasks() {
    const task = useSelector((state) => state.tasks);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className='container mx-auto max-w-5xl p-6 my-12'>
            <div className="p-4 flex flex-col gap-2 items-center bg-white shadow-md rounded-lg">
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    className='flex flex-row justify-center items-center gap-2'
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Text"
                        defaultValue="Hello World"
                        style={{width: "full"}}
                    />
                    <Button variant="contained">Submit</Button>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Complete" {...a11yProps(1)} />
                            <Tab label="Incomplete" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        All Items
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Complete Items
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Incomplete Items
                    </CustomTabPanel>
                </Box>

                <div>{task}</div>
            </div>
        </section>
    )
}
