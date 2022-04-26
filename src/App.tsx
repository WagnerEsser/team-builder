import { ChangeEvent, useMemo, useState } from "react";
import { Form, INITIAL_VALUES } from "./types";
import { getListByString, getQtyTeams, shuffleList } from "./utils";

const App = () => {
  const [values, setValues] = useState<Form>(INITIAL_VALUES);
  const [teams, setTeams] = useState<string[][]>([]);
  const playerList = useMemo(
    () => getListByString(values.players),
    [values.players]
  );
  const remainingPlayerLength =
    values.qtyTeams >= 1 && playerList.length % values.qtyPlayersByTeam;
  const closedTeams = teams.slice(0, values.qtyTeams);
  const remainingPlayers = [...teams].slice(values.qtyTeams);

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
    const qtyTeams = getQtyTeams(playerList.length, qtyPlayersByTeam);
    setValues((values) => ({ ...values, qtyPlayersByTeam, qtyTeams }));
  };

  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setTeams([]);
  };

  const mountTeams = () => {
    const qtyPlayers = playerList.length;
    const result: string[][] = [];
    const randomList = shuffleList(playerList);

    for (let index = 0; index < qtyPlayers; index += values.qtyPlayersByTeam) {
      const time = randomList.splice(0, values.qtyPlayersByTeam);
      result.push(time);
    }
    setTeams(result);
  };

  return (
    <div>
      <h1>Sorteador de times de vôlei</h1>
      <div>
        <label htmlFor='players'>Lista de jogadores:</label>
        <br />
        <textarea
          id='players'
          rows={18}
          cols={50}
          value={values.players}
          onChange={onChangePlayers}
        />
      </div>
      <div>
        <label htmlFor='qtyPlayersByTeam'>
          Quantidade de jogadores por time:
        </label>
        <br />
        <input
          type='number'
          id='qtyPlayersByTeam'
          value={values.qtyPlayersByTeam}
          onChange={onChangeQtyPlayersByTeam}
        />
      </div>
      <br />
      <div>
        <b>{playerList.length} jogadores</b>
        <br />
        <br />
        <b>
          {values.qtyTeams}{" "}
          {values.qtyTeams === 1 ? "time fechado" : "times fechados"}
        </b>
        <br />
        {!!remainingPlayerLength && (
          <b>1 time com {remainingPlayerLength} jogadores</b>
        )}
      </div>
      <br />
      <div>
        <button type='button' onClick={mountTeams}>
          Sortear
        </button>
        <button type='button' onClick={resetForm}>
          Resetar
        </button>
      </div>
      {closedTeams.map((team, index) => (
        <div>
          <h5>Time {index + 1}:</h5>
          <ul>
            {team.map((player) => (
              <li>{player}</li>
            ))}
          </ul>
        </div>
      ))}
      {remainingPlayers.map((team) => (
        <div>
          <h5>Sobra:</h5>
          <ul>
            {team.map((player) => (
              <li>{player}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
