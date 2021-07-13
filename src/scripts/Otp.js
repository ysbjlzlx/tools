import { getRandomInt } from "../scripts/helper/util";

class Otp {
  type;
  issuer = null;
  account;
  secret;
  algorithm;
  digits;
  counter;
  period;

  constructor(type, issuer, account, secret) {
    this.type = type;
    this.issuer = encodeURIComponent(issuer);
    this.account = encodeURIComponent(account);
    this.secret = secret;
  }

  static generateSecret(length = 16) {
    // prettier-ignore
    const randomOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 2, 3, 4, 5, 6, 7];
    const secret = [];
    for (let i = 0; i < length; i++) {
      const random = getRandomInt(0, randomOptions.length);
      secret.push(randomOptions[random]);
    }
    return secret.join("");
  }
  toString() {
    let url = `otpauth://${this.type}/`;
    if (this.issuer != null && this.issuer !== "") {
      url += this.issuer;
    }
    if (this.account != null && this.account !== "") {
      url += `:${this.account}`;
    }

    const params = new URLSearchParams();
    params.append("secret", this.secret);
    params.append("issuer", this.issuer);
    params.append("algorithm", "SHA1");
    params.append("digits", 6);
    params.append("period", 30);
    return (url += `?${params.toString()}`);
  }
}

export default Otp;
