import { getRandomInt } from "../scripts/helper/util";
import { TOTP, Secret } from "otpauth";
import { size } from "lodash";

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

  static generateSecret() {
    const secret = new Secret();
    console.log(secret.base32);
    return secret.base32;
  }
  toString() {
    if (this.secret != null) {
      const totp = new TOTP({
        issuer: this.issuer,
        label: this.account,
        secret: this.secret,
        algorithm: this.algorithm,
        digits: this.digits,
        period: this.period,
      });
      console.log(totp.generate());
      console.log(totp.toString());
    }
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
