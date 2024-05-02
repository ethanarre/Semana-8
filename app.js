const express = require('express')
const Sequelize = require('sequelize')
const app = express()

const sequelize = new Sequelize('s8_lab1', 'root', '', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

const tipomedicModelo = sequelize.define('tipomedic', {
    "CodTipoMed": { type: Sequelize.INTEGER, primaryKey: true },
    "descripcion": Sequelize.STRING
}, {
    tableName: "tipomedic"
})

const especialidadModelo = sequelize.define('especialidad', {
    "CodEspec": { type: Sequelize.INTEGER, primaryKey: true },
    "descripcionEsp": Sequelize.STRING
}, {
    tableName: "especialidad"
})

const medicamentoModelo = sequelize.define("medicamento", {
    "CodMedicamento": { type: Sequelize.INTEGER, primaryKey: true },
    "descripcionMed": Sequelize.STRING,
    "fechaFabricacion": Sequelize.DATE,
    "Presentacion": Sequelize.STRING,
    "stock": Sequelize.INTEGER,
    "precioVentaUni": Sequelize.FLOAT,
    "precioVentaPres": Sequelize.FLOAT,
    "CodTipoMed": Sequelize.INTEGER,
    "Marca": Sequelize.STRING,
    "CodEspec": Sequelize.INTEGER
}, {
    tableName: "medicamento",
    timestamps: false 
})

medicamentoModelo.belongsTo(tipomedicModelo, { foreignKey: 'CodTipoMed', as: 'TipoMedicamento' });
medicamentoModelo.belongsTo(especialidadModelo, { foreignKey: 'CodEspec', as: 'Especialidad' });


sequelize.authenticate()
    .then(() => {
        console.log('conexion a la base de datos OK')
    })

    .catch(error => {
        console.log('error de conexion a la base de datos ' + error)
    })

tipomedicModelo.findAll({ attributes: ['CodTipoMed', 'descripcion'] })
    .then(especialidad => {
        console.log("--------------------------------------------")
        console.log("REGISTRO DE TIPOS DE MEDICAMENTOS")
        especialidad.forEach(registro => {
            const resultados = JSON.stringify(registro)
            console.log(resultados)
        })

    })

especialidadModelo.findAll({ attributes: ['CodEspec', 'descripcionEsp'] })
    .then(tipomedic => {
        console.log("--------------------------------------------")
        console.log("REGISTRO DE ESPECIALIDADES")
        tipomedic.forEach(registro => {
            const resultados = JSON.stringify(registro)
            console.log(resultados)
        })

    })

medicamentoModelo.findAll({
    include: [
        { model: tipomedicModelo, attributes: ['descripcion'], as: 'TipoMedicamento' },
        { model: especialidadModelo, attributes: ['descripcionEsp'], as: 'Especialidad' }
    ]
})
    .then(medicamento => {
        console.log("--------------------------------------------");
        console.log("REGISTRO DE MEDICAMENTOS");
        medicamento.forEach(registro => {
            const resultados = JSON.stringify(registro);
            console.log(resultados);
        });
    });

app.listen(3000, () => {
    console.log('conectado')
})