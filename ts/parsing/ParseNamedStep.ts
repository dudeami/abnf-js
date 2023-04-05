export default class ParseNamedStep {
    public readonly prev: ParseNamedStep | undefined;
    public readonly name: string;
    public readonly isStart: boolean;
    public readonly position: number;

    constructor(prev: ParseNamedStep | undefined, name: string, isStart: boolean, position: number) {
        this.prev = prev;
        this.name = name;
        this.isStart = isStart;
        this.position = position;
    }
}
