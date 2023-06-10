
import 'package:jabaklah_mobile/models/formdata.dart';
import 'package:jabaklah_mobile/models/unpaid.dart';

class Credit{
  String? id;
  String? code;
  String? name;
  String? category;
  List<Unpaid>? unpaidList;
  FormD? formData;
  Credit(this.id,this.code,this.name,this.category,this.formData,{this.unpaidList});

}