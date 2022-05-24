import { Groups } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import TeamList from "../../components/SimpleList";
import {
  FlexBox,
  FlexBoxCenter,
  PlayerQtyTextField,
  TextArea,
  TextAreaWrapper,
  WrapperContainer,
} from "./styles";
import { Form, INITIAL_VALUES, Team } from "./types";
import {
  getListByString,
  getListForCopy,
  getQtyTeams,
  shuffleList,
  treatList,
} from "./utils";

const Home = () => {
  const [values, setValues] = useState<Form>(INITIAL_VALUES);
  const [listCleaned, setListCleaned] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const playersList = useMemo(
    () => getListByString(values.malePlayers + "\n" + values.femalePlayers),
    [values.malePlayers, values.femalePlayers]
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

  const onChangeMales = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { value } = event.target;
    const qtyPlayers = getListByString(
      value + "\n" + values.femalePlayers
    ).length;
    const qtyTeams = getQtyTeams(qtyPlayers, values.qtyPlayersByTeam);
    setValues((values) => ({ ...values, malePlayers: value, qtyTeams }));
  };

  const onChangeFemales = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { value } = event.target;
    const qtyPlayers = getListByString(
      value + "\n" + values.malePlayers
    ).length;
    const qtyTeams = getQtyTeams(qtyPlayers, values.qtyPlayersByTeam);
    setValues((values) => ({ ...values, femalePlayers: value, qtyTeams }));
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
    setListCleaned(false);
  };

  const mountMaleTeams = (result: Team[]) => {
    const males = getListByString(values.malePlayers);
    if (males.length === 0) return result;
    const randomMales = shuffleList(males);
    const qtyMales = randomMales.length;
    const qtyMalesPerTeam = parseInt((qtyMales / values.qtyTeams).toString());
    const remainingMaleLength = qtyMales % values.qtyTeams;

    let counter = 1;
    let currentTeam = 0;
    let currentIndex = 0;
    let currentListTeam = [];

    while (counter <= qtyMalesPerTeam + 1 && currentTeam !== values.qtyTeams) {
      currentListTeam.push(randomMales[currentIndex + counter - 1]);
      if (counter <= qtyMalesPerTeam) {
        counter++;
      }
      if (counter === qtyMalesPerTeam + 1) {
        const newTeam = {
          name: `Time ${currentTeam + 1}`,
          players: currentListTeam,
        };
        result.push(newTeam);

        currentTeam++;
        counter = 1;
        currentIndex += qtyMalesPerTeam;
        currentListTeam = [];
      }
    }

    if (remainingMaleLength > 0) {
      for (let index = 0; index < remainingMaleLength; index++) {
        result[index].players.push(randomMales[currentIndex + index]);
      }
    }

    return result;
  };

  const mountFemaleTeams = (result: Team[]): Team[] => {
    const females = getListByString(values.femalePlayers);
    if (females.length === 0) return result;
    const randomFemales = shuffleList(females);
    const qtyFemales = randomFemales.length;
    const qtyFemalesPerTeam = parseInt(
      (qtyFemales / values.qtyTeams).toString()
    );
    const remainingFemaleLength = qtyFemales % values.qtyTeams;

    let counter = 1;
    let currentTeam = 0;
    let currentIndex = 0;
    let currentListTeam = [];

    while (
      counter <= qtyFemalesPerTeam + 1 &&
      currentTeam !== values.qtyTeams
    ) {
      currentListTeam.push(randomFemales[currentIndex + counter - 1]);
      if (counter <= qtyFemalesPerTeam) {
        counter++;
      }
      if (counter === qtyFemalesPerTeam + 1) {
        if (getListByString(values.malePlayers).length === 0) {
          const newTeam = {
            name: `Time ${currentTeam + 1}`,
            players: currentListTeam,
          };
          result.push(newTeam);
        } else {
          result[currentTeam].players.push(...currentListTeam);
        }

        currentTeam++;
        counter = 1;
        currentIndex += qtyFemalesPerTeam;
        currentListTeam = [];
      }
    }

    if (remainingFemaleLength > 0) {
      for (let index = 0; index < remainingFemaleLength; index++) {
        result[values.qtyTeams - index - 1].players.push(
          randomFemales[currentIndex + index]
        );
      }
    }

    return result;
  };

  const mountTeams = () => {
    const maleTeamsResult: Team[] = mountMaleTeams([]);
    const finalResult = mountFemaleTeams(maleTeamsResult);
    setTeams(finalResult);
    setListCleaned(false);
  };

  const cleanList = () => {
    const treatedTeams: Team[] = teams.map((team) => ({
      ...team,
      players: treatList(team.players),
    }));
    setTeams(treatedTeams);
    setListCleaned(true);
  };

  const copyList = () => {
    const listForCopy = getListForCopy(teams, listCleaned);
    navigator.clipboard.writeText(listForCopy);
  };

  return (
    <Container maxWidth='md'>
      <WrapperContainer>
        <Typography variant='h4' marginBottom='48px' align='center'>
          Sorteador de times de vôlei
        </Typography>

        <FlexBoxCenter>
          <Box marginBottom='24px'>
            <FlexBox flexDirection={{ xs: "column", md: "row" }}>
              <TextAreaWrapper marginRight={{ xs: "0px", md: "12px" }}>
                <FlexBox>
                  <Groups />
                  <Typography
                    component='label'
                    htmlFor='male-players'
                    sx={{ marginLeft: "8px" }}
                  >
                    Lista de jogadores masculinos:
                  </Typography>
                </FlexBox>
                <TextArea
                  id='male-players'
                  placeholder='Digite ou cole aqui a lista de jogadores masculinos...'
                  cols={35}
                  value={values.malePlayers}
                  onChange={onChangeMales}
                />
              </TextAreaWrapper>

              <TextAreaWrapper
                marginLeft={{ xs: "0px", md: "12px" }}
                marginTop={{ xs: "24px", md: "0px" }}
              >
                <FlexBox>
                  <Groups />
                  <Typography
                    component='label'
                    htmlFor='female-players'
                    sx={{ marginLeft: "8px" }}
                  >
                    Lista de jogadoras femininas:
                  </Typography>
                </FlexBox>
                <TextArea
                  id='female-players'
                  placeholder='Digite ou cole aqui a lista de jogadoras femininas...'
                  cols={35}
                  value={values.femalePlayers}
                  onChange={onChangeFemales}
                />
              </TextAreaWrapper>
            </FlexBox>

            <FlexBoxCenter flexDirection='column' marginTop='32px'>
              <Box>
                <FlexBox alignItems='center'>
                  <Typography component='label' htmlFor='qtyPlayersByTeam'>
                    Quantidade de jogadores por time:
                  </Typography>
                  <PlayerQtyTextField
                    size='small'
                    id='qtyPlayersByTeam'
                    sx={{ marginLeft: "12px" }}
                    value={values.qtyPlayersByTeam}
                    onChange={onChangeQtyPlayersByTeam}
                  />
                </FlexBox>
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

              <FlexBoxCenter
                flexDirection={{ xs: "column", md: "row" }}
                marginTop='32px'
                width='100%'
              >
                <Box marginRight={{ xs: "0", md: "8px" }}>
                  <Button
                    variant='contained'
                    size='large'
                    onClick={mountTeams}
                    sx={{ width: 180 }}
                  >
                    Montar times
                  </Button>
                </Box>
                <Box
                  marginLeft={{ xs: "0", md: "8px" }}
                  marginTop={{ xs: "8px", md: "0" }}
                >
                  <Button
                    variant='outlined'
                    size='large'
                    onClick={resetForm}
                    sx={{ width: 180 }}
                  >
                    Resetar
                  </Button>
                </Box>
              </FlexBoxCenter>
            </FlexBoxCenter>
          </Box>
        </FlexBoxCenter>

        <FlexBoxCenter>
          <TeamList teams={closedTeams} setTeams={setTeams} />
          <TeamList
            teams={remainingPlayers}
            setTeams={setTeams}
            listTitle='Sobra'
          />
        </FlexBoxCenter>

        {closedTeams.length > 0 && (
          <FlexBoxCenter
            flexDirection={{ xs: "column", md: "row" }}
            marginTop='24px'
            width='100%'
          >
            <Box marginRight={{ xs: "0", md: "8px" }}>
              <Button
                variant='contained'
                color='warning'
                size='large'
                onClick={cleanList}
                sx={{ width: 180 }}
              >
                Formatar lista
              </Button>
            </Box>
            <Box
              marginLeft={{ xs: "0", md: "8px" }}
              marginTop={{ xs: "8px", md: "0" }}
            >
              <Button
                variant='contained'
                color='success'
                size='large'
                onClick={copyList}
                sx={{ width: 180 }}
              >
                Copiar
              </Button>
            </Box>
          </FlexBoxCenter>
        )}
      </WrapperContainer>
    </Container>
  );
};

export default Home;
