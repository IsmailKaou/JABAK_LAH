import 'package:flutter/material.dart';

import '../../components/textField.dart';
import 'package:jabaklah_mobile/controllers/verification_controller.dart';


class ResetPassword extends StatefulWidget {
  final jsonUser;
  const ResetPassword({super.key,this.jsonUser});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  final _formKey = GlobalKey<FormState>();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final verifyController = VerifyController();

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              const Text("Reset Password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 35,
                      fontWeight: FontWeight.bold)),
              const SizedBox(height: 50),
              Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      MyTextField(
                          controller: _passwordController,
                          hintText: "New Password",
                          obscureText: true),
                      const SizedBox(height: 25),
                      MyTextField(
                          controller: _confirmPasswordController,
                          hintText: "confirm password",
                          obscureText: true),
                      const SizedBox(height: 50),
                      GestureDetector(
                          onTap: () {
                            if(_passwordController.text.compareTo(_confirmPasswordController.text)!=0){
                              ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text(
                                    "Passwords don't match up",
                                    textAlign: TextAlign.center,
                                  ),
                                  backgroundColor: Colors.red),
                            );
                            }
                            else{
                            if (_formKey.currentState!.validate()) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text(
                                    'Processing... ',
                                    textAlign: TextAlign.center,
                                  ),
                                  backgroundColor: Colors.blue),
                            );
                            verifyController.verifyUser(_passwordController.text, widget.jsonUser, context);
                            }
                            }
                          },
                          child: Container(
                            padding: const EdgeInsets.all(20),
                            margin: const EdgeInsets.symmetric(horizontal: 25),
                            decoration: BoxDecoration(
                                color: const Color(0xFF52E782),
                                borderRadius: BorderRadius.circular(8)),
                            child: const Center(
                                child: Text("Reset Password",
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ))),
                          ))
                    ],
                  )),
            ],
          ),
        ),
      ),
    ));
  }
}
