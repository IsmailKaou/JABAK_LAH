import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:jabaklah_mobile/configuration/config.dart';
import 'package:jabaklah_mobile/screens/agents/agentProfile.dart';
import 'package:jabaklah_mobile/screens/reset-password/reset-password.dart';
import 'package:jabaklah_mobile/screens/agents/agent_home.dart';
import 'package:jabaklah_mobile/screens/clients/client_home.dart';
import 'package:jabaklah_mobile/screens/home.dart';

import '../screens/clients/clientProfile.dart';

class AuthController {
  static const String myUrl = Config.url;
  Future loginAgent(String email, String password, context) async {
    const url = "$myUrl/api/v1/auth/authenticate/agent";
    var response = await http.post(Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: json.encode({"email": email, "password": password}));
    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      Navigator.pop(context);
      if (jsonResponse["status"] == 'VERIFIED_USER') {
        print("verified");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  AgentCrud(jsonUser: jsonResponse,)),
        );
      } else {
        print(jsonResponse);
        print("not verified");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) =>  ResetPassword(jsonUser: jsonResponse,)),
        );
      }
    } else {
      print("connection failed");
    }
  }

  Future loginClient(String phone, String password, context) async {
    const url = "$myUrl/api/v1/auth/authenticate";
    var response = await http.post(Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: json.encode({"phoneNumber": phone, "password": password}));
    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      Navigator.pop(context);
      if (jsonResponse["status"] == 'VERIFIED_USER') {
        print("verified");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ClientProfileView(jsonUser: jsonResponse,)),
        );
      } else if(jsonResponse["status"] == 'UNVERIFIED_USER'){
        print("not verified");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ResetPassword(jsonUser: jsonResponse,)),
        );
      }
    } else {
      print(response.statusCode);
      print("not ok");
    }
  }
  Future logout(jsonUser, context) async {
    const url = "$myUrl/api/v1/auth/logout";
    String token = jsonUser['access_token'];
    print(token);
    var response = await http.post(Uri.parse(url),
        headers: {"Content-Type": "application/json","Authorization":"Bearer $token"},
        body: json.encode({}));
    if (response.statusCode == 200) {
      print("loged out");
      Navigator.pop(context);
      Navigator.pop(context);
    } else {
      print(response.statusCode);
      print("not ok");
    }
  }
}
