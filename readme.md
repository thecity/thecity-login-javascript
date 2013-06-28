= The City Login JavaScript Plugin

A JavaScript plugin that allows users to place a login form on their website.


== Installation

Add the 2 JavaScript files to your project:
* jquery-1.9.1.min.js
* thecity_login.js


== Setup

Add the JavaScript files specified above to the header section.  You will also need to call the start function in a jQuery ready function.  One of the default requirements is your church's City subdomain.  In the example below I use "livingstones", which goes to https://livingstones.onthecity.org.

    ...
    <head>
      <script src="./javascripts/jquery-1.9.1.min.js"></script>
      <script src="./javascripts/thecity_login.js"></script>

      $(function() {  
        TheCityLogin.start({'subdomain' : 'livingstones'});
      });      

    </head>
    ...


Add a div with an ID of *thecity_login*.  That ID can be changed if you prefer something else.
    
    ...
    <div id="thecity_login"></div>
    ...


To change the ID to bind to set it in the start function.

    ...
    $(function() {  
      TheCityLogin.start({'subdomain' : 'livingstones', 'city_login_div_id' : 'my_login_form'});
    });  
    ...

    ...
    <div id="my_login_form"></div>
    ...

== Config Options
  
**subdomain** (required)  
Your church's subdomain for connecting to The City.  For example if you login to The City using "https://livingstones.onthecity.org" your church's subdomain would be "livingstones".

**city_login_div_id**  
The ID of the DIV to bind to.  The default the ID will be "thecity_login".

**display_form_loading_message**  
This is the message that is displayed if the form is still trying to load on your site.  For the most part users should never see it but
just in case of network latency it will be displayed.  The default message is "Loading login form....".

**show_remember_me**  
The Remember Me checkbox will remember the user if they return to any URL on The City - assuming they have not logged out.  
The default option is true (show the checkbox).

**use_placeholder_text**  
The text for "Login" and "Password" are labels shown to the left of the text field by default.  This option will remove those labels 
and use the placeholder attribute where the "Login" and "Password" appear as placeholders in the text field.


== Styling

thecity_login.css is provide as an example of what to update for styling.


== Contributing

If you want to help out fork the project and send me a pull request.  

You can also send me feature requests by creating a ticket  
(https://github.com/thecity/thecity-login-javascript/issues)


== References

Here are the links to the plugins used.  The versions used for this project are included in the *javascripts* directory.

jQuery 1.9.1
http://jquery.com/

jQuery Base64 plugin
https://github.com/carlo/jquery-base64


== License

This plugin is released under the MIT license. Please contact weshays
(http://github.com/weshays) for any questions.
