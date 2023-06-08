export class Client {
  constructor(
    public status: string,
    public id: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public ceiling: string,
    public emailAddress: string,
    private access_token: string,
    private _refresh_token: string,
    public tokenValid: boolean,
    public expirationIn: number
  ) {}

  get accessToken() {
    if (!this.tokenValid) {
      return null;
    }
    return this.access_token;
  }
}
