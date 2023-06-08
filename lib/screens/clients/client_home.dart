import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import '../../models/creditor.dart';
import '../../models/bill.dart';
import '../../controllers/authController.dart';
import 'package:jabaklah_mobile/controllers/client_controller.dart';


class ClientProfileView extends StatefulWidget {
  final jsonUser;
  const ClientProfileView({super.key,this.jsonUser});

  @override
  State<ClientProfileView> createState() => _ClientProfileViewState();
}

class _ClientProfileViewState extends State<ClientProfileView> with TickerProviderStateMixin{
  final Color bgColor = Colors.white;
  final Color lightGreen =  const Color(0xFF52E782);
  final Color lightBlack =  const Color(0xFF0E0E10);
  final AuthController authController = AuthController();
  final ClientController clientController = ClientController();
    

  late final TabController _tabController;
  List<Creditor> creditorList =[];
  bool _hasCredetors = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this,initialIndex: 0);

    clientController.getCreditors().then(
      (soapCreditorList) {
        setState(() {
          creditorList = soapCreditorList;
          _hasCredetors = true;
        });
      }
    );
  }
  String getAgentName()
  {
    return '${widget.jsonUser["firstName"]} ${widget.jsonUser["lastName"]}' ;
  }

  List<Bill> billList =[
    Bill(1,'IAM Recharges','50 DH','12/12/2022'),
    Bill(2,'Redal','500 DH','12/01/2023'),
    Bill(3,'Amendis Tanger Factures','50 DH','02/11/2022'),
    Bill(4,'Orange Factures','250 DH','12/10/2022'),
  ];

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       drawer: Drawer(
        backgroundColor: bgColor,
        child: ListView(
          padding: EdgeInsets.zero,
          children:[
             DrawerHeader(
            decoration: BoxDecoration(
              color: lightGreen,
              gradient: const LinearGradient(
                 begin: Alignment.bottomRight,
                    end:Alignment.topLeft,
                    colors: <Color>[
                      Color(0XFFC8E6C9),
                      Color(0XFF4CAF50),

                    ]
              ) ,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children:  [
               const SizedBox(
                  height: 20,
                ),
                const Text("Welcome,",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                  ),
                ),
              const SizedBox(
                  height: 10,
                ),
                Text(
                  getAgentName(),
                  style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold
                  ),
                ),
              ],
            )
          ),
          ListTile(
          title: const Text(
            'Home',
            style:TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
            ),
          ),
            leading: const Icon(Icons.home),
            onTap: () {
              Navigator.pop(context);
            },

            
          ),
          ListTile(
          title: const Text(
            'Logout',
            style:TextStyle(
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
      appBar:AppBar(
        title:  Text(
          'PAY YOUR BILLS',
          style : TextStyle(
            color : lightBlack,
          ),
          ),
        centerTitle: true,
        backgroundColor: bgColor,
        iconTheme:  IconThemeData(color:lightGreen), 
        bottom:  TabBar(
            controller: _tabController,
            labelColor: Colors.black, 
             indicatorColor: lightGreen,
          tabs: const [
            Tab(text: 'List of Creditors'),
            Tab(text: 'History'),
          ]
          ),   
      ),
      body: TabBarView(
        controller: _tabController,
        children:  <Widget>[
           getCreditorsList(),
      
          getBillHistory(),
          ]
          )

    );
  }
   Widget getCreditorsList()
  {
    if(_hasCredetors)
    {
      return ListView(
      children: [
        const SizedBox(
          height: 20,
        ),
        Table(
          children: getTable(),
        )
      ],
    );
    }
    else{
      return  Center(
    child:SizedBox(
      width:60 ,
      height: 60,
      child: CircularProgressIndicator(color: lightGreen,),
    )
    );
    }
  }


  getTable()
  {
    TableRow tableRow=const TableRow();
    List<TableRow> tableRowList =[];
    for(int i=0;i<=(creditorList.length/2).floor();i++){
      if(i<(creditorList.length/2).floor())
      {
        tableRow=TableRow(
          children: [
            TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/${creditorList[2*i].image}',height: 100),
                    const SizedBox(height: 10,),
                    Text('${creditorList[2*i].name}', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),
                  ]),
                ),
              )),
              TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/${creditorList[2*i+1].image}',height: 100),
                    const SizedBox(height: 10,),
                    Text('${creditorList[2*i+1].name}', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),
                  ]),
                ),
              )),
          ]
        
      );
      }
      else if(i==(creditorList.length/2).floor() && creditorList.length%2==1)
      {
        tableRow=TableRow(
          children: [
            TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/${creditorList[2*i].image}',height: 100),
                    const SizedBox(height: 10,),
                    Text('${creditorList[2*i].name}', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),
                  ]),
                ),
              )),
               TableCell(
                child:  Container(
                child:  Column(
                  children: [
                    const SizedBox(height: 110,),
                    Text('', style: TextStyle(color: bgColor),),
                    const SizedBox(height: 10,),
                  ]),
                ),
              ),
              
          ]
        
      );
      }
      else {
        break;
      }
      tableRowList.add(tableRow);


    }
    return tableRowList;
    
  }
getBillHistory()
{
  return Table(
    children: billList
    .map(
      (bill) => TableRow(
        children: [
          TableCell(child: Text(bill.creditor!)),
          TableCell(child: Text(bill.amount!)),
          TableCell(child: Text(bill.date!)),
        ]
      ))
      .toList(),
  );
}
}



 /*  Widget getCreditorsList()
  {
    return ListView(
      children: [
        const SizedBox(
          height: 20,
        ),
        Table(
      children:[
        TableRow(
          children: [
            TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Maroc Telecom.png',height: 100),
                    const SizedBox(height: 10,),
                    const Text('Maroc Telecom Recharges', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),
              TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Maroc Telecom.png',height: 100),
                    const SizedBox(height: 10,),
                    const Text('Maroc Telecom Recharges',style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),

          ]
        ),
        const TableRow(
          children: [
            SizedBox(height: 20,),
            SizedBox(height: 20,),
          ]
        ),
        TableRow(
          children: [
            TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Orange.png',height: 100,),
                    const SizedBox(height: 10,),
                    const Text('Orange Recharge', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),
              TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Inwi.jpg',height: 100),
                    const SizedBox(height: 10,),
                    const Text('Inwi Recharge',style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),

          ]
        ),
        const TableRow(
          children: [
            SizedBox(height: 20,),
            SizedBox(height: 20,),
          ]
        ),

          TableRow(
          children: [
            TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Redal.jpg',height: 100,),
                    const SizedBox(height: 10,),
                    const Text('Redal', style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),
              TableCell(
              child: Card(
                elevation: 7,
                child: InkWell(
                  onTap: (){
                  },
                  child: Column(
                  children: [
                    Image.asset('assets/images/Amendis Tanger.jpg',height: 100),
                    const SizedBox(height: 10,),
                    const Text('Amendis Tanger',style: TextStyle(fontWeight: FontWeight.bold),),
                    const SizedBox(height: 10,),

                  ]),
                ),
              )),

          ]
        ),
      
      ],
      
      
    )
      ],
    );
  } */
 