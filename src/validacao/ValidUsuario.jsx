export const validarUsuario = (state) => {

    let {
        nome,
        email,
        toReturn,
        formValidation,
      } = state;


      if ( nome.trim().length > 100 ) {
          formValidation.nome.push("O nome do usuario não pode ter mais do que 100 caracteres!");
          formValidation.validnome = true;
          toReturn = true;
      }

      if ( nome.trim().length === 0 ) {
        formValidation.nome.push("O nome do usuario tem que ser informado!");
        formValidation.validnome = true;
        toReturn = true;
      }

      if ( nome.trim().length < 10 ) {
        formValidation.nome.push("O nome do usuario não pode ter menos do que 10 caracteres!");
        formValidation.validnome = true;
        toReturn = true;
      }

      state = { toReturn, formValidation }

      return state;   

} 