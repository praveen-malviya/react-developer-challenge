import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const SearchBar = ({setSearchQuery, searchInputRef, trackSymbol, buttonEnable}) => {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p:"10px", m:"20px", boxShadow: 2, borderRadius: '16px'}}>
            <SearchIcon sx={{ marginRight: '10px' }} />
            <Input
            sx={{ marginRight: '10px' }}
                placeholder={"Add New Symbol..."}
                onChange={(e)=> setSearchQuery(e.target.value)}
                inputRef={searchInputRef}
                disableUnderline
            />
            <Button 
           disabled={!buttonEnable}
            variant="contained" onClick={()=> trackSymbol(searchInputRef)}>Add to track</Button>
        </Box>
    )
}

export default SearchBar
