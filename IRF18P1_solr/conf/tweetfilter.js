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
 // String emoj = "[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]"; 
 // var rr=/[:\-)D]+/g;
  var rr=/[:;]-?[DP()]/g;
  var regex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
  var urlregex =/(?:https?|ftp):\/\/[\n\S]+/g;
  var hash =/(\S*#\[[^\]]+\])|(\S*#\S+)/gi;
  var mentions=/\s([@#][\w_-]+)/g;
  var mmm=/(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_.]{1,15})(?:\b(?!@|＠)|$)/g;
  if(text!==null){
     text=text.replace('\n','')
  text=text.replace('\t','')
  text=text.replace(urlregex,"");
  text=text.replace(hash,"");
  text=text.replace(mmm,"");
  text=text.replace(regex,"");
  text=text.replace(rr,"");
  
 // text=text.replace(removehtag,"");
 // text=text.replace(removement,"");

  doc.setField("full_text", text);
  }
  else{
    doc.setField("full_text","");
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
