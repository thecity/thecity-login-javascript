// **************************************************
// TheCity Login JavaScript Wrapper
// **************************************************
TheCityLogin = {
  defaults : { 'subdomain' : null,
               'city_login_div_id' : 'thecity_login',
               'error_url' : document.URL},
               
  _class_vars : {'login_form_url' : 'http://authentication.devthecity.org:3002/sessions/remote_form.json?callback=?',
                 'login_url' : 'http://authentication.devthecity.org:3002/sessions/remote_login.json'}, 
  
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
        
        self._add_meta_tag_csrf_token();
        self._add_subdomain_tag();
        self._add_error_url_tag();
        self._add_login_link_listener();
      }
    );    
  },

  _add_meta_tag_csrf_token : function() {
    var csrf_token = document.createElement('meta');
    csrf_token.name = "csrf-token";
    csrf_token.content = $('[name="authenticity_token"]').val()
    document.getElementsByTagName('head')[0].appendChild(csrf_token);
  },

  _add_subdomain_tag : function() {
    var self = this; // Need object scope at this point
    var subdomain_tag = document.createElement('input');
    subdomain_tag.setAttribute("type", "hidden");
    subdomain_tag.setAttribute("name", "tc_subdomain");
    subdomain_tag.setAttribute("value", self.defaults['subdomain'] );
    $("#city_login_link").after( subdomain_tag );
  },    

  _add_error_url_tag : function() {
    var self = this; // Need object scope at this point
    var error_url_tag = document.createElement('input');
    error_url_tag.setAttribute("type", "hidden");
    error_url_tag.setAttribute("name", "error_url");
    error_url_tag.setAttribute("value", self.defaults['error_url'] );
    $("#city_login_link").after( error_url_tag );
  },  

  _add_login_link_listener : function() {
    var self = this; // Need object scope at this point
    $("#city_login_link").click(function() {
      $("#city_login_link").parents('form').submit();

      // this is not working 100% yet.
      // var params = {
      //   'login' : $("#login").val(),
      //   'password' : $("#password").val(),
      //   'authenticity_token' : $('[name="authenticity_token"]').val()
      // }

      // $.post(self._class_vars['login_url'], params, function(response) {
      //   console.log(response);
      //   //window.location = response['redirect_to_url'];
      // }).fail(function(jqXHR, textStatus, errorThrown) { 
      //   // var errors_messages = $.parseJSON(jqXHR.responseText);
      //   // alert(errors_messages['errors'][0]);
      //   console.log("FAIL");
      //   console.log(jqXHR);
      //   console.log(textStatus);
      //   console.log(errorThrown);
      //   console.log("FAIL");
      // });

    });
  }
  
}

