import { AccountPunishments } from '../database/models/accountpunishments';
import { Accounts } from '../database/models/accounts';
import { PunishClientToken, PunishmentToken, PunishToken, RemovePunishToken } from '../webserver/token/punish';
import AccountRepository from './account_repository';

export enum PunishmentResponse {
    Punished = 'Punished',
    PunishmentRemoved = 'PunishmentRemoved',
    AccountDoesNotExist = 'AccountDoesNotExist',
    InsufficientPrivileges = 'InsufficientPrivileges',
    NotPunished = 'NotPunished'
}

export default class PunishmentRepository {
    public static async getPunishClient(account: Accounts): Promise<PunishClientToken> {
        const punishToken: PunishClientToken = {
            Name: account.name,
            Time: Date.now(),
            Punishments: []
        };

        const punishments = await AccountPunishments.findAll({
            where: {
                accountId: account.id
            }
        });

        if (punishments.length > 0) {
            punishToken.Punishments = punishments.map((punishment) => {
                let isActive = punishment.duration < 0 /* is perm */ || Date.now() < punishment.time!.getTime() + punishment.duration * 60 * 60 * 3600; /* is expired */
                if (punishment.removed) isActive = false;
                return {
                    PunishmentId: punishment.id,
                    Admin: punishment.admin,
                    Time: punishment.time!.getTime() - Date.now(),
                    Sentence: punishment.sentence,
                    Category: punishment.category,
                    Reason: punishment.reason,
                    Severity: punishment.severity,
                    Duration: punishment.duration,
                    Active: isActive,
                    Removed: Boolean(punishment.removed), // silly??
                    RemoveAdmin: punishment.removedAdmin,
                    RemoveReason: punishment.removedReason
                } as PunishmentToken;
            });
        }
        return punishToken;
    }

    public static async Punish(token: PunishToken): Promise<PunishmentResponse> {
        const account = await AccountRepository.getAccountByName(token.Target);
        if (!account) return PunishmentResponse.AccountDoesNotExist;
        //TODO: InsufficientPrivileges handling :3
        await AccountPunishments.create({
            accountId: account.id!,
            admin: token.Admin,
            category: token.Category,
            sentence: token.Sentence,
            time: new Date(),
            reason: token.Reason,
            duration: token.Duration,
            severity: token.Severity,
            removed: 0
        });
        return PunishmentResponse.Punished;
    }
    public static async RemovePunishment(token: RemovePunishToken): Promise<PunishmentResponse> {
        const account = await AccountRepository.getAccountByName(token.Target);
        if (!account) return PunishmentResponse.AccountDoesNotExist;
        await AccountPunishments.update(
            {
                removed: 1,
                removedAdmin: token.Admin,
                removedReason: token.Reason
            },
            {
                where: {
                    id: token.PunishmentId
                }
            }
        );
        return PunishmentResponse.PunishmentRemoved;
    }
}
