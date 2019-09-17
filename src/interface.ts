import * as vscode from 'vscode';

export interface HNData {
    /** @description ID of the HN Story Item */
    id: string;
    /** @description Title of the HN Story Item */
    title?: string;
    /** @description Amount of comments of the HN Story Item */
    descendants?: number;
    /** @description External URL of the HN Story Item */
    url?: vscode.Uri;
    /** @description Is item a comment or no? */
    isComment?: boolean;
}