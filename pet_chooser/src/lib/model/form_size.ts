export default class FormSize {
    public width: number;
    public height: number;

    private constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    static get REGULAR() {
        return new FormSize(600, 410);
    };

    static get LARGE() {
        return new FormSize(800, 600);
    };
}
