export interface ParseTreeNode {
    start: number;
    end: number;
    children: {
        [name: string]: ParseTreeNode[];
    };
}
