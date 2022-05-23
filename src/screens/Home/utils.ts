import { Team } from "./types";

export const shuffleList = (items: string[]) =>
    items
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const removeEmptyLinesAndNotPlayers = (list: string[]) =>
    list.filter((player) => !!player && !player.includes('💥'))

export const treatList = (list: string[]) => {
    const removedNotNames = list.map(
        player => player.includes('-') && player.split('-')[1] ? player.split('-')[1].trim() : player
    )
    return removedNotNames
}

export const getListByString = (value: string) => {
    const splittedList = value.split("\n");
    const treatedList = removeEmptyLinesAndNotPlayers(splittedList);
    return treatedList;
};

export const getQtyTeams = (qtyPlayers: number, qtyPlayersByTeam: number): number => {
    return parseInt((qtyPlayers / qtyPlayersByTeam).toString());
};

export const getListForCopy = (teams: Team[], format: boolean = false) => {
    const listString: string[] = teams.map(team => {
        let teamPlayers = team.players
        if (format) teamPlayers = teamPlayers.map(player => "🤾🏻 " + player)

        const players: string = teamPlayers.reduce((previousPlayer, currentPlayer) =>
        `${previousPlayer}
${currentPlayer}`)

        return `${team.name.toUpperCase()}
        
${players}`
    })

    const stringResult = listString.reduce((previousTeam, currentTeam) => {
        return `${previousTeam}

💥     💥     💥     💥
        
${currentTeam}`
    })

    return stringResult
}