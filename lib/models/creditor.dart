import 'package:jabaklah_mobile/models/credit.dart';

class Creditor{
  String? id;
  String? code;
  String? name;
  String? image;
  String? category;
  List<Credit>? creditList;


  Creditor(this.id,this.code,this.name,this.image,this.category,{this.creditList});


}