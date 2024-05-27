import { WLEDEffectByName } from "../wled-adapter/wled.types";
import WLEDAdapter from "../wled-adapter/WLEDAdapter";

export interface EffectStep {
    colors: number[];
    brightness?: number;
    duration: number;
    transition?: number;
    effect?: WLEDEffectByName;
}

export interface Effect {
    name: string;
    steps: EffectStep[];
    loop: boolean;
}

export class EffectEngine {
    private currentEffect: Effect | null = null;
    private stepIndex = 0;
    private isRunning = false;
    private segment = 0;
    private timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    constructor(private adapter: WLEDAdapter) {}

    async playEffect(effect: Effect, segment: number) {
        await this.adapter.resetLEDStrip();
        await this.adapter.setEffectByName({ name: 'Solid' });
        this.currentEffect = effect;
        this.stepIndex = 0;
        this.segment = segment;
        this.isRunning = true;
        this.runSteps();
    }

    private async runSteps() {
        if (!this.currentEffect || !this.isRunning) return;

        const step = this.currentEffect?.steps[this.stepIndex];
        if (!step) return;
        await this.adapter.setColor([step.colors[0], step.colors[1], step.colors[2]], step.brightness, this.segment, step.transition);
        if (step.effect) {
            await this.adapter.setEffectByName(step.effect);
        }

        this.clearCurrentTimeout();
        this.timeoutHandle = setTimeout(() => {
            if (!this.currentEffect) return;
            this.stepIndex++;
            if (this.stepIndex < this.currentEffect.steps.length) {
                this.runSteps();
            } else if (this.currentEffect.loop) {
                this.stepIndex = 0;
                this.runSteps();
            } else {
                this.isRunning = false;
            }
        }, step.duration);
    }


    private clearCurrentTimeout() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
    }

    stopEffect() {
        this.isRunning = false;
        this.clearCurrentTimeout();
    }

    getCurrentEffect() {
        return this.currentEffect;
    }
}
