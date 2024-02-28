export type PunishmentToken = {
    PunishmentId: number;
    Admin: string;
    Time: number;
    Sentence: string;
    Category: string;
    Reason: string;
    Severity: number;
    Duration: number;
    Removed: boolean;
    RemoveAdmin: string;
    RemoveReason: string;
    Active: boolean;
};

export type PunishToken = {
    Name: string;
    Time: number;
    Punishments: PunishmentToken[];
};
