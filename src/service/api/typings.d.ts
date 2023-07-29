declare namespace API {
  type currentUser = {
    id: number;
    username: string;
    name: string;
    icon: string;
  };
  type login = {
    token: string;
    exp: number;
  };
}
