window.onload = function() {
  var my64 = new PROTO.I64(2147483647,4294967295,-1);
  var oneHundred = new PROTO.I64(1,100,1);//4294967396
  var twoTen = new PROTO.I64(2,10,1);//8589934602
  var NoneHundred = new PROTO.I64(1,100,-1);//4294967396
  var NtwoTen = new PROTO.I64(2,10,-1);//8589934602
  var unsigned64 = my64.convertToUnsigned();
  var zigzag64 = my64.convertToZigzag();
  var output = document.getElementById('output');
  output.value += "" + my64.msw+","+my64.lsw+"\n";
  output.value += "Parts " + my64.msw+","+my64.lsw+"\n";
  output.value += "UParts " + unsigned64.msw+","+unsigned64.lsw+"\n";
  output.value += "ZZParts " + zigzag64.msw+","+zigzag64.lsw+"\n";
  output.value += "Unsigned Num: "+unsigned64.toNumber()+"\n";
  output.value += "Unsigned Zigzag Num: "+zigzag64.toNumber()+"\n";
  output.value += "Num: "+my64.toNumber()+"\n";
  output.value += "Unsigned 256: "+unsigned64.serializeToLEBase256().toString()+"\n";
  output.value += "Unsigned 128: "+unsigned64.serializeToLEVar128().toString()+"\n";
  output.value += "Zig 256: "+my64.convertToZigzag().serializeToLEBase256().toString()+"\n";
  output.value += "Zig 128: "+my64.convertToZigzag().serializeToLEVar128().toString()+"\n";
  output.value += "4294967396+8589934602 = "+twoTen.add(oneHundred).toNumber()+"\n";
  output.value += "8589934602-4294967396 = "+twoTen.sub(oneHundred).toNumber()+"\n";
  output.value += "4294967396-8589934602 = "+oneHundred.sub(twoTen).toNumber()+"\n";
  output.value += "-4294967396+-8589934602 = "+NtwoTen.add(NoneHundred).toNumber()+"\n";
  output.value += "-8589934602--4294967396 = "+NtwoTen.sub(NoneHundred).toNumber()+"\n";
  output.value += "-4294967396--8589934602 = "+NoneHundred.sub(NtwoTen).toNumber()+"\n";
  output.value += "-8589934602+4294967396 = "+NtwoTen.add(oneHundred).toNumber()+"\n";
  output.value += "-4294967396+8589934602 = "+NoneHundred.add(twoTen).toNumber()+"\n";
  output.value += "-8589934602-4294967396 = "+NtwoTen.sub(oneHundred).toNumber()+"\n";
  output.value += "-4294967396-8589934602 = "+NoneHundred.sub(twoTen).toNumber()+"\n";
  var flt=2350.2352355552;
  output.value += flt + ": "+PROTO.binaryParser.fromDouble(flt)+" back "+PROTO.binaryParser.toDouble(PROTO.binaryParser.fromDouble(flt))+"\n";
  var arr = [];
  var stream = new PROTO.ByteArrayStream(arr);
  var b64stream = new PROTO.Base64Stream();
  var extmsg = new Sirikata.PB.ExternalMessage();
  extmsg.is_true = true;
  output.value += extmsg.toString();
  extmsg.SerializeToStream(stream);
  output.value += "ExternalMessage.is_true: Serializes to ["+arr.toString()+"]\n";
  extmsg = new Sirikata.PB.TestMessage;
  arr2 = new Array;
  stream = new PROTO.ByteArrayStream(arr2);
  extmsg.v2f = [1.25, 2.5]
  extmsg.xxd = 3.14159265358979323846264;
  extmsg.xxf = .12345678
  extmsg.xxff.push(1);
  extmsg.xxff.push(123456789123456789);
  extmsg.xxff.push(-1.345e-30);
  extmsg.xxfr = .1;
  extmsg.xxs = ("\u59cb");
  extmsg.xxss.push("Hello world!");
  extmsg.xxss.push("Brought to you by \u30b7\u30ea\u30ab\u30bf");
  extmsg.xxbb.push([1,2,3,4,5,6,7,8,255,254,253,252,251,250,249,248]);
  extmsg.xxb = arr;
  extmsg.f32 = Sirikata.PB.TestMessage.Flagsf32.WE | Sirikata.PB.TestMessage.Flagsf32.IMAGE;
  extmsg.e32 = Sirikata.PB.TestMessage.Enum32.WEB1;
try {
  extmsg.submes.subduration = 0;
} catch (e) {
  output.value += "Testing if we get an error for invalid I64: "+e+"\n";
}
  extmsg.submes.subduration = PROTO.I64.fromNumber(1234567);
  extmsg.submessers.push().subduration = PROTO.I64.fromNumber(1);
  extmsg.submessers.push().subduration = PROTO.I64.fromNumber(2);
  extmsg.submessers.push().subduration = PROTO.I64.fromNumber(18234563242342346752);
  extmsg.extmesser.is_true = 5;
  output.value += extmsg;
  extmsg.SerializeToStream(b64stream);
  extmsg.SerializeToStream(stream);
  output.value += "\n TestMessage encoded is:\n["+arr2+"]\n";
  output.value += "\n TestMessage base64'ed is:\n"+b64stream.getString()+"\n";
  var decodedmsg = new Sirikata.PB.TestMessage;
  decodedmsg.ParseFromStream(new PROTO.ByteArrayStream(arr2));
  output.value += "\n DECODED: \n"+decodedmsg;
  var decoded64msg = new Sirikata.PB.TestMessage;
  decoded64msg.ParseFromStream(new PROTO.Base64Stream(b64stream.getString()));
  output.value += "\n DECODED64: \n"+decoded64msg;
};