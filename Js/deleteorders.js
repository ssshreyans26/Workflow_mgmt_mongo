console.log("cp3.js working fine");
// $(document).ready(function(e){
//     console.log("jqury loaded");
    $(document).ready(function(){
        $(document).on("click","button",function(e){
          console.log(this.id);
          e.preventDefault();
          var str = this.id;
          // console.log(details);
          $.ajax({
              type: "POST",
              url: '/delete_update' ,
              contentType: 'application/json',
              processData: false,
              data: JSON.stringify({data : str
                                    }),
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

      $(document).ready(function(){
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
      });