import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/screens/agents/addClient.dart';

class AgentProfile extends StatelessWidget {
  const AgentProfile({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: Column(
            children: [
              const SizedBox(height: 200),
              const Text('Welcome Agent',
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 30)),
              const SizedBox(height: 150),
              GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const AddClient()),
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
                        child: Text("Add a Client",
                            style: TextStyle(
                              color: Color(0xFF52E782),
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ))),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}
