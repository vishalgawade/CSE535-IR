/*
  This is a basic skeleton JavaScript update processor.

  In order for this to be executed, it must be properly wired into solrconfig.xml; by default it is commented out in
  the example solrconfig.xml and must be uncommented to be enabled.

  See http://wiki.apache.org/solr/ScriptUpdateProcessor for more details.
*/

function processAdd(cmd) {

  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  lang = doc.getFieldValue("lang");
  text = doc.getFieldValue("text");
  logger.info("update-script#processAdd: id=" + lang);
  if(text!==null){
    text=text.toLowerCase();
  }

  // var enviornment = ["air quality", "floods", "droughts", "dust", "storms", "smog", "rains" ,"storm",  "tree", "hurricane"];
  // var crime =["rape" ,"gun", "murder", "kidnapping", "drugs", "police", "traffic lights", "court", "911"];
  // var politics =["trump","obama","elections","polls","hilary clinton","modi", "politic", "politician"];
  // var infrastructure =["roads", "power", "water", "sanitation", "tourism", "Health", "Education", "Energy", "Transportation"];
  // var social_unrest =["strikes", "protests", "riots","march", "organize", "democracia", "conflicto", "revolucion", "criminalidade"];
  var bangkok=['#bangkok', 'bangkok'];
  var delhi=['#delhi', 'delhi'];
  var paris=['#paris', 'paris'];
  var newyork=['#newyork', 'newyork'];
  var mexico=['#mexico', 'mexico'];
  
  if(containsAny(text,mexico) || lang == "es"){
     doc.setField("city", "mexico city");
  }
  else if(containsAny(text,delhi) || lang == "hi"){
    doc.setField("city", "delhi");
  }
  else if(containsAny(text,bangkok) || lang == "th"){
    doc.setField("city", "bangkok");
  }
  else if(containsAny(text,paris) || lang == "fr"){
    doc.setField("city", "paris");
  }
  else if(containsAny(text,newyork) || lang == "en" ){
     doc.setField("city", "nyc");
  }
  else{
     doc.setField("city", "nyc");
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
