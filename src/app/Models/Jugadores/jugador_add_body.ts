export class jugador_add_body{
   ciJugador: string;
   nombreJugador: string;
   primerApellidoJugador: string;
   segundoApellidoJugador: string;
   fechaNacimientoJugador: string;
   posicionJugador: number;
   posicionSecundariaJugador: number;
   expProfesionalJugador: boolean;
   generoJugador: boolean;
   codClubJugador: string;

   constructor(){
      this.ciJugador = "",
      this.nombreJugador = "",
      this.primerApellidoJugador = "",
      this.segundoApellidoJugador = "",
      this.fechaNacimientoJugador = "",
      this.posicionJugador = 1,
      this.posicionSecundariaJugador = 0,
      this.expProfesionalJugador = false,
      this.generoJugador = true,
      this.codClubJugador = "INGV2912"
   }
}