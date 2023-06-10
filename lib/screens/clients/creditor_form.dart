import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/components/textField.dart';
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/models/formfields.dart';
import 'package:jabaklah_mobile/models/formdata.dart';
import 'package:jabaklah_mobile/models/unpaid.dart';
import 'package:jabaklah_mobile/screens/agents/agent_home.dart';
import 'package:xml/xml.dart' as xml;

import 'package:http/http.dart' as http;

class CreditForm extends StatefulWidget {
  final jsonUser;
  final  formData;
  final creanceId;
  const CreditForm({super.key, this.jsonUser,this.formData,this.creanceId});

  @override
  State<CreditForm> createState() =>_CreditFormState();
}

class _CreditFormState extends State<CreditForm> {
  static const String myUrl = Config.url;
  final _formKey = GlobalKey<FormState>();
final controller = TextEditingController();
  // final firstNameController = TextEditingController();
  // final lastNameController = TextEditingController();
  // final phoneController = TextEditingController();
  // final emailController = TextEditingController();
  // final _ceilingOptions = [
  //   'Hssab 1 - 200 DH',
  //   'Hssab 2 - 5000 DH',
  //   'Hssab 3 - 20 000 DH'
  // ];

  // final _ceilingOptionsMap = {
  //   'Hssab 1 - 200 DH': 200,
  //   'Hssab 2 - 5000 DH': 5000,
  //   'Hssab 3 - 20 000 DH': 20000
  // };
  // String? _selectedCeiling;

  String createSoapRequest(phone) {
    return '''<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://example.com/getImpayes">
  <soapenv:Header/>
  <soapenv:Body>
    <ser:getImpayesRequest>
      <clientPhone>0659522438</clientPhone>
      <creanceId>1</creanceId>
    </ser:getImpayesRequest>
  </soapenv:Body>
</soapenv:Envelope>
    ''';
  }

  late bool isCreated = false;

  late String errorMessage;
  String message = '';

  Future<void> sendSoapRequest(phone) async {
    final soapRequest = createSoapRequest(phone);
    print(soapRequest);

    final headers = {
      'SOAPAction': '$myUrl/GetImpayes',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    final response = await http.post(
      Uri.parse('$myUrl/ws'),
      headers: headers,
      body: soapRequest,
    );
    print(response.statusCode);
  
    final xmlDoc = xml.XmlDocument.parse(response.body);
    List<Unpaid> unpaidList =[];
    xmlDoc.findAllElements("getImpayesResponse").forEach((element) {
      element.childElements.forEach((element) {
        
        element.children.forEach((p0) { 
          print(p0);
          Unpaid unpaid = new Unpaid(p0.innerText, p0.innerText, p0.innerText, p0.innerText);
          unpaidList.add(unpaid);
        });
       });
    }





    );


    // isCreated = xmlDoc
    //         .findAllElements('ns2:isCreated')
    //         .single
    //         .innerText
    //         .toLowerCase() ==
    //     'true';

    // if (isCreated) {
    //   print('Agent created successfully');
    //   setState(() {
    //     message = "Agent created successfully";
    //   });
    //   Navigator.pushReplacement(
    //       context,
    //       MaterialPageRoute(
    //           builder: (context) => AgentCrud(
    //                 jsonUser: widget.jsonUser,
    //               )));
    // } else {
    //   errorMessage =
    //       xmlDoc.findAllElements('ns2:errorMessage').single.innerText;
    //   print('Error creating Agent: $errorMessage');
    //   setState(() {
    //     message = errorMessage;
    //   });
    // }
  }
List controllerList =[];
  generateController()
  {
    
    widget.formData!.forEach((formField){

      Map fieldMapController = {
        formField.name : new  TextEditingController()

      };
      controllerList.add(fieldMapController);

    });


  }

  @override
  Widget build(BuildContext context) {
    generateController();
    List list = widget.formData;
    int i =0;


    return SafeArea(
        child: WillPopScope(
      onWillPop: () async {
        Navigator.pop(
            context);
        return true;
      },
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(
                        Icons.arrow_back,
                        color: Color(0xFF52E782),
                      ),
                      onPressed: () {
                        Navigator.pop(
            context);
                      },
                    ),
                    const SizedBox(width: 30),
                    const Text("Enter Credit Info",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            color: Color(0xFF52E782),
                            fontSize: 30,
                            fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 50),
                Form(
                    key: _formKey,
                    child: Column(
                      children: [

                        Column(
                          children: widget.formData.map<Widget>(
                            (field){
                              ;
                return MyTextField(
                    controller: controllerList.elementAt(i++)[field.name],
                    hintText: "${field.name}",
                    obscureText: false);
  }).toList(),

                        ),
                                                const SizedBox(height: 50),
                        GestureDetector(
                            onTap: () async {
                              controllerList.forEach((element) {

                                if(element.containsKey('client_phone'))
                                {
                                  sendSoapRequest(element['client_phone'].text);
                                }
              
                              });
                              print(controllerList.length);
                            },
                            child: Container(
                              padding: const EdgeInsets.all(20),
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 25),
                              decoration: BoxDecoration(
                                  color: const Color(0xFF52E782),
                                  borderRadius: BorderRadius.circular(8)),
                              child:  Center(
                                child: Text("Submit",
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      )),
                                
                            )),


                    )],
                    )),
              ],
            ),
          ),
        ),
      ),
    ));
  }
}
