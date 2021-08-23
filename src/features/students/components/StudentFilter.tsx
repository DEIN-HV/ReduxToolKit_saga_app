import { Box, Grid, Select, makeStyles, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Clear, Search } from '@material-ui/icons';
import { Value } from '@material-ui/lab';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

const useStyles = makeStyles((themes) => ({
    root: {},
}))

export interface StudentFilterProps {
    filter: ListParams;
    cityList: City[];

    onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFilterChange?: (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
    onSortChange?: (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
    onClearClick?: () => void;
}

export default function StudentFilter({ filter, cityList, onSearchChange, onFilterChange, onSortChange, onClearClick }: StudentFilterProps) {
    const classes = useStyles();
    const searchRef = useRef<HTMLInputElement>();

    const handleOnClear = () => {
        if (searchRef.current) searchRef.current.value = '';
        onClearClick?.();
    }

    return (
        <Box>
            <Grid container spacing={2}>

                {/* SEARCH BAR */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="searchByName"
                            onChange={onSearchChange}
                            defaultValue={filter.name_like}
                            inputRef={searchRef}
                            endAdornment={<Search />}
                        />
                    </FormControl>
                </Grid>

                {/* FILTER */}
                <Grid item xs={6} md={3} lg={2}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel>Filter By City</InputLabel>
                        <Select
                            value={filter.city || ''}
                            onChange={onFilterChange}
                            labelId="City"
                            label="Filter By City">
                            <MenuItem value="" >All</MenuItem>
                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* SORT */}
                <Grid item xs={4} md={2} lg={2}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel>Sort By Mark</InputLabel>
                        <Select
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={onSortChange}
                            labelId="sort"
                            label="Sort By Mark">
                            <MenuItem value="" >No sort</MenuItem>
                            <MenuItem key='2' value='mark.desc'>Descending</MenuItem>
                            <MenuItem key='1' value='mark.asc'>Acsending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2} md={1} lg={1}>
                    <Tooltip title="Clear all">
                        <IconButton onClick={handleOnClear} >
                            <Clear />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    );
}
