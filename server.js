var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var app = express();
var contador = 0;
var datos = [];
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
    datos.push({ id, operacion, numero });

    //--------------------------------------------
    idList = [];
    for (const i in datos) {
        idList.push(datos[i].id)
    }
    //--------------------------------------------
    localStorage.setItem("Valor ID", id);

    if (operacion == "R") {

        res.render('pages/resultado',
            {
                valor: "Última Operación: se ha reseteado la operación " + req.body.id,
                historico: JSON.stringify(datos)
            });

    }

    else {

        res.render('pages/resultado',
            {
                valor: "Última Operación: " + operacion + numero + " a la operación " + req.body.id,
                historico: JSON.stringify(datos)
            });
    }

});


app.listen(3000, () => {

    console.log('Corriendo en el puerto 3000')
    setInterval(contadorTiempo, 1000);

});

function contadorTiempo() {

    idInicial = localStorage.getItem("Valor ID");
    contador++;

    if (contador == 60) {

        datos = [];
        //console.log("Los datos se han reseteado.");
        //contador = 0;
    }
}
