console.log("cp3.js working fine");

    $(document).ready(function(){
      $(document).on("click","button",function(e){
        console.log(this.id);
        e.preventDefault();
        var str = this.id;
        console.log(typeof str);
        var cid = str+'P';
        var qty = $('#'+cid).val();
        console.log(str)
        console.log(qty)
        $.ajax({
          type: "POST",
          url: '/update' ,
          contentType: "application/json; charset=utf-8" ,
          processData: false,
            data:  JSON.stringify({str : str, qty : qty}),
            success: function(data) {
              console.log("Successfully saved the matched beans to the user.");
          }
      }).done(function ( ) {
          console.log("OK");
      }).fail(function ( jqXHR, textStatus, errorThrown ) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        });
      });
    });


                    
$("#search").keyup(function () {
  var value = this.value.toLowerCase().trim();

  $("table tr").each(function (index) {
      if (!index) return;
      $(this).find("td").each(function () {
          var id = $(this).text().toLowerCase().trim();
          var not_found = (id.indexOf(value) == -1);
          $(this).closest('tr').toggle(!not_found);
          return not_found;
      });
  });
});


