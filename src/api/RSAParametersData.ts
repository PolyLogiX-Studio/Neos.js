export class RSAParametersData {
	Exponent: unknown[];
	Modulus: unknown[];
	P: unknown[];
	Q: unknown[];
	DP: unknown[];
	DQ: unknown[];
	InverseQ: unknown[];
	D: unknown[];
	constructor(rsa: RSAParameters) {
		this.Exponent = rsa.Exponent;
		this.Modulus = rsa.Modulus;
		this.P = rsa.P;
		this.Q = rsa.Q;
		this.DP = rsa.DP;
		this.DQ = rsa.DQ;
		this.InverseQ = rsa.InverseQ;
		this.D = rsa.D;
	}
}
export interface RSAParameters {
	Exponent: unknown[];
	Modulus: unknown[];
	P: unknown[];
	Q: unknown[];
	DP: unknown[];
	DQ: unknown[];
	InverseQ: unknown[];
	D: unknown[];
}
