console.log("cp3.js working fine");
// $(document).ready(function(e){
//     console.log("jqury loaded");
    $(document).ready(function(){
        $(document).on("click","button",function(e){
          console.log(this.id);
          e.preventDefault();
          var str = this.id;

          console.log(typeof str);
          var cid = str+'P';
          var qty = $('#'+cid).val();
          var did = $('#'+cid).attr("did");
          console.log(did);
          var oqty = $('#'+cid).attr("oqty");
          console.log(oqty)
          console.log(qty)
          $.ajax({
              type: "POST",
              url: '/error_update' ,
              contentType: 'application/json',
              processData: false,
              data: JSON.stringify({data : str,
                                    qty : qty,
                                    did : did,
                                    oqty : oqty
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