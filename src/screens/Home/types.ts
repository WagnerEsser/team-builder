export type Form = {
    malePlayers: string;
    femalePlayers: string;
    qtyTeams: number;
    qtyPlayersByTeam: number;
};
  
export const INITIAL_VALUES: Form = {
    malePlayers: "",
    femalePlayers: "",
    qtyTeams: 0,
    qtyPlayersByTeam: 6,
};

export type Team = {
    name: string
    players: string[]
}