import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Creatures() {
  const [creatures, setCreatures] = useState<any[]>([]);

  const fetchCreatures = useCallback(async () => {
    let response = await fetch('http://localhost/api/creatures');
    const json = await response.json();
    console.log(json.data)
    setCreatures(json.data);
  }, []);

  useEffect(() => {
    fetchCreatures()
  }, [fetchCreatures])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sprite</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Race</TableCell>
              <TableCell align="center">Trait</TableCell>
              <TableCell align="center">Health</TableCell>
              <TableCell align="center">Attack</TableCell>
              <TableCell align="center">Intelligence</TableCell>
              <TableCell align="center">Defense</TableCell>
              <TableCell align="center">Speed</TableCell>
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creatures.map((creature) => 
              <TableRow
                key={creature.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"><img src={creature.battle_sprite}/></TableCell>
                <TableCell>{creature.name}</TableCell>
                <TableCell align="center"><img src={creature.klass.icon}/></TableCell>
                <TableCell align="center">{creature.race.name}</TableCell>
                <TableCell align="center">{creature.trait.name}</TableCell>
                <TableCell align="center">{creature.health}</TableCell>
                <TableCell align="center">{creature.attack}</TableCell>
                <TableCell align="center">{creature.intelligence}</TableCell>
                <TableCell align="center">{creature.defense}</TableCell>
                <TableCell align="center">{creature.speed}</TableCell>
                <TableCell align="right">{creature.trait.tags.join(',')}</TableCell>
              </TableRow> 
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}