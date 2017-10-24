import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss', '../app.component.scss']
})

export class FileUploadComponent implements OnInit {

    /**
     * This array stores the errors
     *
     * @type {Array}
     */
    errors: Array<string> = [];

    /**
     * This class will be added to the drop zone
     *
     * @type {string}
     */
    dragAreaClass = 'dragArea';

    @Input() projectId = 0;
    @Input() sectionId = 0;
    @Input() fileExt = 'JPG, GIF, PNG';
    @Input() maxFiles = 5;
    @Input() maxSize = 5;
    @Output() uploadStatus = new EventEmitter();

    /**
     * Constructor injects the file service
     *
     * @param {FileService} fileService
     */
    constructor(private fileService: FileService) { }

    /**
     * TODO : Implement on Init
     */
    ngOnInit() { }

    /**
     * Saves the file every time the file input is changed
     *
     * @param event
     */
    onFileChange(event) {
      const files = event.target.files;
      this.saveFiles(files);
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
      event.preventDefault();
      this.dragAreaClass = 'dropArea';
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
      event.preventDefault();
      this.dragAreaClass = 'dropArea';
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
      event.preventDefault();
      this.dragAreaClass = 'dragArea';
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
      event.preventDefault();
      this.dragAreaClass = 'dragArea';
    }

    @HostListener('drop', ['$event']) onDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.dragAreaClass = 'dragArea';
      const files = event.dataTransfer.files;
      this.saveFiles(files);
    }

    /**
     *
     * @param files
     */
    saveFiles(files) {
      this.errors = [];
      if (files.length > 0 && (!this.isValidFiles(files))) {
          this.uploadStatus.emit(false);
          return;
      }
      if (files.length > 0) {
          const formData: FormData = new FormData();
          for (let j = 0; j < files.length; j++) {
              formData.append('file[]', files[j], files[j].name);
          }
          const parameters = {
              projectId: this.projectId,
              sectionId: this.sectionId
          };
          this.fileService.upload(formData, parameters)
              .subscribe(
                  success => {
                      this.uploadStatus.emit(true);
                      console.log(success);
                  },
                  error => {
                      this.uploadStatus.emit(true);
                      this.errors.push(error.ExceptionMessage);
                  }
              );
      }
    }

    private isValidFiles(files) {
      if (files.length > this.maxFiles) {
          this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
          return;
      }
      this.isValidFileExtension(files);
      return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
      const extensions = (this.fileExt.split(','))
          .map(function (x) { return x.toLocaleUpperCase().trim(); });
      for (let i = 0; i < files.length; i++) {
          const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;

          if (!extensions.includes(ext)) {
              this.errors.push('Error (Extension): ' + files[i].name);
          }
          this.isValidFileSize(files[i]);
      }
    }

    private isValidFileSize(file) {
      const fileSizeInMB = file.size / (1024 * 1000);
      const size = Math.round(fileSizeInMB * 100) / 100;
      if (size > this.maxSize) {
          this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
      }
    }
}
