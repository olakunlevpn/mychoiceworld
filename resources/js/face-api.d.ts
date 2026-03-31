declare module 'face-api.js' {
    export const nets: {
        tinyFaceDetector: { loadFromUri(uri: string): Promise<void> };
        ageGenderNet: { loadFromUri(uri: string): Promise<void> };
    };
    export class TinyFaceDetectorOptions {
        constructor(options?: { inputSize?: number; scoreThreshold?: number });
    }
    export function detectSingleFace(input: any, options?: any): {
        withAgeAndGender(): Promise<any | undefined>;
    };
}
