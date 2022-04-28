import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import { SportsHandball } from "@mui/icons-material";

type Props = {
  items: string[][];
  listTitle?: string;
};

const TeamList = ({ items, listTitle }: Props) => {
  return (
    <Box display='flex' justifyContent='space-around' marginTop='32px'>
      {items.map((team, teamNumber) => (
        <List
          dense={true}
          subheader={
            <ListSubheader sx={{ background: "none" }}>
              <TextField
                size='small'
                variant='standard'
                value={listTitle || `Time ${teamNumber + 1}`}
              />
            </ListSubheader>
          }
        >
          {team.map((player) => (
            <ListItem>
              <ListItemIcon>
                <SportsHandball />
              </ListItemIcon>
              <ListItemText primary={player} />
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );
};

export default TeamList;
