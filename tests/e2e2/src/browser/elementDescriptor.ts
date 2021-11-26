export class ElementDescriptor {
    readonly location: string;
    readonly locationType: string;
    readonly matchIndex: number;

    constructor(value: string, type: string, matchIndex: number) {
        this.location = value;
        this.locationType = type
        this.matchIndex = matchIndex;
    }
}

export function elementLocatedByCss(selector: string, matchIndex: number = 0) {
    return new ElementDescriptor(selector, 'css', matchIndex)
}
