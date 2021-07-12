
function carregaFrameEdi(token, idImovel) {
	includeHTML();
	getEDiData('https://api.iconatus.com.br:9010/edis/details?chave=' + token + '&cod_imovel=' + idImovel, carregaDadosPois);
}

function carregaDadosPois(data) {
	
	// formatacao de decimais
	var frmt = new Intl.NumberFormat('pt-BR', {style: 'decimal'});
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_ciclo_" + i + "_nome").innerHTML = data.Ciclovias[i].Nome;
		document.getElementById("edi_ciclo_" + i + "_dist").innerHTML = frmt.format(data.Ciclovias[i].Distancia) + 'm';
		document.getElementById("edi_ciclo_" + i + "_ext").innerHTML = frmt.format(data.Ciclovias[i].Extensao) + 'm';
		document.getElementById("edi_ciclo_" + i + "_data").innerHTML = data.Ciclovias[i].Data_Inauguracao.substring(0, 10);
		document.getElementById("edi_ciclo_" + i + "_tipo").innerHTML = data.Ciclovias[i].Tipo;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_clube_" + i + "_nome").innerHTML = data.Clubes[i].Nome;
		document.getElementById("edi_clube_" + i + "_dist").innerHTML = frmt.format(data.Clubes[i].Distancia) + 'm';
		document.getElementById("edi_clube_" + i + "_end").innerHTML = data.Clubes[i].Endereco;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_escola_" + i + "_nome").innerHTML = data.Escolas[i].Nome;
		document.getElementById("edi_escola_" + i + "_dist").innerHTML = frmt.format(data.Escolas[i].Distancia) + 'm';
		document.getElementById("edi_escola_" + i + "_enem").innerHTML = data.Escolas[i].ENEM;
		document.getElementById("edi_escola_" + i + "_end").innerHTML = data.Escolas[i].Endereco;
		document.getElementById("edi_escola_" + i + "_tel").innerHTML = formataTelefone(data.Escolas[i].Contato);
		document.getElementById("edi_escola_" + i + "_email").innerHTML = data.Escolas[i].Email;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_feira_" + i + "_nome").innerHTML = data.Feiras[i].Nome;
		document.getElementById("edi_feira_" + i + "_dist").innerHTML = frmt.format(data.Feiras[i].Distancia) + 'm';
		document.getElementById("edi_feira_" + i + "_end").innerHTML = data.Feiras[i].Endereco;
		document.getElementById("edi_feira_" + i + "_dia").innerHTML = data.Feiras[i].Dia_Feira;
		document.getElementById("edi_feira_" + i + "_nro").innerHTML = data.Feiras[i].Num_Feirantes;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_hosp_" + i + "_nome").innerHTML = data.Hospitais[i].Nome;
		document.getElementById("edi_hosp_" + i + "_dist").innerHTML = frmt.format(data.Hospitais[i].Distancia) + 'm';
		document.getElementById("edi_hosp_" + i + "_end").innerHTML = data.Hospitais[i].Endereco;
		document.getElementById("edi_hosp_" + i + "_tel").innerHTML = formataTelefone(data.Hospitais[i].Contato);
		document.getElementById("edi_hosp_" + i + "_cep").innerHTML = formataCep(data.Hospitais[i].CEP);
		document.getElementById("edi_hosp_" + i + "_tipo").innerHTML = data.Hospitais[i].Tipo;
		document.getElementById("edi_hosp_" + i + "_classe").innerHTML = data.Hospitais[i].Classe;
		document.getElementById("edi_hosp_" + i + "_leitos").innerHTML = data.Hospitais[i].Leitos;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_metro_" + i + "_nome").innerHTML = data.Metros[i].Nome;
		document.getElementById("edi_metro_" + i + "_dist").innerHTML = frmt.format(data.Metros[i].Distancia) + 'm';
		document.getElementById("edi_metro_" + i + "_linha").innerHTML = data.Metros[i].Linha;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_bus_" + i + "_nome").innerHTML = data.Onibus[i].Nome;
		document.getElementById("edi_bus_" + i + "_dist").innerHTML = frmt.format(data.Onibus[i].Distancia) + 'm';
		document.getElementById("edi_bus_" + i + "_ref").innerHTML = data.Onibus[i].Referencia;
		document.getElementById("edi_bus_" + i + "_end").innerHTML = data.Onibus[i].Endereco;
	}
	
	for (var i = 0; i < 4; i++) {
		document.getElementById("edi_parque_" + i + "_nome").innerHTML = data.Parques[i].Nome;
		document.getElementById("edi_parque_" + i + "_dist").innerHTML = frmt.format(data.Parques[i].Distancia) + 'm';
		document.getElementById("edi_parque_" + i + "_area").innerHTML = frmt.format(data.Parques[i].Area) + 'm²';
	}
	
	if(data.Parameters.Show == true)
		document.getElementById("p_Powered_iConatus").style.visibility = "visible";
		else		
		document.getElementById("p_Powered_iConatus").style.visibility = "hidden";
}

function formataTelefone(t) {
	return t.substring(0, t.length-4) + '-' + t.substring(t.length-4, t.length);
}

function formataCep(c) {
	return c.substring(0, c.length-3) + '-' + c.substring(c.length-3, c.length);
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("iconatus-edis-pois");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("iconatus-edis-pois");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

function getEDiData(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', path);
	
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {	
			
			if (httpRequest.status === 200) {
				document.getElementById("span_container_principal").style.visibility = "visible";
				document.getElementById("span_erro_request").style.visibility = "hidden";				
				var data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
			else {
				document.getElementById("span_container_principal").style.visibility = "hidden";
				document.getElementById("span_erro_request").style.visibility = "visible";
				
				if(httpRequest.status === 204){ //Não encontrou					
					document.getElementById('divPOIs').innerHTML = "";
					return;
				}

				if (httpRequest.status === 401) {
					document.getElementById("span_msg_erro_req").innerHTML = "<p>Usuário não autorizado</p>"
				}
			}
		}
	};
	
	//httpRequest.open('GET', path);
	httpRequest.send(); 
}

function fecheme(mydiv){
    var div = document.getElementById(mydiv);
    var blocoinvisivel = document.getElementById('invisiblebox');
    blocoinvisivel.style.left = "100%";
    
    div.style.right     = "1.5vw";
    div.style.top       = "-100vh";
    div.style.position  = "absolute";
    div.style.opacity   = "0";
}

function show(mydiv){
    var div = document.getElementById(mydiv);
    var blocoinvisivel = document.getElementById('invisiblebox');
    
    blocoinvisivel.style.left = "0";
    div.style.right     = "1.5vw";
    div.style.top       = "1.5vh";
    div.style.opacity   = "1";
    div.style.position  = "fixed";
}