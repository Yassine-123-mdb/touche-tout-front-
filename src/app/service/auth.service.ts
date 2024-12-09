import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*  users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"yassine","password":"123","roles":['USER']} ]; */

private helper = new JwtHelperService();

apiURL: string = 'https://back-touch-a-tout-production.up.railway.app';
token!:string;

public loggedUser!:string;

public roles!:string[];
public regitredUser : User = new User();
private userData: any;

  constructor(private router : Router,
              private http : HttpClient
) { }

  setRegistredUser(user : User){
  this.regitredUser=user;
  }
  getRegistredUser(){
  return this.regitredUser;
  }

  validateEmail(code : string){
    return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
    }
    login(user: User): Observable<User> {
      return this.http.post<User>(this.apiURL+'/login', user).pipe(
        tap(response => {
          // Stocker les informations de l'utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify(response));  // Stocker les données utilisateur
        })
      );
    }
    storeUserData(user: any) {
      localStorage.setItem('user', JSON.stringify(user)); // Sauvegarder les données utilisateur dans localStorage
      this.userData = user; // Optionnel : garder une copie des données dans le service
    }
  
    // Méthode pour récupérer les données utilisateur
    getUserData() {
      const user = localStorage.getItem('user');
      if (user) {
        this.userData = JSON.parse(user);
        
      }
      return this.userData;
    }
  
    // Méthode pour vérifier si l'utilisateur est connecté
    isloggedIn(): boolean {
      return !!localStorage.getItem('user'); // Vérifie si des données utilisateur existent dans le localStorage
    }
      
    isRole(role: string): boolean {
      return this.roles?.includes(role) ?? false;
    }
    
   /*  handleLoginResponse(response: any) {
      const jwtToken = response.headers.get('Authorization');
      if (jwtToken) {
        this.saveToken(jwtToken); // Sauvegarder et décoder le JWT
        this.redirectUser(); // Redirection après avoir décodé les rôles
      } else {
        console.error("Erreur : le token JWT n'a pas été reçu.");
      }
    } */
    
    redirectUser() {
      if (this.roles?.includes('ADMIN')) {
        this.router.navigate(['/admin']);
      } else if (this.roles?.includes('CLIENT')) {
        this.router.navigate(['/client']);
      } else {
        this.router.navigate(['/prestataire']);
      }
    }
    
  
  
  registerUser(user :User){
    return this.http.post<User>(this.apiURL+'/register', user,
    {observe:'response'});
    }
 /* saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
    }
    
  getToken():string {
    return this.token;
  }

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

 


 /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return this.roles.indexOf('ADMIN') >=0 ;
    ;
  }  

  
  logout() {
    localStorage.removeItem('user'); // Supprimer les données utilisateur du localStorage
    this.userData = null; // Réinitialiser les données utilisateur
    this.router.navigate(['/login']);
  }

 /*  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
   // this.getUserRoles(login);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);   
  } */



  /*getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }*/
    
}
