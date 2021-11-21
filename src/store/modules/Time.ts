class Time {
  private _seconds: number;
  private _isActive: boolean;
  private timer;

  constructor() {
    this._seconds  = 0;
    this._isActive = false;
    this.timer = setTimeout(() => {
      console.log("Timer is ready!");
    }, 10);
  }

  /** Starts/Resumes the timer. */
  public resume(): void {
    if (!this._isActive) {
      this._isActive = true;
      this.timer = setInterval(() => {
        this._seconds++;
        // console.log(this._seconds);
      }, 1000);
    }
    else console.log('Timer is already running!');
  }

  /** Stops the timer. */
  public pause(): void {
    if (this._isActive) { clearInterval(this.timer); this._isActive = false; }
    else console.log('Timer isn\'t running!');
  }

  /** Stops the timer and resets the counted time. */
  public stop(): void {
    if (this._isActive) { clearInterval(this.timer); this._isActive = false; }
    this._seconds = 0;
  }

  /** Returns the counted seconds. */
  public seconds(): number {
    return this._seconds;
  }

  /** Returns the counted full minutes. */
  public minutes(): number {
    return Math.floor(this._seconds / 60);
  }

  /** Returns the counted time in the format of 'mm:ss', whereas m stands for minutes and s for seconds. */
  public toString(): string {
    return `${this.minutes() > 9 ? this.minutes() : `0${this.minutes()}`}:${this._seconds%60 > 9 ? this._seconds%60 : `0${this._seconds%60}`}`;
  }
  
}

export default Time;