
export const func = Symbol()

export interface Watcher { [func]: () => void }

export class Binder<Target = any>{

    private targets: Map<Watcher, Target[]> = new Map()
    private watchers: Map<Target, Watcher[]> = new Map()

    private watcherStack: Watcher[] = []

    private clearTarget(watcher: Watcher) {
        this.targets.delete(watcher)
    }

    private clearWatcher(target: Target) {
        this.watchers.delete(target)
    }

    private update(watcher:Watcher){
        this.clearTarget(watcher)
        this.watcherStack.push(watcher)
        watcher[func]()
        this.watcherStack.pop()
    }

    emitUpdate(target: Target) {
        const watchers = this.watchers.get(target) ?? []
        this.clearWatcher(target)
        watchers.forEach(watcher => this.update(watcher))
    }

    bindTarget(target:Target){
        const watcher = this.watcherStack[this.watcherStack.length -1]
        if(!watcher) return
        this.watchers.set(target,(this.watchers.get(target) ?? []).filter(v=>v!==watcher).concat([watcher]))
        this.targets.set(watcher,(this.targets.get(watcher) ?? []).filter(v=>v!==target).concat([target]))
    }

}
