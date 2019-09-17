import * as vscode from 'vscode';

export interface HNData {
    id: string;
    title?: string;
    descendants?: number;
    url?: vscode.Uri;
    isComment?: boolean;
}