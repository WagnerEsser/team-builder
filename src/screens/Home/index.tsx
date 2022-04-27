import {
  Box,
  Button,
  Container,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { containerBackgroundColor, containerBorderColor } from "../../colors";
import SimpleList from "../../components/SimpleList";
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
    console.log(`🚀 ~ cleanList`);
    const treatedTeams = teams.map((team) => treatList(team));
    setTeams(treatedTeams);
  };

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

        <Box display='flex' justifyContent='center'>
          <Box display='flex' flexDirection='column' marginRight='12px'>
            <Typography component='label' htmlFor='players'>
              Lista de jogadores:
            </Typography>
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
            <Box marginTop='24px' display='flex' alignItems='center'>
              <Button
                variant='contained'
                color='success'
                size='small'
                onClick={cleanList}
              >
                Formatar lista
              </Button>
            </Box>
          </Box>
          <Box width={400} marginLeft='12px'>
            <Box marginTop='24px' display='flex' alignItems='center'>
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

            <Box display='flex' marginTop='32px'>
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

        <SimpleList items={closedTeams} />
        <SimpleList items={remainingPlayers} listTitle='Sobra' />
      </Box>
    </Container>
  );
};

export default Home;
