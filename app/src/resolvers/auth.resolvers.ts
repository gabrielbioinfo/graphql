import data from '../data/data';

export default {
    Mutation: {
        login: async(_, authInput) => {

            console.log(_.request.header);

            const user = data.getUserByUsername(authInput.user.username);
            if(!user)
                throw new Error("Usuário não encontrado");

            if(user.password != authInput.user.password)
                throw new Error("Erro na authenticação!");

            let tokenForUser = data.getTokenForUser(user.id);
            if(!tokenForUser){
                tokenForUser = {user, token: `podeuser-${user.username}`}
                data.tokens.push(tokenForUser);
            }

            return {
                user,
                token: tokenForUser.token
            };

        }
    }
};
