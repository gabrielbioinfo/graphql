import data from '../data/data';

export default {
    Query: {
        user: async (_, { id }) => {
            const user = await data.getUserById(id);
            return user;
        },
        users: () => data.users
    },
    Mutation: {
        createUser: async(_, userInput) => {

            if(!Object.keys(userInput.user).includes('roleName'))
                throw new Error("Dados do papel obrigatórios não informados!");

            let userExists = data.getUserByUsername(userInput.user.username);
            if(userExists)
                throw new Error("Já existe um usuário com esse username!");

            userExists = data.getUserByEmail(userInput.user.email);
            if(userExists)
                throw new Error("Já existe um usuário com esse email!");

            const objRole = data.roles.find( item => item.name === userInput.user.roleName );
            const id = data.getNextVal(data.users);
            const {roleName, ...userInputs} = userInput.user;
            const user = {id, ...userInputs, role: objRole};

            data.users.push(user);
            return user;

        },
        updateUser: async(_, params) => {

            //{id, username, firstName, lastName, email}
            if(!Object.keys(params).includes("id"))
                throw new Error("ID não informada!");

            const user = data.users.find( user => user.id === params.id );
            if(!user)
                throw new Error("Usuário não encontrado!");

            const propertiesToChange = params.map( param => {
                const {id, ...properties} = param;
                return properties;
            });

            if(propertiesToChange.length===0)
                throw new Error("Nenhuma propriedade informada!");

            Object.keys(params).map( param => {
                if(!params[param])
                    return;
                user[param] = params[param];
            });
            data.users.push(user);
            return user;
        },
        changeUserRole: async(_, params) => {
            if(!Object.keys(params).includes("id")
            || !Object.keys(params).includes("role")
            || !Object.keys(params.role).includes("name"))
                throw new Error("Dados Obrigatórios não informados!");

            const user = data.getUserById(params.id);
            const role = data.getRoleByName(params.name);

            if(!user || !role)
                throw new Error("Usuário ou papel não encontrado!");

            Object.keys(params).map( param => {
                if(!params[param])
                    return;
                user[param] = params[param];
            });
            data.users.push(user);
            return user;
        },
    }
};
