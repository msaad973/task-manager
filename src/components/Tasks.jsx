import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, Typography, Tab, Tabs, TextField, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { fetchTasks, removeTask, toggleTaskCompletion, addTask } from '../store/slices/tasksSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks || []); // Ensure it's always an array
    const status = useSelector((state) => state.tasks.status);

    const [value, setValue] = useState(0);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAdd = () => {
        if (taskInput.trim() === '') return;
        dispatch(addTask({ id: Date.now(), todo: taskInput, completed: false }));
        setTaskInput('');
    };

    function TaskCard({ task }) {
        return (
            <Card sx={{ width: '100%', mt: 2 }} className='flex flex-row justify-between items-center'>
                <CardContent className='w-10/12'>
                    <Typography gutterBottom variant="h5" component="div">
                        {task.todo}
                    </Typography>
                </CardContent>
                <CardContent className='w-2/12'>
                    <CardContent className='w-3/12 flex gap-2'>
                        <IconButton size="small" onClick={() => dispatch(toggleTaskCompletion(task.id))}>
                            {task.completed ? <UndoIcon color='primary' /> : <CheckCircleIcon color='primary' /> }
                        </IconButton>
                        <IconButton size="small" onClick={() => dispatch(removeTask(task.id))}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </CardContent>
                </CardContent>
            </Card>
        );
    }

    return (
        <section className="container mx-auto max-w-3xl p-6 my-12">
            <div className="p-4 flex flex-col gap-2 items-center bg-white shadow-md rounded-lg">
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }} className="flex flex-row justify-center items-center gap-2" noValidate autoComplete="off">
                    <TextField required id="outlined-required" label="Enter Task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                    <Button onClick={handleAdd} variant='contained' className="bg-violet-800 hover:bg-violet-950 text-white font-bold py-1 px-3 rounded-md mx-2">
                        Add
                    </Button>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex flex-row justify-center items-center">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Complete" {...a11yProps(1)} />
                            <Tab label="Incomplete" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        {status === 'loading' ? (
                            <p>Loading tasks...</p>
                        ) : tasks.length > 0 ? (
                            tasks.slice().reverse().map((task) => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <p>No tasks available</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        {tasks.filter((task) => task.completed).length > 0 ? (
                            tasks.filter((task) => task.completed).map((task) => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <p>No completed tasks</p>
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        {tasks.filter((task) => !task.completed).length > 0 ? (
                            tasks.filter((task) => !task.completed).map((task) => <TaskCard key={task.id} task={task} />)
                        ) : (
                            <p>No incomplete tasks</p>
                        )}
                    </CustomTabPanel>
                </Box>
            </div>
        </section>
    );
}
