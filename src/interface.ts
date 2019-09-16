import * as vscode from 'vscode';

export interface HNData {
    by: string;
    id: string;
    kids: number[];
    title: string;
    url?: vscode.Uri;
}