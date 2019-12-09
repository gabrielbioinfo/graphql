const users = [];
const roles = [{id: 1,name: "Administrador"}, {id: 2,name: 'Professor'}, {id: 3,name: 'Tutor'}, {id: 3,name: 'Aluno'}];
const tokens = [];

const data = {
    users,
    roles,
    tokens,

    getUserById: (id)=>{
        return users.find( item => item.id === id )
    },

    getRoleById: (id)=>{
        return roles.find( item => item.id === id )
    },
    getRoleByName: (name)=>{
        return roles.find( item => item.name === name )
    },
    getNextVal: (array)=>{
        const sortedInverseArray = [...array].sort( (a,b)=> a.id - b.id ).reverse();
        if(sortedInverseArray.length==0)
            return 1;
        return sortedInverseArray[0].id + 1;
    },
    getUserByUsername(uservalue) {
        return users.find( item => (item.username === uservalue) )
    },
    getUserByEmail(uservalue) {
        return users.find( item => (item.email === uservalue) )
    },
    getTokenForUser(id) {
        return tokens.find( item => (item.userid === id) )
    }
}

export default data;