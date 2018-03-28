
var companies = new Array();

/*  Check the company name,if it's wrong,alert the warning.  */
function Check_Company_Name(Company_Name){
	var reg = /^[0-9a-zA-Z]{0,15}$/;
	if (!reg.test(Company_Name)) {
		document.getElementById("Company_Name_span").innerHTML = "You can only fill in the letters or figures,no more than 15";
		return 0;
	}
	return 1;
}

/*  Check the founded year,if it's wrong,alert the warning.  */
function Check_Founded_Year(Founded_Year){
	var reg = /^[0-9]{4}$/ ;
	if (!reg.test(Founded_Year) && Founded_Year != "") {
		document.getElementById("Founded_Year_span").innerHTML = "You can only fill in four figures since 1970.";
		return 0;
	}
	return 1;
}

/*  Check the founded name,if it's wrong,alert the warning.  */
function Check_Founded_Name(Founded_Name){
	var reg = /^[0-9a-zA-Z]{0,15}$/;
	if (!reg.test(Founded_Name)) {
		document.getElementById("Founded_Name_span").innerHTML = "You can only fill in the letters,no more than 15";
		return 0;
	}
	return 1;
}

/*SelectionSort: display the information in alphabetical order.*/
function SelectionSort(Company_Table) {
  var SelectionSort_length = Company_Table.length;
  for (var i = 0; i < SelectionSort_length; i++) { 
    var min = Company_Table[i].name; 
    var index = i; 
    for (var j = i + 1; j < SelectionSort_length; j++) { 
      if (Company_Table[j].name < min) {
        min = Company_Table[j].name;
        index = j;
      }
    }
    if (index != i) { 
      var temp = Company_Table[i];
      Company_Table[i] = Company_Table[index];
      Company_Table[index] = temp;
    }
    
  }
  return Company_Table;
}

/*Display the result of the search.*/
function Create_Company(Company_Table){
	SelectionSort(Company_Table);

	//Create the title of the table.
	document.getElementById("Companies_Table").innerHTML = "";
	var Companies_Title = document.createElement("tr");
	Companies_Title.innerHTML = "<th>Logo</th><th>Company Name</th><th>Officail Website</th><th>Founded Date</th><th>Founder(s)</th><th>Discription</th>";
	document.getElementById("Companies_Table").appendChild(Companies_Title); 
	Companies_Title.style.background = "#6C6D69";

	//Create the content of the table.
	for (var j=0; j<Company_Table.length; j++){
		var Companies1 = document.createElement("tr");
		var Companies1_Logo = document.createElement("td");
		var Companies1_Company_Name = document.createElement("td");
		var Companies1_Official_Website = document.createElement("td");
		var Companies1_Founded_Date = document.createElement("td");
		var Companies1_Founders = document.createElement("td");
		var Companies1_Description = document.createElement("td");
		Companies1_Logo.innerHTML='<a target="_blank" href="'+Company_Table[j].website+'"> <img src="../images/'+Company_Table[j].logo+'">';
		
		Companies1_Company_Name.innerHTML = Company_Table[j].name;
		Companies1_Official_Website.innerHTML='<a target="_blank" href="'+Company_Table[j].website+'">'+Company_Table[j].website+"</a>";
		// Companies1_Official_Website.innerHTML = 
		// "<a target="_blank" href="'https://www.' + Company_Table[j].name + '.com'">'www.' + Company_Table[j].name + '.com'</a>";
		Companies1_Founded_Date.innerHTML = 
		Company_Table[j].founded_date.substring(0,4) + '.' + Company_Table[j].founded_date.substring(4,6) + '.' + Company_Table[j].founded_date.substring(6,8);
		Companies1_Founders.innerHTML = "";
				for (var i = 0; i < Company_Table[j].founders.length; i++) {
						Company_Table[j].founders[i].first_name + " " + Company_Table[j].founders[i].last_name + ",";
					}
		Companies1_Founders.innerHTML += Company_Table[j].founders[Company_Table[j].founders.length-1].first_name+ " " + Company_Table[j].founders[Company_Table[j].founders.length-1].last_name;
		Companies1_Description.innerHTML = Company_Table[j].description;
		Companies1.appendChild(Companies1_Logo);
		Companies1.appendChild(Companies1_Company_Name);
		Companies1.appendChild(Companies1_Official_Website);
		Companies1.appendChild(Companies1_Founded_Date);
		Companies1.appendChild(Companies1_Founders);
		Companies1.appendChild(Companies1_Description);
		document.getElementById("Companies_Table").appendChild(Companies1);

		//Make different rows of the table get different color.
		var Table_Color = Companies1.style.background.value;
		if (j%2 == 0) {
			Companies1.style.background = "#C7CBD1";
		}
		else{
			Companies1.style.background = "#0078D7";
		}
		// if (Table_Color == "#0078D7") {
		// 	Companies1.style.background = "#C7CBD1";
		// 	break;
		// }
		// if (Table_Color == "#C7CBD1") {
		// 	Companies1.style.background = "#0078D7";
		// 	break;
		// }

		
	}

}

//Match the information with data in database.
function Match_Company(Company_Name,Founded_Year,Founded_Name){
	var Company_Table = new Array();

	//Display all information when there is no condition.
	if(Company_Name=="" && Founded_Year=="" && Founded_Name=="")

	{
		Company_Table=companies;
		Create_Company(Company_Table);
		return;
	}
	//Display the information about the result of match.
	for(var i=0;i<companies.length;i++)
	{	
		
		var a = companies[i].name.toLowerCase().match(Company_Name.toLowerCase());
		var b = companies[i].founded_date.match(Founded_Year);
		var fullName = "";
		for(j=0;j<companies[i].founders.length;j++)
		{
			fullName += companies[i].founders[j].first_name + " " + companies[i].founders[j].last_name + " ";
		}
		var c = fullName.toLowerCase().match(Founded_Name.toLowerCase());
		//if one of the variables equals to 'null',then this company is not what we need  
		if(a && b && c)
		{
		Company_Table.push(companies[i]);
		}
	}
		Create_Company(Company_Table);
		return;

}

//Parse data by ajax.
function loadXMLDoc(Company_Name,Founded_Year,Founded_Name)
{
  var xmlhttp;
  var txt,x,i;
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari browser.
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 browser.
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      companies = JSON.parse(xmlhttp.responseText);
      Match_Company(Company_Name,Founded_Year,Founded_Name);
		}
	}
	xmlhttp.open("GET","../companies.json",true);
	xmlhttp.send();

}    

//When the button is clicked,execute the code.
document.getElementById("Search_button").onclick = function Search(){
	document.getElementById("Companies_Table").style.display = "";
	var Company_Name = document.getElementById("Company_Name_input1").value;
	var Founded_Year = document.getElementById("Founded_Year_input1").value;
	var Founded_Name = document.getElementById("Founded_Name_input1").value;
	Check_Company_Name(Company_Name);
	Check_Founded_Year(Founded_Year);
    Check_Founded_Name(Founded_Name);
    loadXMLDoc(Company_Name,Founded_Year,Founded_Name);
    
}
document.getElementById("Clear_button").onclick = function Clear(){
	document.getElementById("Company_Name_input1").value = "";
	var Founded_Year = "";
	document.getElementById("Founded_Year_input1").value = Founded_Year;
	document.getElementById("Founded_Name_input1").value = "";
	document.getElementById("Company_Name_span").innerHTML = "";
	document.getElementById("Founded_Year_span").innerHTML = "";
	document.getElementById("Founded_Name_span").innerHTML = "";
	document.getElementById("Companies_Table").style.display = "none";

}

