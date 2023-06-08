import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/components/textField.dart';
import 'package:jabaklah_mobile/controllers/authController.dart';
import 'package:jabaklah_mobile/screens/home.dart';

import 'addClient.dart';

class AgentLogin extends StatelessWidget {
  AgentLogin({super.key});
  final _formKey = GlobalKey<FormState>();

  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final AuthController authController = AuthController();

  /*  void signIn() {
    print("anas");
    authController.loginAgent(emailController.text, passwordController.text);
  }
 */
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
            child: Form(
          key: _formKey,
          child: Center(
            child: SingleChildScrollView(
              child: Column(children: [
                const Icon(
                  Icons.lock,
                  size: 100,
                  color: Color(0xFF52E782),
                ),
                const SizedBox(height: 25),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 25),
                  child: Text('Agent Login',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      )),
                ),
                const SizedBox(height: 25),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25),
                  child: Text('Welcome back',
                      style: TextStyle(
                        color: Colors.grey[700],
                        fontSize: 16,
                      )),
                ),
                const SizedBox(height: 50),
                MyTextField(
                    controller: emailController,
                    hintText: "Email",
                    obscureText: false),
                const SizedBox(height: 25),
                MyTextField(
                    controller: passwordController,
                    hintText: "Password",
                    obscureText: true),
                const SizedBox(height: 50),
                GestureDetector(
                    onTap: () {
                      if (_formKey.currentState!.validate()) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text(
                                'Processing ',
                                textAlign: TextAlign.center,
                              ),
                              backgroundColor: Colors.blue),
                        );
                        authController.loginAgent(emailController.text,
                            passwordController.text, context);
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      margin: const EdgeInsets.symmetric(horizontal: 25),
                      decoration: BoxDecoration(
                          color: const Color(0xFF52E782),
                          borderRadius: BorderRadius.circular(8)),
                      child: const Center(
                          child: Text("Sign In",
                              style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ))),
                    )),
                const SizedBox(height: 15),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Having trouble ?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(
                      width: 4,
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const Home()),
                        );
                      },
                      child: const Text(
                        'Click here',
                        style: TextStyle(
                            color: Color(0xFF52E782),
                            fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                )
              ]),
            ),
          ),
        )));
  }
}
