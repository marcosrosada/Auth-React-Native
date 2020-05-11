interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'RApjPApoMAknmf',
        user: {
          name: 'Marcos Rosada',
          email: 'marcosfrosada@gmail.com',
        },
      });
    }, 2000);
  });
}
