# NGXS Notices

## Actions

```ts
export declare const actionStatus: {
    dispatched: (a: any) => boolean;
    successful: (a: any) => boolean;
    error: (a: any) => boolean;
    canceled: (a: any) => boolean;
    completed: (a: any) => boolean;
};
export declare const ActionLifecycle: {
    onDispatched: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onSuccess: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onError: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onCanceled: () => import("rxjs").MonoTypeOperatorFunction<any>;
    onCompleted: () => import("rxjs").MonoTypeOperatorFunction<any>;
};
```
