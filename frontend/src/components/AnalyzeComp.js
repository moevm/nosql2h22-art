import '../App/App.css';
import {Button, Typography} from '@mui/material';
import FilterComp from './FilterComp';

const fields = [
    {
        value: 'Museum',
        label: 'Музей'
    },
    {
        value: 'Materials',
        label: 'Материалы'
    }
];

function AnalyzeComp() {
    const [field, setfield] = React.useState('Museum');
    return (
        <div>
            <div className='analyzeContainer'>
                <div className=''>
                    <TextField
                        id="outlined-basic"
                        label="Поле"
                        variant="outlined"
                        select
                        value={field}
                        onChange={genreChange}
                    >
                        {fields.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant='contained' color='primary'>Save as .png</Button>
                </div>
                <div className=''>
                    <Typography>Analysis for</Typography>
                </div>
                <div className=''>
                    <FilterComp/>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeComp;