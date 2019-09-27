

var OP_FILTERS = new Array();

OP_FILTERS[0] = { GMAIL_FILTER: "label: Kurzlebig/Werbung -is:starred older_than:10d",
                  OP: "PURGE"
                };

OP_FILTERS[1] = { GMAIL_FILTER: "label: Kurzlebig/Wetterwarnungen -is:starred older_than:10d",
                  OP: "PURGE"
                };

OP_FILTERS[2] = { GMAIL_FILTER: "label:infrastruktur -{Verbindungsübersicht} -is:starred older_than:10d",
                  OPERATION_AFTER: "10",
                  OP: "PURGE"
                };

OP_FILTERS[3] = { GMAIL_FILTER: "label:jagd-bjvdigital from:(admin@bjvdigital.de) subject:(\"Neues Revier angemeldet:\" | \"Gesammelte Meldungen\" | \"BJVdigital: Schwarzwild\" | \"Probleme beim Mailer-Lauf\" | \"Registrierungsbestätigung\" | \"Kontoinformationen\" ) -is:starred older_than:14d",
                  OP: "PURGE"
                };

OP_FILTERS[4] = { GMAIL_FILTER: "label: Kurzlebig -is:starred older_than:7d",
                  OP: "PURGE"
                };

OP_FILTERS[5] = { GMAIL_FILTER: "label: jagd-geocaching -is:starred older_than:7d",
                  OP: "PURGE"
                };

OP_FILTERS[6] = { GMAIL_FILTER: "in:inbox has:userlabels -is:starred older_than:3d",
                  OP: "ARCHIVE"
                };

/*
  For details, refer http://labnol.org/?p=27605


 
 



























*/

function Intialize() {
  return;
}

function Install() {

  ScriptApp.newTrigger("operateGmail")
           .timeBased()
           .at(new Date((new Date()).getTime() + 1000*60*2))
           .create();
  
  ScriptApp.newTrigger("operateGmail")
           .timeBased().everyDays(1).create();

}

function Uninstall() {
  
  var triggers = ScriptApp.getScriptTriggers();
  for (var i=0; i<triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }  
}

/*           
function purgeGmail() {
    for (var i = 0; i < PURGE_LABELS.length; i++) {
        Logger.log(PURGE_LABELS[i].GMAIL_LABEL);
        purgeGmailLabel ( PURGE_LABELS[i] );
    }               
}                  
                   
function purgeGmailLabel( theLabel ) {
  
  var age = new Date();  
  age.setDate(age.getDate() - theLabel.PURGE_AFTER);    
  
  var purge  = Utilities.formatDate(age, Session.getScriptTimeZone(), "yyyy-MM-dd");
  var search = "label:" + theLabel.GMAIL_LABEL + " before:" + purge;
  
  try {
    
    var threads = GmailApp.search(search, 0, 100);
    
    if (threads.length == 100) {
      ScriptApp.newTrigger("purgeGmail")
               .timeBased()
               .at(new Date((new Date()).getTime() + 1000*60*10))
               .create();
    }
    
    for (var i=0; i<threads.length; i++) {
      var messages = GmailApp.getMessagesForThread(threads[i]);
      for (var j=0; j<messages.length; j++) {
        var email = messages[j];       
        if (email.getDate() < age) {
          if (! email.isStarred()) email.moveToTrash();
        }
      }
    }
    
  } catch (e) {}
}

*/


function operateGmail() {
    for (var i = 0; i < OP_FILTERS.length; i++) {
        Logger.log(OP_FILTERS[i].GMAIL_FILTER);
        operateGmailFilter ( OP_FILTERS[i] );
    }               
}

function operateGmailFilter( theFilter ) {
    
  var search = theFilter.GMAIL_FILTER;

  try {
   
    var threads = GmailApp.search(search, 0, 100);
    
    if (threads.length == 100) {
      ScriptApp.newTrigger("operateGmail")
               .timeBased()
               .at(new Date((new Date()).getTime() + 1000*60*10))
               .create();
    }
    
    for (var i=0; i<threads.length; i++) {
      if (theFilter.OP=="ARCHIVE") {
          if (threads[i].getLabels().length > 0)
              threads[i].moveToArchive();
      }
      if (theFilter.OP=="PURGE") {
        var messages = GmailApp.getMessagesForThread(threads[i]);
        for (var j=0; j<messages.length; j++) {
          var email = messages[j];       
          email.moveToTrash();
        }
      }
    }
    
  } catch (e) {}
}