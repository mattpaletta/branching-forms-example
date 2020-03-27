import React from "react";

class error {
    private base: BaseStep;
    constructor(base: BaseStep) {
        this.base = base;
    }

    count(b: boolean) : number {
        return b ? 1 : 0;
    }

    count_list(b: boolean[]) : number {
        return b.map(this.count).reduce((a,b) => a + b, 0)
    }

    isNotSet(key: any) {
        return this.base.getStepState(key) === undefined;
    }
}

class BaseStep {
    private readonly update_callback: CallableFunction | undefined;
    private readonly resize_callback: CallableFunction | undefined;
    private readonly prevStep: BaseStep | undefined;
    protected state: Map<string, any>;
    protected errors: error;

    constructor(prevStep: BaseStep | undefined , update_callback: CallableFunction | undefined = undefined, resize_callback: CallableFunction | undefined = undefined) {
        this.update_callback = update_callback === undefined && prevStep !== undefined ? prevStep.update_callback : update_callback;
        this.resize_callback = resize_callback === undefined && prevStep !== undefined ? prevStep.resize_callback : resize_callback;
        this.prevStep = prevStep;
        this.state = new Map();
        this.errors = new error(this);
    }

    forceUpdate() {
        if (this.update_callback !== undefined) {
            this.update_callback();
        }
    }

    setStepState(key: string, value: any) {
        this.state.set(key, value);
    }

    getStepStateOr(key: string, or: any) : any {
        const value = this.getStepState(key);
        return value === undefined ? or : value;
    }

    getStepState(key: string): undefined | any {
        if (this.state.has(key)) {
            return this.state.get(key);
        } else if (this.prevStep !== undefined) {
            return this.prevStep.getStepState(key);
        } else {
            return undefined;
        }
    }

    canAdvance() {
        return this.recalculateErrors() === 0;
    }

    recalculateErrors() {
        return 0;
    }

    shouldShowNextButton() {
        return true;
    }

    shouldShowBackButton() {
        return this.prevStep !== undefined;
    }

    getScreen() {
        return <div />;
    }

    getNextScreen() : BaseStep | undefined {
        return undefined;
    }

    onScreenEnter() {}
    onScreenExit() {}

    getPreviousScreen() {
        this.onScreenExit();
        return this.prevStep;
    }
}

export default BaseStep;
