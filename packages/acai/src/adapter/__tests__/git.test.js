'use strict';

jest.mock('nodegit');
const nodegit = require('nodegit');
const git = require('../git');

describe('adapter/git', () => {
    beforeEach(() => {
        nodegit.__setHistory('master', [
            'fix number one',
            'another commit',
            'another fix\nanother line'
        ]);
        nodegit.__setHistory('other-branch', ['fix number one']);
    });

    afterEach(() => {
        nodegit.__setHistory('master', []);
        nodegit.__setHistory('other-branch', []);
    });

    describe('getCommits()', () => {
        test('get all commits', async () => {
            expect(await git.getCommits({ path: 'repo' })).toHaveLength(3);
        });

        test('get all commits from specific branch', async () => {
            expect(
                await git.getCommits({ path: 'repo', branch: 'other-branch' })
            ).toHaveLength(1);
        });

        test('get certain amount of commits', async () => {
            expect(
                await git.getCommits({
                    path: 'repo',
                    branch: 'master',
                    depth: 2
                })
            ).toHaveLength(2);
        });
    });

    describe('filterCommits()', () => {
        test('receives a string to test commit message', async done => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            expect.assertions(commits.length);
            git.filterCommits(commits, commitMessage => {
                expect(typeof commitMessage).toBe('string');
                done();
            });
        });

        test('filters commit messages by a callback function', async () => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            const filtered = git.filterCommits(commits, commitMessage =>
                /fix/.test(commitMessage)
            );
            expect(filtered).toHaveLength(2);
        });
    });

    describe('getCommitFiles()', () => {
        test('returns array of changed files from commit', async () => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            const files = await git.getCommitFiles(commits[0]);
            expect(files).toEqual(expect.arrayContaining(['file.js']));
        });
    });

    describe('getCommitMessage()', () => {
        test('returns the whole message if no line breaks', async () => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            const message = git.getCommitMessage(commits[1]);
            expect(message).toBe('another commit');
        });

        test('returns at least the first paragraph if line breaks are contained', async () => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            const message = git.getCommitMessage(commits[0]);
            expect(message).toBe('another fix');
        });
    });

    describe('getDescriptor()', () => {
        test('returns a commit representation', async () => {
            const commits = await git.getCommits({
                path: 'repo',
                branch: 'master'
            });
            const description = await git.getDescriptor(commits[0]);
            expect(description).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                    time: expect.any(Number),
                    files: expect.any(Array)
                })
            );
        });
    });
});
