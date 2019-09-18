import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';

import { HNData } from './interface';

/**
 * Base URL of Hacker News API.
 */
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

/**
 * Workspace configuration defined in package.json
 */
const config = vscode.workspace.getConfiguration("hncode2");

/**
 * [Typed REST Client](https://github.com/microsoft/typed-rest-client) for use in all API calls.
 */
const restClient: rm.RestClient = new rm.RestClient('hncode', BASE_URL, undefined, { socketTimeout: config.requestTimeout });

/**
 * Get a single story using item IDs from HN API.
 * @param id - Story ID, eg 192327.
 */
export function getStory(id?: string): Thenable<HNData> {
    return new Promise<HNData>((c, e) => {
        restClient.get<HNData>('item/' + id + '.json?print=pretty').then(response => {
            if (response.result) {
                c(response.result);
            } else {
                e(response.statusCode);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

/**
 * Get the 500 top stories from HN API.
 */
export function getTop(): Thenable<Array<number>> {
    return new Promise<Array<number>>((c, e) => {
        restClient.get<Array<number>>('topstories.json?print=pretty').then(response => {
            if (response.result) {
                c(response.result);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

/**
 * Get the top 200 Ask HN stories from HN API.
 */
export function getAsk(): Thenable<Array<number>> {
    return new Promise<Array<number>>((c, e) => {
        restClient.get<Array<number>>('askstories.json?print=pretty').then(response => {
            if (response.result) {
                c(response.result);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

/**
 * Get the top 500 new stories from HN API.
 */
export function getNew(): Thenable<Array<number>> {
    return new Promise<Array<number>>((c, e) => {
        restClient.get<Array<number>>('newstories.json?print=pretty').then(response => {
            if (response.result) {
                c(response.result);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

/**
 * Get the top 200 Show HN stories from HN API.
 */
export function getShow(): Thenable<Array<number>> {
    return new Promise<Array<number>>((c, e) => {
        restClient.get<Array<number>>('showstories.json?print=pretty').then(response => {
            if (response.result) {
                c(response.result);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

/**
 * Iterate over all given story IDs and grab the individual stories from HN API.
 * @param stories Story IDs previously gathered by [[getTop]], [[getAsk]], [[getNew]] or [[getShow]]
 */
export function getStories(stories: Array<number>): Promise<HNData[]> {
    return new Promise<HNData[]>(async (c, e) => {
        let promises: Array<Promise<HNData>> = [];
        let hnStories: HNData[] = [];

        for (let i in stories) {
            let fetch: Promise<HNData> = new Promise<HNData>(async (resolve, reject) => {
                restClient.get<HNData>('item/' + stories[i] + '.json?print=pretty').then(response => {
                    if (response.result) {
                        resolve(response.result);
                    }
                }).catch(error => {
                    reject(error.message);
                });
            });
            promises.push(fetch);
            if (promises.length >= vscode.workspace.getConfiguration("hncode2").limitation) {
                break;
            }
        }

        Promise.all(promises).then(responses => {
            responses.forEach(response => {
                if (response) {
                    hnStories.push(response);
                }
            });
            c(hnStories);
        }).catch(error => {
            e(error.message);
        });
    });
}