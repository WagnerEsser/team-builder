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
import { Team } from "../../screens/Home/types";
import { ChangeEvent } from "react";
import { FlexBox } from "../../screens/Home/styles";

type Props = {
  teams: Team[];
  listTitle?: string;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
};

const TeamList = ({ teams, listTitle, setTeams }: Props) => {
  const onChangeNameTeam =
    (index: number) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const { value } = event.target;
      const newTeamList = [...teams];
      newTeamList[index].name = value;
      setTeams(newTeamList);
    };

  return (
    <FlexBox
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent='space-around'
      marginTop='16px'
    >
      {teams.map((team, index) => (
        <Box marginTop={{ xs: "24px", md: "0px" }}>
          <List
            dense={true}
            subheader={
              <ListSubheader sx={{ background: "none" }}>
                <TextField
                  size='small'
                  variant='standard'
                  value={listTitle || team.name}
                  onChange={onChangeNameTeam(index)}
                />
              </ListSubheader>
            }
          >
            {team.players.map((player) => (
              <ListItem>
                <ListItemIcon>
                  <SportsHandball />
                </ListItemIcon>
                <ListItemText primary={player} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </FlexBox>
  );
};

export default TeamList;
