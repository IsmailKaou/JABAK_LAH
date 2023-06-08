import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final controller;
  final String hintText;
  final bool obscureText;

  const MyTextField(
      {super.key,
      required this.controller,
      required this.hintText,
      required this.obscureText});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25.0),
      child: TextFormField(
        validator: (value) {
          if (hintText == "Email") {
            if (value == null ||
                value.isEmpty ||
                !RegExp(r'^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$')
                    .hasMatch(value!)) {
              return 'Please enter a correct email ';
            }
          } else {
            if (value == null || value.isEmpty) {
              return 'Please enter your $hintText';
            } else
              null;
          }
        },
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          labelText: hintText,
        ),
      ),
    );
  }
}
