export default abstract class Command {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract execute(args: string[]): boolean;
}
