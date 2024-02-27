import { DonorToken } from "./donor";
import { PunishmentToken } from "./punish";

export type AccountToken = {
    AccountId: number;
    Name: string;
    Rank: string;
    DonorToken: DonorToken;
    Time: number;
    Punishments: PunishmentToken[];
};