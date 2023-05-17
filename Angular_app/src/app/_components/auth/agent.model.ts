export class Agent {
    constructor(
      public status: string,
      public id: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      private access_token: string,
      private _refresh_token: string,
      public _isTokenValid: boolean,
      public expirationIn: number
    ) {}
  
    get accessToken() {
      if (!this._isTokenValid) {
        return null;
      }
      return this.access_token;
    }
  }