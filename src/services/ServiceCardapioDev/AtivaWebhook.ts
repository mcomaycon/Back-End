import { iCliGrupos } from "./interfaces";
import { getCustomRepository } from "typeorm";
import { ViewWebhookCliRep } from "../../repositories/ViewWebhookCliRep";

interface iWebhook {
    opt_cod_cliente: string;
    opt_finalidade: string;
    Data: JSON;
}

class AtivaWebhook {
    async execute({ opt_cod_cliente, opt_finalidade, Data }: iWebhook) {
        const webhookRep = getCustomRepository(ViewWebhookCliRep);

        const Webhook = await webhookRep.find({
            opt_cod_cliente,
            opt_finalidade,
        });

        const fetch = require("node-fetch");
        var hookGrupoProd;

        if (Webhook) {
            switch (opt_finalidade) {
                case "1":
                    hookGrupoProd = Webhook.map((Link) => [Link.opt_tipo, Link.opt_url]);
                    hookGrupoProd.forEach(async (_Link) => {
                        
                        var requestOptions = {
                            method: _Link[0],
                            headers: {
                                "Content-Type": "application/json",
                                Accepts: "*",
                            },
                            body: JSON.stringify([Data]),
                        };
                        var WebhookResponse = await fetch(`${_Link[1]}`, requestOptions);
                        
                    });
                    break;
                case "2":
                    // console.log("produtos")
                    hookGrupoProd = Webhook.map((Link) => [Link.opt_tipo, Link.opt_url]);
                    hookGrupoProd.forEach(async (_Link) => {
                        
                        var requestOptions = {
                            method: _Link[0],
                            headers: {
                                "Content-Type": "application/json",
                                Accepts: "*",
                            },
                            body: JSON.stringify(Data),
                        };
                        var WebhookResponse = await fetch(`${_Link[1]}`, requestOptions);
                    });
                    break;
                case "3":
                    break;
                case "4":
                    break;
                case "5":
                    break;
                default:
                    break;
            }
        } else {
        }
    }
}

export { AtivaWebhook };