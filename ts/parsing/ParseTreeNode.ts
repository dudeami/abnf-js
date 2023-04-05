export default interface ParseTreeNode {
    start: number;
    end: number;
    children: {
        [name: string]: ParseTreeNode[];
    };
}
