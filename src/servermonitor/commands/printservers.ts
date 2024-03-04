import Command from '../../command/command';

export default class PrintServersCommand extends Command {
    constructor() {
        super('printservers');
    }

    public execute(): boolean {
        return true;
    }
}
