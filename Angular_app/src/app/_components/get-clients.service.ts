import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetClientsService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  fetchClient() {
    const request = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> \
                          <Body>\
                              <getClientsRequest xmlns="http://example.com/clientlist"/>\
                          </Body>\
                      </Envelope>`;

    const headers = {
      SOAPAction:
        'https://jabaklah-production.up.railway.app/clientlist/getClients',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    return this.http.post(
      'https://jabaklah-production.up.railway.app/ws',
      request,
      {
        headers: headers,
        responseType: 'text',
      }
    );
  }
}
