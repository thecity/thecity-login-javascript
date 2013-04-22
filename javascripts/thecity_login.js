// **************************************************
// TheCity Login JavaScript Wrapper
// **************************************************
TheCityLogin = {
  defaults : { 'subdomain' : null,
               'city_login_div_id' : 'thecity_login'},
               
  _class_vars : {'login_form_url' : 'http://authentication.onthecity.org/sessions/remote_form.json?callback=?',
                 'login_url' : 'http://authentication.onthecity.org/sessions/remote_login.json'}, 
  
  start : function(options) {
    if(options !== undefined) { 
      $.extend(this.defaults, options)  
    }
    
    if(this.defaults['subdomain'] == null) {
      alert('Subdomain must be set');
      return;
    }

    if(this.defaults['city_login_div_id'] == null || this.defaults['city_login_div_id'] == '') {
      alert('Div ID not specified');
      return;
    }    
    
    var self = this; // Need object scope at this point
    $.getJSON(this._class_vars['login_form_url'],
      function(response){        
        var form = response['form'];
        form = form.replace(/[\r\n]/g, '');
        form = $.base64.decode(form);
        $('#'+self.defaults['city_login_div_id']).html(form);
        self._add_login_link_listener();
      }
    );    
  },
  

  _add_login_link_listener : function() {
    var self = this; // Need object scope at this point
    $("#city_login_link").click(function() {
      var params = {
        'login' : $("#login").val(),
        'password' : $("#password").val(),
        'authenticity_token' : $('[name="authenticity_token"]').val()
      }

      $.post(self._class_vars['login_url'], params, function(response) {
        console.log(data);
        window.location = response['redirect_to_url'];
      }).fail(function(jqXHR, textStatus, errorThrown) { 
        // var errors_messages = $.parseJSON(jqXHR.responseText);
        // alert(errors_messages['errors'][0]);
        console.log("FAIL");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log("FAIL");
      });

    });
  }
  
}
