import { NextFunction, Request, Response } from "express";
import { ServiceGravaLog } from "../services/ServiceLogger";

export async function AutToLevando(request: Request, response: Response, next: NextFunction) {
    //var { cod_pedido } = request.body;
    //console.log(request)

    var payload = JSON.stringify(request.body);

    const CriaLog = new ServiceGravaLog();
    //
    var iLen = 0;
    var Data = new Date();
    var dia = String(Data.getDate()).padStart(2, "0");
    var mes = String(Data.getMonth() + 1).padStart(2, "0");
    var ano = Data.getFullYear();
    const MomentoD = `${ano}-${mes}-${dia}`;
    var horas = "00" + Data.getHours();
    iLen = String(horas).length;
    horas = horas.substring(iLen, iLen - 2);
    var minutos = "00" + Data.getMinutes();
    iLen = String(minutos).length;
    minutos = minutos.substring(iLen, iLen - 2);
    var segundos = "00" + Data.getSeconds();
    iLen = String(segundos).length;
    segundos = segundos.substring(iLen, iLen - 2);
    const MomentoH = `${horas}:${minutos}:${segundos}`;
    //
    const _log = await CriaLog.execute({
        opt_payload: payload,
        opt_data: MomentoD,
        opt_hora: MomentoH,
        opt_origem: "TO LEVANDO",
    });

    //if (chaveUai === process.env.CHAVE_UAI_RANGO) {
    return next();
    //}
    //senha ok?
    //throw new Error("Não Autorizado");
}
