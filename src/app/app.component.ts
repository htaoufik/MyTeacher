import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Yeah';
  errorMessage: string;
  images: Array<any>= [];
  constructor(private fileService: FileService) { }
  ngOnInit() { this.getImageData(); }

  refreshImages(status) {
      if (status === true) {
          console.log( 'Uploaded successfully!');
          this.getImageData();
      }
  }
  getImageData() {
      this.fileService.getImages().subscribe(
          data => { this.images = data.result},
          error => this.errorMessage = error
      );
  }
}
