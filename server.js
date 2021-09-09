var express = require('express');
var app = express();
const port = 3000;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

var contador = 0;
var datos = [];
const idList = new Map();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/calcular', (req, res) => {
    const id = req.body.id;
    const operacion = req.body.operacion;
    const numero = parseFloat(req.body.numero);

    datos.push({ id, operacion, numero});
    idList.set(id,new Date());
    localStorage.setItem("Valor ID", id);

    if (operacion == "R") {

        borrarID(id);
        res.render('pages/resultado',
            {
                valor: "Última Operación: se ha reseteado la id: " + req.body.id,
                historico: JSON.stringify(datos)
            });

    }

    else {

        res.render('pages/resultado',
            {
                valor: "Última Operación: " + operacion + numero + " a la id: " + req.body.id,
                historico: JSON.stringify(datos)
            });
    }

});


app.listen(port, () => {

    console.log(`Corriendo en el puerto ${port}`);
    setInterval(contadorTiempo, 1000);
    

});

function contadorTiempo() {

    //console.log(idList)
    idInicial = localStorage.getItem("Valor ID"); //Esto es para que deje la última id insertada en el input
    contador++;

    var actualDate = new Date().getTime() - (1000 * 60);
    const valores = idList.keys();

    while (id = valores.next().value) {
        var moment = new Date();
        moment.getTime();

        var fechaID = idList.get(id);

        if (fechaID.getTime() < actualDate) {
            borrarID(id);
        }

    }

}

function borrarID(id) {

    idList.delete(id);
    datos = datos.filter(valor => {
        valor.id != id
    });

}
