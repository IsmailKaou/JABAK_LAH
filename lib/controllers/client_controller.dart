import 'package:http/http.dart' as http;
import 'package:jabaklah_mobile/models/client.dart';
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/models/creditor.dart';
import 'package:xml/xml.dart' as xml;

class ClientController {
  static const myUrl = Config.url;
  Future<List<Client>> getClientList() async {
    const String soapBody = '''<?xml version="1.0" encoding="utf-8"?>
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> 
      <Body>
          <getClientsRequest xmlns="http://example.com/clientlist"/>
      </Body>
  </Envelope>
    ''';
    List<Client> clientList = [];
    final headers = {
      'SOAPAction': '$myUrl/clientlist/getClients',
      'Content-Type': 'text/xml; charset=utf-8',
    };

    final response = await http.post(
      Uri.parse('$myUrl/ws/clientlist'),
      headers: headers,
      body: soapBody,
    );

    final xmlDoc = xml.XmlDocument.parse(response.body);
    xmlDoc.findAllElements("ns2:allClients").forEach((element) {
      print(element);
      print("/////////////////////////////////////");
/*       print(xmlDoc.findAllElements('ns2:allClients'));
 */
      Client client = Client(
          element.descendantElements.elementAt(0).innerText,
          element.descendantElements.elementAt(1).innerText,
          element.descendantElements.elementAt(2).innerText,
          element.descendantElements.elementAt(3).innerText,
          element.descendantElements.elementAt(4).innerText,
          element.descendantElements.elementAt(5).innerText);
      clientList.add(client);
    });
    print(xmlDoc);

    return clientList;
  }

  Future<List<Creditor>> getCreditors() async {
    const String soapBody = '''<?xml version="1.0" encoding="UTF-8"?>
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"> 
    <Body> 
        <getCreanciersRequest xmlns="http://example.com/creanciers" /> 

    </Body>
    </Envelope>
    ''';
    final headers = {
      'SOAPAction': '$myUrl/ListeCreanciers',
      'Content-Type': 'text/xml; charset=utf-8',
    };

    final response = await http.post(
      Uri.parse('$myUrl/ws'),
      headers: headers,
      body: soapBody,
    );
    List<Creditor> creditorList = [];

    final xmlDoc = xml.XmlDocument.parse(response.body);
    xmlDoc.findAllElements("creanciers").forEach((element) {
      Creditor creditor = Creditor(
          element.descendantElements.elementAt(0).innerText,
          element.descendantElements.elementAt(1).innerText,
          element.descendantElements.elementAt(2).innerText,
          element.descendantElements.elementAt(3).innerText,
          element.descendantElements.elementAt(4).innerText);
      creditorList.add(creditor);
    });

    return creditorList;
  }

  Future<void> delete(String? id) async {
    final request =
        '''<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                      <deleteClientRequest xmlns="http://example.com/clientservice">
                            <id>$id</id>
                      </deleteClientRequest>
                    </Body>
                  </Envelope>''';

    final headers = {
      'SOAPAction': '$myUrl/deleteClient',
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    http
        .post(Uri.parse('$myUrl/ws'), body: request, headers: headers)
        .then((response) {
      final xmlResponse = xml.XmlDocument.parse(response.body);
      final isDeleted =
          xmlResponse.findAllElements('ns2:isDeleted').first.text == 'true';
    });
  }
}
