function buscarClima() {
    var cidade = document.getElementById('cidadeInput').value;
    var apiKey = '63411cca81efbc59e28eb156cd8dca80';
    var urlAtual = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=' + apiKey + '&units=metric';
    var urlPrevisao = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cidade + '&appid=' + apiKey + '&units=metric';
    
    fetch(urlAtual)
    .then(response => response.json())
    .then(data => {
        exibirClimaAtual(data);
    });
    
    fetch(urlPrevisao)
    .then(response => response.json())
    .then(data => {
        exibirPrevisao(data);
    });
    }
    
    function exibirClimaAtual(data) {
    var climaAtualDiv = document.getElementById('climaAtual');
    climaAtualDiv.innerHTML = '';
    
    var cidadeNome = document.createElement('h2');
    cidadeNome.textContent = data.name + ', ' + data.sys.country;
    climaAtualDiv.appendChild(cidadeNome);
    
    var temperatura = document.createElement('p');
    temperatura.textContent = 'Temperatura: ' + data.main.temp + ' °C';
    climaAtualDiv.appendChild(temperatura);
    
    var descricao = document.createElement('p');
    descricao.textContent = 'Descrição: ' + data.weather[0].description;
    climaAtualDiv.appendChild(descricao);
    }
    
    function exibirPrevisao(data) {
    var previsaoDiv = document.getElementById('previsao');
    previsaoDiv.innerHTML = '<h2>Previsão para os próximos dias</h2>';
    
    var previsoes = data.list;
    for (var i = 0; i < previsoes.length; i++) {
    var previsao = previsoes[i];
    var dataPrevista = new Date(previsao.dt * 1000);
    var dia = dataPrevista.getDate();
    var mes = dataPrevista.getMonth() + 1;
    var ano = dataPrevista.getFullYear();
    var hora = dataPrevista.getHours();
    var minuto = dataPrevista.getMinutes();
    
    var itemPrevisao = document.createElement('p');
    itemPrevisao.textContent = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + (minuto < 10 ? '0' : '') + minuto + ' - ' + previsao.main.temp + ' °C, ' + previsao.weather[0].description;
    previsaoDiv.appendChild(itemPrevisao);
    }
    }