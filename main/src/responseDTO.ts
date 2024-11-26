export class ResponseDTO {
    pair: boolean;
    prime: boolean;
    factorial: number;
    sumN: number;
    factors: number[];
    fibonacci: number;

    constructor(pair: boolean, prime: boolean, factorial: number, sumN: number, factors: number[], fibonacci: number) {
        this.pair = pair;
        this.prime = prime;
        this.factorial = factorial;
        this.sumN = sumN;
        this.factors = factors;
        this.fibonacci = fibonacci;
    }
}