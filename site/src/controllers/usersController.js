const {getUsers, setUsers} = require('../data/users_db');

module.exports = {
    loginRegister: (req, res) => {
      
        res.render('users/loginRegister', {
           title: 'Iniciar sesión y registrarse' 
          });
      },
    edit: (req,res) => {

        let usuario = getUsers.find(user => {
            return user.id === +req.params.id
        });

        res.render('users/profileEdit', {
            title: 'Editar perfil',
            user: usuario
        })
    },
    editProcess: (req,res) => {
        const {name, email, password, pass1, pass2, address, tel} = req.body
        
        const updatedList = {
			id: +req.params.id,
			name,
            email,
            password,
            address,
            tel
		}

        getUsers.forEach((usuario, index) => {
            if (usuario.id === req.params.id) {
                getUsers.splice(index, 1, updatedList)
            }
        })

        setUsers(getUsers)

        res.render("users/editar/"+req.params.id)

    },
}