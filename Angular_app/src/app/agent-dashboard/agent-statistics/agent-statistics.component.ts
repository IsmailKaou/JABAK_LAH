import { Component } from '@angular/core';
import { GetClientsService } from 'src/app/_components/get-clients.service';
import { Client } from '../Client.model';

@Component({
  selector: 'app-agent-statistics',
  templateUrl: './agent-statistics.component.html',
  styleUrls: ['./agent-statistics.component.css'],
})
export class AgentStatisticsComponent {
  constructor(private getClientsService: GetClientsService) {}
  clients: Client[];
  totalClients: number;
  ceiling200: number;
  ceiling5000: number;
  ceiling20000: number;

  ngOnInit(): void {
    this.getClientsService.fetchClient().subscribe((response: any) => {
      const parser = new DOMParser();
      const xmlResponse = parser.parseFromString(response, 'text/xml');
      const clientsXml = xmlResponse.getElementsByTagName('ns2:allClients');
      console.log(response);

      this.clients = Array.from(clientsXml).map(
        (clientXml) => {
          return {
            id: clientXml.getElementsByTagName('ns2:clientId')[0].textContent,
            firstName:
              clientXml.getElementsByTagName('ns2:firstName')[0].textContent,
            lastName:
              clientXml.getElementsByTagName('ns2:lastName')[0].textContent,
            phoneNumber:
              clientXml.getElementsByTagName('ns2:phoneNumber')[0].textContent,
            ceiling:
              clientXml.getElementsByTagName('ns2:ceiling')[0].textContent,
            emailAddress:
              clientXml.getElementsByTagName('ns2:emailAddress')[0].textContent,
          };
        },
        (error) => {
          console.log('error', error);
        }
      );
      this.totalClients = this.clients.length;
      this.ceiling200 = this.clients.filter(
        (client) => Number(client.ceiling) == 200
      ).length;
      this.ceiling5000 = this.clients.filter(
        (client) => Number(client.ceiling) == 5000
      ).length;
      this.ceiling20000 = this.clients.filter(
        (client) => Number(client.ceiling) == 20000
      ).length;
      console.log(this.totalClients);
      console.log(this.ceiling20000);
    });
  }
}
