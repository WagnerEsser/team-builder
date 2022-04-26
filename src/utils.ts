export const shuffleList = (items: string[]) =>
    items
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const getListByString = (value: string) => {
    const splittedList = value.split("\n");
    const treatedList = splittedList.filter((player) => !!player);
    return treatedList;
};

export const getQtyTeams = (qtyPlayers: number, qtyPlayersByTeam: number): number => {
    return parseInt((qtyPlayers / qtyPlayersByTeam).toString());
};
