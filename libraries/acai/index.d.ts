// Type definitions for acai
// Project: @berries
// Definitions by: Martin Helmut Fieber <https://martin-fieber.de>

export = scanner;

declare function scanner(
  repoPath: string,
  options?: scanner.ScannerOptions
): scanner.ScannerResult;

declare namespace scanner {
  export interface ScannerOptions {
    branch?: string;
    depth?: number;
    files?: string[];
    dispatch?: dispatchCallback;
    pattern?: RegExp;
  }

  export interface Commit {
    message: string;
    time: number;
    files: string[];
  }

  export interface HotSpot {
    file: string;
    score: number;
  }

  export interface ScannerResult {
    fixes: Commit[];
    hotSpots: HotSpot[];
    time: number;
  }

  export type dispatchCallback = <P, M>(action: Action<P, M>) => void;

  export interface Action<P = {}, M = {}> {
    type: ActionType;
    payload: P;
    meta?: M;
  }

  export enum ActionType {
    LOG = "LOG",
    START = "START",
    COMMIT = "COMMIT",
    COMMITS = "COMMITS",
    FIXES = "FIXES",
    HOTSPOTS = "HOTSPOTS",
    END = "END"
  }
}
