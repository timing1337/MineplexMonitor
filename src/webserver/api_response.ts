export abstract class ApiResponse {
    public statusCode!: number;
    public success!: boolean;
    public error?: string;
}

export class AntiSpamApiResponse extends ApiResponse {
    public isShadowMuted!: boolean;
}
