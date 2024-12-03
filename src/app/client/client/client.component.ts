import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {


  offers = [
    {
      id: 1,
      title: 'Plomberie',
      description: 'Trouvez des plombiers qualifiés pour vos réparations.',
      image: '../../../assets/service/plomb.jfif'
    },
    {
      id: 2,
      title: 'Mécanique',
      description: 'Experts en réparation de voitures à proximité.',
      image: '../../../assets/service/batiment.jfif'
    },
    {
      id: 3,
      title: 'Électricité',
      description: 'Des électriciens pour vos installations et dépannages.',
      image: '../../../assets/service/brico.jfif'
    }
  ];
}

