export type Form = {
    players: string;
    qtyTeams: number;
    qtyPlayersByTeam: number;
};
  
export const INITIAL_VALUES: Form = {
    players: "",
    qtyTeams: 0,
    qtyPlayersByTeam: 6,
};

export type Team = {
    name: string
    players: string[]
}