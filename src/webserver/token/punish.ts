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

export type PunishClientToken = {
    Name: string;
    Time: number;
    Punishments: PunishmentToken[];
};

export type PunishToken = {
    Target: string;
    Category: string;
    Sentence: string;
    Reason: string;
    Duration: number;
    Admin: string;
    Severity: number;
};

export type RemovePunishToken = {
    PunishmentId: number;
    Target: string;
    Reason: string;
    Admin: string;
};
