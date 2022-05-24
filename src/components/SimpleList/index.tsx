import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  SportsHandball,
} from "@mui/icons-material";
import { Team } from "../../screens/Home/types";
import { ChangeEvent } from "react";
import { FlexBox } from "../../screens/Home/styles";
import { WrapperArrow } from "./styles";
import { containerBorderColor } from "../../colors";

type Props = {
  teams: Team[];
  listTitle?: string;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  isEdition?: boolean;
  onClickUp?: (teamIndex: number, playerIndex: number) => void;
  onClickDown?: (teamIndex: number, playerIndex: number) => void;
};

const TeamList = ({
  teams,
  listTitle,
  setTeams,
  isEdition = false,
  onClickUp,
  onClickDown,
}: Props) => {
  const onChangeNameTeam =
    (index: number) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const { value } = event.target;
      const newTeamList = [...teams];
      newTeamList[index].name = value;
      setTeams(newTeamList);
    };

  const onUp = (teamIndex: number, playerIndex: number) => () => {
    onClickUp && onClickUp(teamIndex, playerIndex);
  };

  const onDown = (teamIndex: number, playerIndex: number) => () => {
    onClickDown && onClickDown(teamIndex, playerIndex);
  };

  return (
    <FlexBox
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent='space-around'
      marginTop='16px'
    >
      {teams.map((team, teamIndex) => (
        <Box
          marginTop={{ xs: "24px", md: "0px" }}
          marginX={{ xs: "0px", md: "12px" }}
        >
          <List
            dense={true}
            subheader={
              <ListSubheader sx={{ background: "none" }}>
                <TextField
                  size='small'
                  variant='standard'
                  value={listTitle || team.name}
                  onChange={onChangeNameTeam(teamIndex)}
                />
              </ListSubheader>
            }
          >
            {team.players.map((player, playerIndex) => (
              <ListItem
                sx={{
                  border: isEdition
                    ? `1px solid ${containerBorderColor}`
                    : "none",
                }}
              >
                <ListItemIcon>
                  <SportsHandball />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <FlexBox justifyContent='space-between' alignItems='center'>
                      {player}
                      {isEdition && (
                        <FlexBox flexDirection='column' marginLeft='8px'>
                          <WrapperArrow onClick={onUp(teamIndex, playerIndex)}>
                            <IconButton size='small'>
                              <ArrowDropUp />
                            </IconButton>
                          </WrapperArrow>
                          <WrapperArrow
                            marginTop='2px'
                            onClick={onDown(teamIndex, playerIndex)}
                          >
                            <IconButton size='small'>
                              <ArrowDropDown />
                            </IconButton>
                          </WrapperArrow>
                        </FlexBox>
                      )}
                    </FlexBox>
                  }
                >
                  <ArrowDropUp />
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </FlexBox>
  );
};

export default TeamList;
