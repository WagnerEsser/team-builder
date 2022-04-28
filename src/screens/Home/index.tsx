import { Groups } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { containerBackgroundColor, containerBorderColor } from "../../colors";
import TeamList from "../../components/SimpleList";
import { Form, INITIAL_VALUES } from "./types";
import { getListByString, getQtyTeams, shuffleList, treatList } from "./utils";

const Home = () => {
  const [values, setValues] = useState<Form>(INITIAL_VALUES);
  const [teams, setTeams] = useState<string[][]>([]);
  const playersList = useMemo(
    () => getListByString(values.players),
    [values.players]
  );
  const remainingPlayerLength =
    values.qtyTeams >= 1 && playersList.length % values.qtyPlayersByTeam;
  const closedTeams = useMemo(
    () => teams.slice(0, values.qtyTeams),
    [teams, values.qtyTeams]
  );
  const remainingPlayers = useMemo(
    () => [...teams].slice(values.qtyTeams),
    [teams, values.qtyTeams]
  );

  const onChangePlayers = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { value } = event.target;
    const qtyPlayers = getListByString(value).length;
    const qtyTeams = getQtyTeams(qtyPlayers, values.qtyPlayersByTeam);
    setValues((values) => ({ ...values, players: value, qtyTeams }));
  };

  const onChangeQtyPlayersByTeam = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const qtyPlayersByTeam = +event.target.value;
    const qtyTeams = getQtyTeams(playersList.length, qtyPlayersByTeam);
    setValues((values) => ({ ...values, qtyPlayersByTeam, qtyTeams }));
  };

  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setTeams([]);
  };

  const mountTeams = () => {
    const qtyPlayers = playersList.length;
    const result: string[][] = [];
    const randomList = shuffleList(playersList);

    for (let index = 0; index < qtyPlayers; index += values.qtyPlayersByTeam) {
      const time = randomList.splice(0, values.qtyPlayersByTeam);
      result.push(time);
    }
    setTeams(result);
  };

  const cleanList = () => {
    const treatedTeams = teams.map((team) => treatList(team));
    setTeams(treatedTeams);
  };

  const copyList = () => {};

  return (
    <Container maxWidth='md'>
      <Box
        width='100%'
        border='1px solid'
        borderRadius='24px'
        padding='32px'
        marginY='32px'
        borderColor={containerBorderColor}
        sx={{ backgroundColor: containerBackgroundColor }}
      >
        <Typography variant='h4' marginBottom='48px' align='center'>
          Sorteador de times de vôlei
        </Typography>

        <Box display='flex' justifyContent='center' marginBottom='64px'>
          <Box display='flex' flexDirection='column' marginRight='12px'>
            <Box display='flex'>
              <Groups />
              <Typography
                component='label'
                htmlFor='players'
                sx={{ marginLeft: "8px" }}
              >
                Lista de jogadores:
              </Typography>
            </Box>
            <TextareaAutosize
              id='players'
              placeholder='Digite ou cole aqui a lista de jogadores...'
              style={{
                width: 300,
                borderRadius: 12,
                borderColor: containerBorderColor,
                padding: 16,
                marginTop: 12,
                fontFamily: "Roboto",
                fontSize: 16,
              }}
              minRows={18}
              value={values.players}
              onChange={onChangePlayers}
            />
          </Box>
          <Box
            width={400}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            marginLeft='12px'
          >
            <Box>
              <Box display='flex' alignItems='center'>
                <Typography component='label' htmlFor='qtyPlayersByTeam'>
                  Quantidade de jogadores por time:
                </Typography>
                <TextField
                  size='small'
                  sx={{ width: 50, marginLeft: "12px", textAlign: "center" }}
                  style={{ textAlign: "center" }}
                  id='qtyPlayersByTeam'
                  value={values.qtyPlayersByTeam}
                  onChange={onChangeQtyPlayersByTeam}
                />
              </Box>
              <Box marginTop='24px'>
                <Typography>{playersList.length} jogadores</Typography>
                <Typography>
                  {values.qtyTeams}{" "}
                  {values.qtyTeams === 1 ? "time fechado" : "times fechados"}
                </Typography>
                {!!remainingPlayerLength && (
                  <Typography>
                    1 time com {remainingPlayerLength} jogadores
                  </Typography>
                )}
              </Box>
            </Box>

            <Box display='flex' marginTop='32px' alignSelf='baseline'>
              <Box marginRight='8px'>
                <Button variant='contained' size='large' onClick={mountTeams}>
                  Sortear
                </Button>
              </Box>
              <Button variant='outlined' size='large' onClick={resetForm}>
                Resetar
              </Button>
            </Box>
          </Box>
        </Box>

        <TeamList items={closedTeams} />
        <TeamList items={remainingPlayers} listTitle='Sobra' />

        {closedTeams.length > 0 && (
          <Box marginTop='24px' width='100%' textAlign='center'>
            <Button
              variant='contained'
              color='warning'
              size='large'
              onClick={cleanList}
              sx={{ marginRight: "8px", width: 180 }}
            >
              Formatar lista
            </Button>
            <Button
              variant='contained'
              color='success'
              size='large'
              onClick={copyList}
              sx={{ marginLeft: "8px", width: 180 }}
            >
              Copiar
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
