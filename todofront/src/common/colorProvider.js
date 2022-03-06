import { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal , green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey } from '@mui/material/colors';

export const colorProvider = () => {
    const SHADE = 800;
    const colors =
        { 
            'red' : red[SHADE],
            'deepPurple' : deepPurple[SHADE],
            'lightBlue' : lightBlue[SHADE],
            'green' : green[SHADE],
            'yellow' : yellow[SHADE],
            'deepOrange' : deepOrange[SHADE],
            'blueGrey' : blueGrey[SHADE],
            'pink' : pink[SHADE],
            'indigo' : indigo[SHADE],
            'cyan' : cyan[SHADE],
            'lightGreen' : lightGreen[SHADE],
            'amber' : amber[SHADE],
            'brown' : brown[SHADE],
            'purple' : purple[SHADE],        
            'blue' : blue[SHADE],
            'teal' : teal[SHADE],
            'lime' : lime[SHADE],
            'orange' : orange[SHADE],
            'grey' : grey[SHADE]
        }
    return colors;
};