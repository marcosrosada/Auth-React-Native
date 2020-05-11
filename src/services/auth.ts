export default function signIn() {
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
