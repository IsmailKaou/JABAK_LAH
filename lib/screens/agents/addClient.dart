import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/components/textField.dart';
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/screens/agents/agent_home.dart';
import 'package:xml/xml.dart' as xml;

import 'package:http/http.dart' as http;

import '../../models/client.dart';

class AddClient extends StatefulWidget {
  final jsonUser;
  final add;
  final client;
  const AddClient({super.key, this.jsonUser, this.add, this.client});

  @override
  State<AddClient> createState() => _AddClientState();
}

class _AddClientState extends State<AddClient> {
  static const String myUrl = Config.url;
  final _formKey = GlobalKey<FormState>();
  final firstNameController = TextEditingController();
  final ceillingController = TextEditingController();
  final lastNameController = TextEditingController();
  final phoneController = TextEditingController();
  final emailController = TextEditingController();
  final _ceilingOptions = [
    'Hssab 1 - 200 DH',
    'Hssab 2 - 5000 DH',
    'Hssab 3 - 20 000 DH'
  ];

  final _ceilingOptionsMap = {
    'Hssab 1 - 200 DH': 200,
    'Hssab 2 - 5000 DH': 5000,
    'Hssab 3 - 20 000 DH': 20000
  };
  String? _selectedCeiling='Hssab 1 - 200 DH';

  String createSoapRequest(String firstname, String lastname,
      String phoneNumber, String ceiling, String emailAddress) {
    return '''<?xml version="1.0" encoding="utf-8"?>
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <createClientRequest xmlns="http://example.com/clientservice"> 
                  <clientDetails>
                      <firstName>$firstname</firstName>
                      <lastName>$lastname</lastName>
                      <phoneNumber>$phoneNumber</phoneNumber>
                      <ceiling>${_ceilingOptionsMap[ceiling]}</ceiling>
                      <emailAddress>$emailAddress</emailAddress>
                  </clientDetails>
              </createClientRequest>
        </Body>
    </Envelope>
    ''';
  }

  String updateSoapRequest(Client client, String firstname, String lastname,
      String phoneNumber, String ceiling, String emailAddress) {
    return '''<?xml version="1.0" encoding="utf-8"?>
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <updateClientRequest xmlns="http://example.com/clientservice">
          <clientId>${client.id}</clientId>
              <clientInfo>
                  <firstName>$firstname</firstName>
                  <lastName>$lastname</lastName>
                  <phoneNumber>$phoneNumber</phoneNumber>
                  <ceiling>${_ceilingOptionsMap[ceiling]}</ceiling>
                  <emailAddress>$emailAddress</emailAddress>
              </clientInfo>
          </updateClientRequest>
        </Body>
    </Envelope>
    ''';
  }

  late bool isCreated = false;

  late String errorMessage;
  String message = '';

  Future<void> sendSoapRequest() async {
    final soapRequest = createSoapRequest(
        firstNameController.text,
        lastNameController.text,
        phoneController.text,
        _selectedCeiling!,
        emailController.text);

    final headers = {
      'SOAPAction': '$myUrl/createClient',
      'Content-Type': 'text/xml; charset=utf-8',
    };

    final response = await http.post(
      Uri.parse('$myUrl/ws'),
      headers: headers,
      body: soapRequest,
    );
    print(response.statusCode);

    final xmlDoc = xml.XmlDocument.parse(response.body);
    isCreated = xmlDoc
            .findAllElements('ns2:isCreated')
            .single
            .innerText
            .toLowerCase() ==
        'true';

    if (isCreated) {
      print('Agent created successfully');
      setState(() {
        message = "Agent created successfully";
      });
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => AgentCrud(
                    jsonUser: widget.jsonUser,
                  )));
    } else {
      errorMessage =
          xmlDoc.findAllElements('ns2:errorMessage').single.innerText;
      print('Error creating Agent: $errorMessage');
      setState(() {
        message = errorMessage;
      });
    }
    @override
    void initState() {
      super.initState();

      if (!widget.add) {
        // Set initial values for editing
        lastNameController.value =
            TextEditingValue(text: widget.client.lastName);
        firstNameController.text = widget.client.firstName;
        phoneController.text = widget.client.phoneNumber;
        emailController.text = widget.client.emailAddress;
      }
    }

    @override
    void dispose() {
      lastNameController.dispose();
      firstNameController.dispose();
      phoneController.dispose();
      emailController.dispose();
      ceillingController.dispose();
      super.dispose();
    }
  }

  Future<void> update(Client client) async {
    print("likan");
    final soapRequest = updateSoapRequest(
        client,
        firstNameController.text,
        lastNameController.text,
        phoneController.text,
        _selectedCeiling!,
        emailController.text);
print(soapRequest);
    final updateHeaders = {
      'SOAPAction': '$myUrl/updateClient',
      'Content-Type': 'text/xml;charset=UTF-8',
    };

    final response = await http.post(
      Uri.parse('$myUrl/ws'),
      headers: updateHeaders,
      body: soapRequest,
    );

    final parser = xml.XmlDocument.parse(response.body);
    final isUpdated =
        parser.findAllElements('ns2:isUpdated').first.text == 'true';

    if (isUpdated) {
      print('Client updated successfully');
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => AgentCrud(
                    jsonUser: widget.jsonUser,
                  )));
    } else {
      final errorMessage =
          parser.findAllElements('ns2:errorMessage').first.text;
      print('Error updating Client: $errorMessage');
      setState(() {
        message = errorMessage;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    setState(() {
      lastNameController.value =
          TextEditingValue(text: widget.add ? "" : widget.client.lastName);
      firstNameController.value =
          TextEditingValue(text: widget.add ? "" : widget.client.firstName);

      phoneController.value =
          TextEditingValue(text: widget.add ? "" : widget.client.phoneNumber);
      emailController.value = emailController.value =
          TextEditingValue(text: widget.add ? "" : widget.client.emailAddress);
    });

    return SafeArea(
        child: WillPopScope(
      onWillPop: () async {
        Navigator.pushReplacement(
            context,
            MaterialPageRoute(
                builder: (context) => AgentCrud(
                      jsonUser: widget.jsonUser,
                    )));
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
                        Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                                builder: (context) => AgentCrud(
                                      jsonUser: widget.jsonUser,
                                    )));
                      },
                    ),
                    const SizedBox(width: 30),
                    const Text("Client Informations",
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
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 25.0),
                          child: DropdownButtonFormField<String>(
                            value: 'Hssab 1 - 200 DH',
                            items: _ceilingOptions.map((ceiling) {
                              return DropdownMenuItem<String>(
                                value: ceiling,
                                child: Text(ceiling),
                              );
                            }).toList(),
                            onChanged: (value) {
                              setState(() {
                                _selectedCeiling = value;
                              });
                            },
                            decoration: const InputDecoration(
                              labelText: 'Ceiling',
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Ceiling is required';
                              }
                              return null;
                            },
                          ),
                        ),
                        const SizedBox(height: 25),
                        MyTextField(
                          controller: firstNameController,
                          hintText: "FirstName",
                          obscureText: false,
                        ),
                        const SizedBox(height: 25),
                        MyTextField(
                            controller: lastNameController,
                            hintText: "LastName",
                            obscureText: false),
                        const SizedBox(height: 25),
                        MyTextField(
                            controller: phoneController,
                            hintText: "Phone",
                            obscureText: false),
                        const SizedBox(height: 25),
                        MyTextField(
                            controller: emailController,
                            hintText: "Email",
                            obscureText: false),
                        const SizedBox(height: 50),
                        Padding(
                          padding: const EdgeInsets.all(20),
                          child: Text(
                            message,
                            style: TextStyle(
                                color: isCreated ? Colors.green : Colors.red,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                        const SizedBox(height: 50),
                        GestureDetector(
                            onTap: () async {
                              if (_formKey.currentState!.validate()) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text('Processing Data'),
                                      backgroundColor: Colors.blue),
                                );
                                if (widget.add) {
                                  await sendSoapRequest();
                                } else {
                                  print(widget.client.firstName);
                                  await update(widget.client);

                                  print("update");
                                }
                              }
                            },
                            child: Container(
                              padding: const EdgeInsets.all(20),
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 25),
                              decoration: BoxDecoration(
                                  color: const Color(0xFF52E782),
                                  borderRadius: BorderRadius.circular(8)),
                              child: const Center(
                                  child: Text("Submit",
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ))),
                            )),
                      ],
                    )),
              ],
            ),
          ),
        ),
      ),
    ));
  }
}
