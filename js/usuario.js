export class Usuario {
    constructor () {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    createUser( user ) {
        this.usuarios.push( user )
        localStorage.setItem( 'usuarios', JSON.stringify( this.usuarios ) );
    }
    
    findOneByIdUser( idUser ) {
        const user = this.usuarios.find((element) => element.id === idUser);
    
        if (!user) {
          throw new Error("No existe el usuario id:" + idUser);
        }
        return user;
      }

    deleteUser( idUser ) {
        const user = this.findOneByIdUser(idUser);
        const index = this.usuarios.indexOf(user);
        this.usuarios.splice(index, 1);
    }

    updatePassword ( idUser, password ) {
        const user = this.findOneByIdUser(idUser);
        user.contraseña = password;
    }

    validateUser( email, password ) {
        const userValidado = this.usuarios.find( element => email === element.email && password === element.password);
        return userValidado;
    }

}