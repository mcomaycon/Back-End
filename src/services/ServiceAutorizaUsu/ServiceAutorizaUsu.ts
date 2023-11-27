import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsuarioRep } from "../../repositories/UsuarioRep";

interface iAutenticaUsu {
	email: string;
	senha: string;
}

class AutorizaUsu {
	async execute({ email, senha }: iAutenticaUsu) {
		const usuario = UsuarioRep;
		//usuario ok?
		const user = await usuario.findOne({
			where: { opt_email: email },
		});
		if (!user) {
			throw new Error("Email ou Senha Incorretos");
		}
		//senha ok?
		const bEncontrouSenha = await compare(senha, user.opt_senha);
		if (!bEncontrouSenha) {
			throw new Error("Email ou Senha Incorretos");
		}
		const cCodigo = user.opt_codigo_usu.toString();
		//Gera Token
		const token = sign(
			{
				codigo: user.opt_codigo_usu,
				nome: user.opt_usuario,
			},
			process.env.SECRET,
			{
				subject: cCodigo,
				expiresIn: "1d",
			}
		);
		if (user.opt_usuario == "FOOD") {
			return token;
		} else {
			return { codigo: cCodigo, nome: user.opt_usuario, token };
		}
	}
}

export { AutorizaUsu };
