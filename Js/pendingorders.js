console.log("cp3.js working fine");

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
      $(document).on("click","button",function(e){
        console.log(this.id);
        e.preventDefault();
        var str = this.id;
        console.log(typeof str);
        var pen_id = str + 'Q';
        var status = str + 'R';
        var date_of_delivery_id = str + 'S';
        console.log(pen_id)
        var cid = str+'P';
        var qty = $('#'+cid).val();
        var oqty = $('#'+cid).attr("oqty");
        var date_of_delivery = $('#'+date_of_delivery_id).val();
        console.log(oqty);
        var pen_qty = parseInt(oqty -qty);
        console.log(pen_qty);
        console.log(qty>oqty);
        qty = parseInt(qty);
        if(qty>oqty){
          window.alert("delivered quantity should be less tha total quantity")
        }
        if(qty<=oqty){
       $('#'+pen_id).html(pen_qty);
        }
        if(pen_qty==0){
          $('#'+status).html("DELIVERED");
        }
        else if(pen_qty>0){
          $('#'+status).html("PARTIALLY_PENDING");
        }

         
        console.log(str);
        console.log(qty);
        $.ajax({
          type: "POST",
          url: '/update' ,
          contentType: "application/json; charset=utf-8" ,
          processData: false,
            data:  JSON.stringify({str : str, qty : qty,date_of_delivery:date_of_delivery}),
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


                    



