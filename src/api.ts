import * as rm from 'typed-rest-client/RestClient';

import { HNData } from './interface';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
let restClient: rm.RestClient = new rm.RestClient('hncode', BASE_URL);

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