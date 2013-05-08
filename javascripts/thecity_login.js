// **************************************************
// TheCity Login JavaScript Wrapper
// **************************************************
TheCityLogin = {
  defaults : { 'subdomain' : null,
               'city_login_div_id' : 'thecity_login'},
               
  _class_vars : {'login_form_url' : 'http://authentication.devthecity.org/sessions/remote_form.json?callback=?',
                 'login_url' : 'http://authentication.devthecity.org/sessions/remote_login.json'}, 
  
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

  _add_login_link_listener : function() {
    //var self = this; // Need object scope at this point
    $("#city_login_link").click(function() {
      $("#city_login_link").parents('form').submit();
    });
  }
  
}
