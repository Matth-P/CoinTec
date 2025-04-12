// import { getAuth } from "firebase/auth";

// /**
//  * Obtém o token JWT do usuário autenticado no Firebase.
//  * @returns {Promise<string | null>} Token JWT ou null se o usuário não estiver autenticado.
//  */
// export const getFirebaseToken = async (): Promise<string | null> => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//         return await user.getIdToken(); // Retorna o token JWT do Firebase
//     }
//     return null;
// };
