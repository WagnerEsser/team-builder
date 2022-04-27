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
