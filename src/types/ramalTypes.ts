export enum StatusRamal {
  DISPONIVEL = 'DISPONIVEL',
  INVALIDO = 'INVALIDO',
  OCUPADO = 'OCUPADO',
}

export type LoggedUser = {
  username: string;
  extension: number;
};

export type Ramal = {
  id: number;
  numero: string;
  usuario: string;
  extensionNumber: number;
  loggedUser: LoggedUser;
  status: StatusRamal;
};
