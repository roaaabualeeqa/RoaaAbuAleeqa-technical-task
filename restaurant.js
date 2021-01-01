 display_all_orders();

// object constructor function
function Orders(order, quantity) 
{
  this.order_type = order;
  this.order_quantity = quantity;
}


// function to store the selected order on the local storage 
function get_selected_order()
{
	var quantity_validation = validate_quantity_input(); 
	
	if(quantity_validation) //chack if the quantity have a correct input
	{
		var num_of_orders;
		var total_quantity;
		var order = $( "#order option:selected" ).text();
		var quantity1 = $( "#quantity" ).val();
		var quantity = parseInt(quantity1)
		var new_order = new Orders(order,quantity); //create an object

		//ckeck if there is no orders
		if (localStorage.getItem("num_of_orders") === null) 
		{
			localStorage.setItem('num_of_orders', 0);
			num_of_orders = 0;
		}
		
		//increment num_of_orders by 1
		num_of_orders = parseInt(localStorage.getItem('num_of_orders')) + 1;
		localStorage.setItem('num_of_orders', num_of_orders);
		var order_index = num_of_orders;


		// Put the object into storage
		localStorage.setItem(order_index, JSON.stringify(new_order));

		
		//ckeck if there is no total quantity
		if (localStorage.getItem("total_quantity") === null) 
		{
			localStorage.setItem('total_quantity', 0);
			total_quantity = 0;
		}

		//update the total_quantity
		total_quantity = parseInt(localStorage.getItem('total_quantity')) + parseInt(quantity);
		localStorage.setItem('total_quantity', total_quantity);

		//display the new order in the summery table
		display_new_order(order, quantity,order_index, total_quantity);	
	}
	


}

//function to display all user orders
function display_all_orders()
{

	//display the orders summary to the user
	var get_num_of_orders = localStorage.getItem("num_of_orders");
	if (get_num_of_orders >= 1) //implement the table
	{
		
		create_table_header();
	    create_table_body();

	   	//fill the table body with the orders
	   	for(var i=1; i<=get_num_of_orders; i++)
	    {
	    	var retrieved_order = localStorage.getItem(i);
	    	var retrieved_order_parse = JSON.parse(retrieved_order);

	    	console.log(retrieved_order_parse);
	    	
	    	var retrieved_order_type = retrieved_order_parse.order_type;
	    	var retrieved_quantity = retrieved_order_parse.order_quantity;

	    	var table_row = document.createElement("TR");
	    	table_row.setAttribute("id", "tr_"+i);
	    	document.getElementById("table_body").appendChild(table_row);

	    	var td_order = document.createElement("TD");
	    	var td_text_order = document.createTextNode(retrieved_order_type);
	        td_order.appendChild(td_text_order);
	        document.getElementById("tr_"+i).appendChild(td_order);

	    	var td_quantity = document.createElement("TD");
	    	var td_text_quantity = document.createTextNode(retrieved_quantity);
	    	td_quantity.appendChild(td_text_quantity);
	    	document.getElementById("tr_"+i).appendChild(td_quantity);


			
	    }

    
	    create_table_footer();
	    table_design();

	    
	}

}


//display new order on the summary table
function display_new_order(order, quantity,order_index, total_quantity)
{
	var get_num_of_orders = localStorage.getItem("num_of_orders");
	if (get_num_of_orders == 1) //implement the table
	{
		create_table_header();
		create_table_body();
	}

	var table_row = document.createElement("TR");
	table_row.setAttribute("id", "tr_"+order_index);
	document.getElementById("table_body").appendChild(table_row);

	var td_order = document.createElement("TD");
	var td_text_order = document.createTextNode(order);
	td_order.appendChild(td_text_order);
	document.getElementById("tr_"+order_index).appendChild(td_order);

	var td_quantity = document.createElement("TD");
	var td_text_quantity = document.createTextNode(quantity);
	td_quantity.appendChild(td_text_quantity);
	document.getElementById("tr_"+order_index).appendChild(td_quantity);


	if (get_num_of_orders == 1)
	{
		create_table_footer();
	}

	$("#total_quantity_td").text(total_quantity); //update the total quantity value on the table

	table_design();	
}

//function to design the summary table
function table_design()
{
    $('#summary_table').css('border', '#000 solid 1px');
    $('#summary_table th').css('border', '#000 solid 1px');
    $('#summary_table tr').css('border', '#000 solid 1px');
    $('#summary_table td').css('border', '#000 solid 1px');
    $('#summary_table th').css('padding-right', '10px');
    $('#summary_table th').css('padding-left', '10px');
    $('#summary_table td').css('padding-right', '10px');
    $('#summary_table td').css('padding-left', '10px');
}

//implement the table header
function create_table_header()
{
	//create the table header
	var table = document.createElement("TABLE");
	table.setAttribute("id", "summary_table");
	document.getElementById("orders_summary").appendChild(table);

	var table_header = document.createElement("thead");
    table_header.setAttribute("id", "table_header");
    document.getElementById("summary_table").appendChild(table_header);

	var tr = document.createElement("TR");
    tr.setAttribute("id", "header_row");
    document.getElementById("table_header").appendChild(tr);

    var th_order = document.createElement("TH");
    var th_text_order = document.createTextNode("Order");
    th_order.appendChild(th_text_order);
    document.getElementById("header_row").appendChild(th_order);

    var th_quantity = document.createElement("TH");
    var th_text_quantity = document.createTextNode("Quantity");
    th_quantity.appendChild(th_text_quantity);
    document.getElementById("header_row").appendChild(th_quantity);
}

//implement the table footer
function create_table_footer()
{
	var table_footer = document.createElement("tfoot");
    table_footer.setAttribute("id", "table_footer");
    document.getElementById("summary_table").appendChild(table_footer);

    var table_row = document.createElement("TR");
    table_row.setAttribute("id", "footer_row");
    document.getElementById("table_footer").appendChild(table_row);

    var td_total = document.createElement("TD");
    var td_text_total = document.createTextNode("Total Quantity");
    td_total.appendChild(td_text_total);
    document.getElementById("footer_row").appendChild(td_total);

    //retrieve the total qyantity from storage
    var total_quantity = localStorage.getItem("total_quantity");
    console.log(total_quantity);

    var td_total_val = document.createElement("TD");
    td_total_val.setAttribute("id", "total_quantity_td");
    var td_text_total_val = document.createTextNode(total_quantity);
    td_total_val.appendChild(td_text_total_val);
    document.getElementById("footer_row").appendChild(td_total_val);
}


//implement the table body
function create_table_body()
{
	var table_header = document.createElement("tbody");
	table_header.setAttribute("id", "table_body");
	document.getElementById("summary_table").appendChild(table_header);
}

//valitate the quantity input
function validate_quantity_input()
{
	var quantity = $( "#quantity" ).val();
	var quantity_parse = parseInt(quantity);
	if(quantity_parse < 1 )
	{
		$("#error_msg").text("*The quantity must be greater than 0");
		document.getElementById("quantity").focus();
		return 0;
	}
	else if(quantity == "")
	{
		$("#error_msg").text("*Enter the quantity please");
		document.getElementById("quantity").focus();
		return 0;
	}
	else
	{
		$("#error_msg").text("");
		return 1;
	}
}