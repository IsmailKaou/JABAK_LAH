import 'package:flutter/material.dart';
import 'package:jabaklah_mobile/controllers/client_controller.dart';
import 'package:jabaklah_mobile/screens/agents/addClient.dart';
import '../../models/client.dart';
import '../../controllers/authController.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class AgentCrud extends StatefulWidget {
  final jsonUser;
  const AgentCrud({super.key, this.jsonUser});

  @override
  State<AgentCrud> createState() => _AgentCrudState();
}

class _AgentCrudState extends State<AgentCrud> {
  final Color bgColor = Colors.white;
  final Color lightGreen = const Color(0xFF52E782);
  final Color lightBlack = const Color(0xFF0E0E10);
  final AuthController authController = AuthController();
  final ClientController clientController = ClientController();

  final double cardHeight = 120;
  List<Client> clientList = [];
  String getAgentName() {
    return '${widget.jsonUser["firstName"]} ${widget.jsonUser["lastName"]}';
  }

  @override
  void initState() {
    super.initState();
    clientController.getClientList().then((soapClientList) {
      setState(() {
        clientList = soapClientList;
      });
    });
  }

  getCeilingClientsNumber(String ceiling) {
    int counter = 0;
    clientList.forEach((client) {
      if (client.ceiling == ceiling) {
        counter++;
      }
    });
    return counter;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        backgroundColor: bgColor,
        child: ListView(padding: EdgeInsets.zero, children: [
          DrawerHeader(
              decoration: BoxDecoration(
                color: lightGreen,
                gradient: const LinearGradient(
                    begin: Alignment.bottomRight,
                    end: Alignment.topLeft,
                    colors: <Color>[
                      Color(0XFFC8E6C9),
                      Color(0XFF4CAF50),
                    ]),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  const Text(
                    "Welcome,",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    getAgentName(),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              )),
          ListTile(
            title: const Text(
              'Dashboard',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
            leading: const Icon(Icons.home),
            onTap: () {
              Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                      builder: (context) => AgentCrud(
                            jsonUser: widget.jsonUser,
                          )));
            },
          ),
          ListTile(
            title: const Text(
              'Logout',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
            leading: const Icon(Icons.logout),
            onTap: () {
              authController.logout(widget.jsonUser, context);
            },
          ),
        ]),
      ),
      appBar: AppBar(
        title: Text(
          'Dashboard',
          style: TextStyle(
            color: lightBlack,
          ),
        ),
        centerTitle: true,
        backgroundColor: bgColor,
        iconTheme: IconThemeData(color: lightGreen),
      ),
      backgroundColor: bgColor,
      body: ListView(children: [
        Container(
          margin: const EdgeInsets.only(top: 30, bottom: 20, left: 10),
          child: Text(
            'Statistics',
            style: TextStyle(
              color: lightBlack,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Table(
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          children: [
            TableRow(
              children: [
                SizedBox(
                  height: cardHeight,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                    elevation: 7,
                    margin: const EdgeInsets.all(10),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(7),
                        gradient: const LinearGradient(
                            begin: Alignment.bottomRight,
                            end: Alignment.topLeft,
                            colors: <Color>[
                              Color(0XFFFF5722),
                              Color(0XFFFFCCBC),
                            ]),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            height: 15,
                          ),
                          const Text(
                            "Total clients",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(
                            height: 15,
                          ),
                          Text(
                            "${clientList.length}",
                            style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 25,
                                color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: cardHeight,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5)),
                    elevation: 7,
                    margin: const EdgeInsets.all(10),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(7),
                        gradient: const LinearGradient(
                            begin: Alignment.bottomRight,
                            end: Alignment.topLeft,
                            colors: <Color>[
                              Color(0XFF4CAF50),
                              Color(0XFFC8E6C9),
                            ]),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            height: 15,
                          ),
                          const Text(
                            "200 DH ceiling",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(
                            height: 15,
                          ),
                          Text(
                            getCeilingClientsNumber("200").toString(),
                            style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 25,
                                color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(
          height: 20,
        ),
        Table(
          children: [
            TableRow(
              children: [
                SizedBox(
                  height: cardHeight,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5)),
                    elevation: 7,
                    margin: const EdgeInsets.all(10),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(7),
                        gradient: const LinearGradient(
                            begin: Alignment.bottomRight,
                            end: Alignment.topLeft,
                            colors: <Color>[
                              Color(0XFF2196F3),
                              Color(0XFFBBDEFB),
                            ]),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            height: 15,
                          ),
                          const Text(
                            "5000 DH ceiling",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(
                            height: 15,
                          ),
                          Text(
                            getCeilingClientsNumber("5000").toString(),
                            style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 25,
                                color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: cardHeight,
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5)),
                    elevation: 7,
                    margin: const EdgeInsets.all(10),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(7),
                        gradient: const LinearGradient(
                            begin: Alignment.bottomRight,
                            end: Alignment.topLeft,
                            colors: <Color>[
                              Color(0XFF009688),
                              Color(0XFFB2DFDB),
                            ]),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            height: 15,
                          ),
                          const Text(
                            "20000 DH ceiling",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(
                            height: 15,
                          ),
                          Text(
                            getCeilingClientsNumber("20000").toString(),
                            style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 25,
                                color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 20, bottom: 20, left: 10),
              child: Text(
                'Clients',
                style: TextStyle(
                  color: lightBlack,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(
                  top: 20, bottom: 20, left: 10, right: 10),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => AddClient(
                                jsonUser: widget.jsonUser,
                              )));
                },
                style: ElevatedButton.styleFrom(backgroundColor: lightGreen),
                child: Text(
                  "Add Client",
                  style: TextStyle(
                    color: bgColor,
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            )
          ],
        ),
        Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: const Offset(0, 3), // changes position of shadow
                ),
              ],
            ),
            margin: const EdgeInsets.all(10),
            child: Column(children: [
              Table(
                  border: TableBorder(
                      horizontalInside: BorderSide(
                          width: 1,
                          color: lightBlack,
                          style: BorderStyle.solid)),
                  defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                  children: clientList
                      .map((client) => TableRow(
                            children: [
                              TableCell(
                                  child: Center(
                                child: Text(
                                    '${client.firstName} ${client.lastName}',
                                    style: const TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.bold)),
                              )),
                              TableCell(
                                  child: Center(
                                      child: Text('${client.ceiling} DH',
                                          style: const TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold)))),
                              TableCell(
                                  child: Center(
                                      child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  IconButton(
                                    icon: const Icon(
                                      FontAwesomeIcons.pencil,
                                      size: 20,
                                    ),
                                    onPressed: () {},
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.delete),
                                    onPressed: () {
                                      clientController.delete(client.id);
                                      setState(() {
                                        clientList.remove(client);
                                      });
                                    },
                                  ),
                                ],
                              )))
                            ],
                          ))
                      .toList())
            ]))
      ]),
    );
  }
}
