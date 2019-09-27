
// Script-as-app template.
function doGet(request) {
  var output = ContentService.createTextOutput();
  var group  = "Gratulation";
  
  if (request.parameter.group !== undefined) group=request.parameter.group;
  
  if (request.parameter.nofile!=1) { 
    output.setMimeType(ContentService.MimeType.ICAL);
    output.downloadAsFile('birthdays.ics');
  }
  var result = checkContacts(group) 
  if (result === false) result = "BEGIN:VCALENDAR\nPRODID:Calendar\nVERSION:2.0\nEND:VCALENDAR\n";
  
  var sum_template = "%n%";
  var desc_template = "%n% %a2%";
  
  if (request.parameter.stemplate !== undefined) sum_template=request.parameter.stemplate;
  if (request.parameter.dtemplate !== undefined) desc_template=request.parameter.stemplate;
  
  var now=new Date();
  var current_year = now.getFullYear();
  var year_range = 1;
  if (request.parameter.range !== undefined) {
    if ( parseInt(request.parameter.range) >= 1 && parseInt(request.parameter.range) < 10) year_range=parseInt(request.parameter.range);
  }
     
  output.setContent( checkContacts(group,sum_template,desc_template,current_year-1,current_year+year_range));
  
  return output;
}

function initContacts(toGroup,fromGroup){
  
  var contacts = null;
  var groups = ContactsApp.getContactGroups();
  for (var i = 0; i < groups.length; i++) {
  // Logger.log(groups[i].getName());
}
  if (fromGroup===undefined){
    var fGroup = ContactsApp.getContactGroup ('System Group: My Contacts');
    if (fGroup === null) return;
    contacts=fGroup.getContacts();
    // contacts=ContactsApp.getContacts();
  } else {
    var fGroup = ContactsApp.getContactGroup(fromGroup)
    if (fGroup === null) return;
    contacts=fGroup.getContacts();
  }
    
  var thegroup = ContactsApp.getContactGroup(toGroup);
  if (thegroup === null) {
    thegroup = ContactsApp.createContactGroup(toGroup);
  }
  
  for (var i=0; i<contacts.length; i++) {
    var dates = contacts[i].getDates();
    for (var j in dates) {
      if (dates[j].getLabel()=='BIRTHDAY') {
        thegroup.addContact(contacts[i])
        Logger.log (contacts[i].getFullName());
      }
    }
  }
}

function checkContacts(theGroup,sum_template,desc_template,fromyear,toyear) {
  var cal=ics();
  var group  = ContactsApp.getContactGroup(theGroup);
  if (group  === null) return cal.build();
  
  var contacts = group.getContacts();

  var now = new Date();
  
  if (sum_template === undefined) sum_template='%n%';
  if (desc_template === undefined) desc_template='%n% %a2%';
  
  for (var i=0; i<contacts.length; i++) {
    var dates = contacts[i].getDates();
    for (var j in dates) {
      if (dates[j].getLabel()=='BIRTHDAY') {
        var birthday = new Date (dates[j].getYear(),dates[j].getMonth().ordinal(),dates[j].getDay());
        
        if (fromyear === undefined) fromyear=parseInt(birthday.getFullYear());
        if (toyear   === undefined) toyear = fromyear+100;
        for (var y=fromyear; y<=toyear; y++){
          var entry=new Date(birthday);
          entry.setYear(y);
          var alter = y-parseInt(birthday.getFullYear());
          var alter1 = '';
          var alter2 = '';
          
          if (alter == 0) {
            alter1 = 'ist geboren.';
            alter2 = 'ist geboren.';          
          } else {
            if (birthday.getFullYear()==1900) {
              alter1 = 'hat Geburtstag';
              alter2 = 'hat Geburtstag';
            } else {
              alter1 = 'wird '+alter;
              alter2 = alter1+' Jahre alt.';                    
            }
          }
          
          var summary = sum_template;
          summary = summary.replace (/%n%/g,contacts[i].getFullName());
          summary = summary.replace (/%a%/g,alter);
          summary = summary.replace (/%a1%/g,alter1);
          summary = summary.replace (/%a2%/g,alter2);
          
          var description = desc_template;
          description = description.replace (/%n%/g,contacts[i].getFullName());
          description = description.replace (/%a%/g,alter);
          description = description.replace (/%a1%/g,alter1);
          description = description.replace (/%a2%/g,alter2);

          cal.addEvent(summary , description,'',entry,entry);
        }
      }
    }    
  } 
  return cal.build();
}

function doICS() {
  initContacts("Gratulation");
}
