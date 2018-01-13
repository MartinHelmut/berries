// Type definitions for acai
// Project: @berries
// Definitions by: Martin Helmut Fieber <https://martin-fieber.de>

export = scanner;

declare function scanner(repoPath: string, options?: scanner.ScannerOptions): scanner.ScannerResult;

declare namespace scanner {
	export interface ScannerOptions {
		branchName?: string;
		depth?: number;
		fileGlob?: string;
		dispatch?: dispatchCallback;
		pattern?: RegExp;
	}

	export interface ScannerResult {}

	export type dispatchCallback = <P, M>(action: Action<P, M>) => void;

	export interface Action<P = {}, M = {}> {
		type: ActionType;
		payload: P;
		meta?: M;
	}

	export enum ActionType {
		LOG = 'LOG',
		START = 'START',
		COMMIT = 'COMMIT',
		COMMITS = 'COMMITS',
		FIXES = 'FIXES',
		HOTSPOTS = 'HOTSPOTS',
		END = 'END'
	}
}
