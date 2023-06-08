import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/screens/agents/agentProfile.dart';
import 'package:jabaklah_mobile/screens/agents/agent_home.dart';
import 'package:jabaklah_mobile/screens/clients/client_home.dart';
import 'package:jabaklah_mobile/screens/reset-password/reset-password.dart';

import '../screens/clients/clientProfile.dart';

class VerifyController {
  static const String myUrl = Config.url;
  Future verifyUser(String password, jsonUser ,context) async {
    const url = "$myUrl/api/v1/verify";
    String token = jsonUser['access_token'];
    var response = await http.post(Uri.parse(url),
        headers: {"Content-Type": "application/json","Authorization":"Bearer $token"},
        body: json.encode({"newPassword": password}));
    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      if(jsonResponse['user']=="agent")
      {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) =>  AgentCrud(jsonUser: jsonResponse,)),
        );
      }
      else{
          Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) =>  ClientProfileView(jsonUser: jsonResponse,)),
        );
      }

    } else {
      print("connection failed");
    }
  }

}
