import 'package:http/http.dart' as http;
import 'package:jabaklah_mobile/models/client.dart';
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/models/credit.dart';
import 'package:jabaklah_mobile/models/creditor.dart';
import 'package:jabaklah_mobile/models/formdata.dart';
import 'package:jabaklah_mobile/models/formfields.dart';
import 'package:jabaklah_mobile/models/unpaid.dart';
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
      List<Credit> creditList = [];
      FormD formD =  FormD(null, null, null);
      var elementChildren = element.childElements;
      if(elementChildren.length>5)
      {
        var child = element.findAllElements("creances");
        child.forEach((credit) { 
      List<Unpaid> unpaidList =[];

          if(credit.findAllElements("impayes").isNotEmpty)
          {
            
            credit.findAllElements("impayes").forEach((unpaid) { 
              unpaidList.add( Unpaid(unpaid.childElements.elementAt(0).innerText, unpaid.childElements.elementAt(1).innerText, unpaid.childElements.elementAt(2).innerText, unpaid.childElements.elementAt(3).innerText));
            });
          }  
          if(credit.getElement("form")!=null)
          {
      List<FormFields> formFields = [];
            
            if(credit.getElement("form")!.findAllElements("fields").isNotEmpty){
              credit.getElement("form")!.findAllElements("fields").forEach((fields) {
                formFields.add(FormFields(fields.childElements.elementAt(0).innerText, fields.childElements.elementAt(1).innerText, fields.childElements.elementAt(2).innerText));
              });
            }
            formD =  FormD(credit.getElement("form")!.childElements.elementAt(0).innerText, credit.getElement("form")!.childElements.elementAt(1).innerText, formFields);
          }
          
          creditList.add(Credit(credit.childElements.elementAt(0).innerText, credit.childElements.elementAt(1).innerText, credit.childElements.elementAt(2).innerText, credit.childElements.elementAt(3).innerText, formD,unpaidList: unpaidList));
        });
      }

      
      Creditor creditor = Creditor(
          element.descendantElements.elementAt(0).innerText,
          element.descendantElements.elementAt(1).innerText,
          element.descendantElements.elementAt(2).innerText,
          element.descendantElements.elementAt(3).innerText,
          element.descendantElements.elementAt(4).innerText,
          creditList: creditList
          );


      // creditList.forEach((element) {
      //   print(element.id);
      //   print(element.code);
      //   print(element.name);
      //   print(element.category);
      //   print(element.formData!.id);
      //   print(element.formData!.name);
      //   element.formData!.formFields!.forEach((element) { 
      //     print(
      //     element.id
      //     );
      //     print(element.name);
      //     print(element.type);

      //   });
        
     
      //  });
          
      creditorList.add(creditor);
    });
    creditorList.forEach((element) { 
      print(element.id);
      print(element.name);
      print(element.image);
      print(element.code);
      print(element.category);
      if(element.creditList!.isNotEmpty)
      {
        print("${element.name} : ${element.creditList!.elementAt(0).name}");
      }
      
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
