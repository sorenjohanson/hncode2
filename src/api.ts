import * as rm from 'typed-rest-client/RestClient';

import { HNData } from './interface';
import { resolve } from 'dns';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const restClient: rm.RestClient = new rm.RestClient('hncode', BASE_URL);

export function getStory(id?: string): Thenable<HNData> {
    return new Promise<HNData>((c, e) => {
        restClient.get<HNData>('item/' + id + '.json').then(response => {
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
        restClient.get<Array<number>>('topstories.json').then(response => {
            if (response.result) {
                c(response.result);
            }
        }).catch(error => {
            e(error.message);
        });
    });
}

export function getKids(kids?: number[]): Thenable<HNData[]> {
    return new Promise<HNData[]>((c, e) => {
        let promises: HNData[] = [];
        for (let i in kids) {
            let fetch: Promise<HNData> = new Promise(async (resolve, reject) => {
                let story: HNData = await getStory(kids[i]);
                if (story) {
                    resolve(story);
                } else {
                    reject();
                }
            });
            promises.push(fetch);
        }
    });
}