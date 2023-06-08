import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/screens/agents/agentLogin.dart';
import 'package:jabaklah_mobile/screens/clients/clientLogin.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset('assets/images/logo.png',
                width: 200, fit: BoxFit.cover),
            const SizedBox(height: 150),
            GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => ClientLogin()),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.all(20),
                  margin: const EdgeInsets.symmetric(horizontal: 25),
                  decoration: BoxDecoration(
                      color: const Color(0xFF52E782),
                      borderRadius: BorderRadius.circular(8)),
                  child: const Center(
                      child: Text("Sign as Client",
                          style: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ))),
                )),
            const SizedBox(height: 25),
            GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => AgentLogin()),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.all(20),
                  margin: const EdgeInsets.symmetric(horizontal: 25),
                  decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(
                        color: const Color(0xFF52E782),
                        width: 1.0,
                      ),
                      borderRadius: BorderRadius.circular(8)),
                  child: const Center(
                      child: Text("Sign as Agent",
                          style: TextStyle(
                            color: Color(0xFF52E782),
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ))),
                )),
          ],
        ),
      ),
    );
  }
}
