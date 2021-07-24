import { getCustomRepository } from "typeorm";
import { AppRep } from "../repositories/AppRep";
import { PedidoRep } from "../repositories/PedidoRep"
import { Request, Response, NextFunction } from "express";


export async function BuscaPedidosUaiRango(request: Request, response: Response, next: NextFunction) {
    console.log("Pedido")
    //
    var { id_estabelecimento, cod_pedido, data } = request.body;
    //
    var Pedidos = request.body;
    console.log(id_estabelecimento)
    console.log(cod_pedido)
    console.log(data)
    //var PedidosJson = await Pedidos.json();
    console.log("Converteu")
    // RODANDO UM FOR DENTRO DOS PEDIDOS RETORNADOS
    //PedidosJson.forEach(async pedido => {

    // VERIFICANDO SE O PEDIDO JÁ FOI IMPORTADO
    console.log(cod_pedido)
    const apps = getCustomRepository(AppRep);
    const app = await apps.findOne({
        where: {
            token: id_estabelecimento
        }
    })
    if (!app) {
        console.log("Não Encontro Estabelecimento!")
        return response.status(200).json({ Message: "Pedido Não Pertence a Nenhum Cliente" });
    }
    var cont = 0;
    var pedidoRep = getCustomRepository(PedidoRep);
    const ped = await pedidoRep.findOne({
        where: {
            opt_pedido_app: cod_pedido
        }
    })
    if (!ped) {
        cont = cont + 1;
        var pedidoUai = pedidoRep.create({
            opt_cod_cliente: app.opt_cod_cliente,
            opt_cod_app: app.seq,
            opt_pedido_app: cod_pedido,
            ordem: cont.toString(),
            hora: data.split(" ")[1].substring(0, 5),
            data: data.split(" ")[0],
            status: "0",
            novo_status: "0",
        })
        await pedidoRep.save(pedidoUai)
    }
    //   }); // FECHANDO FOR PEDIDOS
    return response.status(200).json({ Message: "OK" });
}