import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class ShowUnpaid extends StatefulWidget {
  final listUnpaid;
  const ShowUnpaid({super.key,this.listUnpaid});

  @override
  State<ShowUnpaid> createState() => _ShowUnpaidState();
}

class _ShowUnpaidState extends State<ShowUnpaid> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: widget.listUnpaid.map(
        (element)
        {
          return Text(element.id);
        }
      )
      ),
    );
  }
}