import * as vscode from 'vscode';

export interface HNData {
    /** @param id - ID of the HN Story Item */
    id: string;
    /** @param title - Title of the HN Story Item */
    title?: string;
    /** @param descendants - Amount of comments of the HN Story Item */
    descendants?: number;
    /** @param url - External URL of the HN Story Item */
    url?: vscode.Uri;
    /** @param isComment - Is item a comment or no? */
    isComment?: boolean;
}