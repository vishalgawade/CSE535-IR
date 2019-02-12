/*
  This is a basic skeleton JavaScript update processor.

  In order for this to be executed, it must be properly wired into solrconfig.xml; by default it is commented out in
  the example solrconfig.xml and must be uncommented to be enabled.

  See http://wiki.apache.org/solr/ScriptUpdateProcessor for more details.
*/

function processAdd(cmd) {

  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  text = doc.getFieldValue("text");
  logger.info("update-script#processAdd: id=" + text);
  if(text!==null){
    text=text.toLowerCase();
  }

  var enviornment = ["air quality", "floods", "droughts", "dust", "storms", "smog", "rains" ,"storm",  "tree", "hurricane","florence"];
  var crime =["rape" ,"gun", "murder", "kidnapping", "drugs", "police", "traffic lights", "court", "911","arson","assault","bigamy","blackmail","bribery","child abuse","conspiracy","espionage","forgery","fraud","genocide","hijacking","homicide","kidnapping","manslaughter","mugging","murder","perjury","riot","robbery","shoplifting","slander","smuggling","treason","trespassing"];
  var politics =["trump","obama","elections","polls","hilary clinton","modi", "politic", "politician"];
  var infrastructure =["roads", "power", "water", "sanitation", "tourism", "Health", "Education", "Energy", "Transportation"];
  var social_unrest =["strikes", "protests", "riots","march", "organize", "democracia", "conflicto", "revolucion", "criminalidade"];
  
  if(containsAny(text, enviornment)){
     doc.setField("topic", "environment");
  }
  else if(containsAny(text, crime)){
    doc.setField("topic", "crime");
  }
  else if(containsAny(text, politics)){
    doc.setField("topic", "politics");
  }
  else if(containsAny(text, infrastructure)){
    doc.setField("topic", "infra");
  }
  else if(containsAny(text, social_unrest)){
    doc.setField("topic", "social unrest");
  }
  else{
    var i=getRandomInt(4);
    if(i==1){
     doc.setField("topic", "environment");
  }
  if(i==2){
     doc.setField("topic", "politics");
  }
  if(i==3){
     doc.setField("topic", "infra");
  }
  if(i==0){
     doc.setField("topic", "social unrest");
  }
  if(i==4){
     doc.setField("topic", "crime");
  }
}

// Get a configuration parameter:
//  config_param = params.get('config_param');  // "params" only exists if processor configured with <lst name="params">

// Get a request parameter:
// some_param = req.getParams().get("some_param")

// Add a field of field names that match a pattern:
//   - Potentially useful to determine the fields/attributes represented in a result set, via faceting on field_name_ss
//  field_names = doc.getFieldNames().toArray();
//  for(i=0; i < field_names.length; i++) {
//    field_name = field_names[i];
//    if (/attr_.*/.test(field_name)) { doc.addField("attribute_ss", field_names[i]); }
//  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if(str!==null) {
       if (str.indexOf(substring) != - 1) {
         return true;
       }
     }
    }
    return false; 
}

function processDelete(cmd) {
  // no-op
}

function processMergeIndexes(cmd) {
  // no-op
}

function processCommit(cmd) {
  // no-op
}

function processRollback(cmd) {
  // no-op
}

function finish() {
  // no-op
}
