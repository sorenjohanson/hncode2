import * as assert from 'assert';
import { before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { HNData } from '../../interface';
import { getStory, getTop, getAsk } from '../../api';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Get single story', async () => {
		let result: HNData = await getStory("1");
		assert.equal("1", result.id);
		assert.equal("15", result.descendants);
		assert.equal("Y Combinator", result.title);
	});

	test('Get top stories', async () => {
		let result: number[] = await getTop();
		assert.notEqual(undefined, result);
		assert.notEqual(0, result.length);
	});

	test('Get ask stories', async () => {
		let result: number[] = await getAsk();
		assert.notEqual(undefined, result);
		assert.notEqual(0, result.length);
	});

	test('Get ask stories', async () => {
		let result: number[] = await getAsk();
		assert.notEqual(undefined, result);
		assert.notEqual(0, result.length);
	});
});
