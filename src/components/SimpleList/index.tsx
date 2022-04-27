import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { SportsHandball } from "@mui/icons-material";
import { borderColor } from "../../colors";

type Props = {
  items: string[][];
  listTitle?: string;
};

const SimpleList = ({ items, listTitle }: Props) => (
  <Box display='flex' justifyContent='space-around' marginTop='32px'>
    {items.map((team, teamNumber) => (
      <List
        dense={true}
        subheader={
          <ListSubheader sx={{ background: "none" }}>
            <Box
              width='200px'
              marginY='16px'
              textAlign='center'
              borderBottom={`1px solid ${borderColor}`}
            >
              <Typography variant='button' color={borderColor}>
                {listTitle || `Time ${teamNumber + 1}`}
              </Typography>
            </Box>
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

export default SimpleList;
