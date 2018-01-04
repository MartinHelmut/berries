## Dispatch

### Listen for actions

By defining a function as `dispatch` option for the scanner you can "listen" to specific actions that occur while scanning. The defined callback gets an action item that looks a lot like [actions from the redux][rxurl] universe, e.g.:

```javascript
{
    type: 'START',
    payload: 1500000000000
}
```

The following action types are defined:

| Action type | Description              |
| ----------- | ------------------------ |
| `START`     | Scanner starts           |
| `COMMIT`    | Commit is created        |
| `COMMITS`   | All commits are created  |
| `FIXES`     | Fixes are created        |
| `HOTSPOTS`  | Hot spots are calculated |
| `END`       | Scanner finished         |

### Actions

Often the following actions contain one or more commits. The following snipped describes the shape of a commit with the name `Commit`:

```typescript
interface Commit {
    message: string;
    time: number; // Unix timestamp for commit time
    files: string[]; // Array of relative file paths for changed files
}
```

#### START

This action is dispatch when the scanner starts.

_Shape:_

```typescript
interface StartAction {
    type: 'START';
    payload: number; // Unix timestamp of start time
}
```

#### COMMIT

Whenever a commit is extracted/created this action is dispatched.

_Shape:_

```typescript
interface CommitAction {
    type: 'COMMIT';
    payload: Commit;
    meta: {
        time: number; // Unix timestamp for create time
    };
}
```

#### COMMITS

This action is dispatched when ALL commits are created.

_Shape:_

```typescript
interface CommitsAction {
    type: 'COMMITS';
    payload: Commit[];
    meta: {
        time: number; // Unix timestamp for all commits created time
    };
}
```

#### FIXES

Action for all commits with applied filters so called fixes.

_Shape:_

```typescript
interface FixesAction {
    type: 'FIXES';
    payload: Commit[];
    meta: {
        time: number; // Unix timestamp for filtered commits aka. fixes
    };
}
```

#### HOTSPOTS

When all hot spots are created the following action is dispatched:

_Shape:_

```typescript
interface HotSpot {
    file: string; // Relative file path
    score: number;
}

interface HotSpotsAction {
    type: 'HOTSPOTS';
    payload: HotSpot[];
    meta: {
        time: number; // Unix timestamp when all all hot spots are created
    };
}
```

#### END

This action is dispatch when the scanner finished.

_Shape:_

```typescript
interface EndAction {
    type: 'END';
    payload: number; // Unix timestamp of end time
}
```

### Configure the scanner dispatch

```javascript
(async () => {
    const scanner = require('@berries/acai');
    await scanner('path/to/git/repository', {
        dispatch(action) {
            // Do something with this action ...
        }
    });
})();
```

[rxurl]: https://redux.js.org/docs/basics/Actions.html
