// Edit the variables here as you see fit
var SCORE_THRESHOLD = 60;
var TARGET_EMAIL = 'your@email.com';

var TARGET_URL = 'https://www.reddit.com/r/FreeGameFindings/hot/.json';
var FILENAME = 'FGF_PARSER_LOG';

function main()
{
  var response = UrlFetchApp.fetch(TARGET_URL);
  var data = JSON.parse(response.getContentText());
  var posts = data['data']['children'];
  var sheet = getLogSheet();
  var known_posts = sheet.getDataRange().getDisplayValues();
  var merged = [].concat.apply([], known_posts);
  var new_posts = []
  
  // Loop across all posts
  for(var post = 0, size = posts.length; post < size ; post++)
  {
    // Discard posts with hidden score
    if (posts[post]['data']['hide_score'] == false)
    {
      // Keep only popular posts
      if (posts[post]['data']['score'] > SCORE_THRESHOLD)
      {
        // Discard if we have already sent a notification for it
        if(merged.indexOf(posts[post]['data']['created_utc'].toString()) == -1)
        {
          sheet.appendRow([posts[post]['data']['created_utc']]);
          new_posts.push(post);
        }
      }
    }   
  }
  
  // Send mail if one or more new trendy posts detected
  if(new_posts.length > 0)
  {
    var mail_message = "<p> There is new hot stuff on FGF ! The following post(s) got more than " + SCORE_THRESHOLD.toString() + " upvotes: </p>";
    
    for(var post = 0, size = new_posts.length; post < size ; post++)
    {
      mail_message = mail_message + "<p><a href='" + posts[new_posts[post]]['data']['url'] + "'>" + posts[new_posts[post]]['data']['title'] + "</a></p>"; 
    }
    
    var emailTo = TARGET_EMAIL;
    var subject = "New popular FGF activity !";
    var options = {}
    options.htmlBody = mail_message;
    MailApp.sendEmail(emailTo, subject, '', options);
  }
}

function getLogSheet()
{
  var it = DriveApp.getFilesByName(FILENAME);
  
  if( !it.hasNext())
  {
    var ss = SpreadsheetApp.create(FILENAME);
  }
  else
  {
    var file = it.next();
    var ss = SpreadsheetApp.open(file);
  }
  
  var sheet = ss.getSheets()[0];
  return sheet
  
}