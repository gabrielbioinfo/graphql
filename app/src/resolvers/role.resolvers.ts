import data from '../data/data';

export default {
    Query: {
        role: async (_, { id }) => {
            const item = await data.getRoleById(id);
            return item;
        },
        roles: () => data.roles
    },
    Mutation: {
        createRole: async(_, {name}) => {

            if(!name)
                throw new Error("Dados de usuário obrigatórios não informados!");

            const existingRole = data.getRoleByName(name);
            if(existingRole)
                throw new Error("Esse ai já existe");

            const nextId = data.getNextVal(data.roles);
            const role = { id: nextId, name}
            data.roles.push(role);
            return role;

        },
        updateRole: async(_, params) => {
            //{name}
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
