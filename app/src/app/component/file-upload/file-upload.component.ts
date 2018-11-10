import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AppUtility } from '../../class/AppUtility';
import { BlockUIService } from './../../service/blockUI.service';
import 'rxjs/add/observable/of';

declare var swal: any; //SweetAlert2 typings definition

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


  @Input('img') imgUri: string;
  @Output('change-img-uri') updateImgUri = new EventEmitter<string>();

  private task: AngularFireUploadTask; //AngularFireUploadTask
  private percentage$: Observable<number>;
  private snapshot$: Observable<any>;
  private downloadUri$: Observable<string>;

  private msg: string;
  private isHovering: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private viewContainerRef: ViewContainerRef,
    private blockUI: BlockUIService
  ) {
    this.blockUI.vRef = this.viewContainerRef;
  }

  ngOnInit() {
    this.msg = "Drop image here or use the following upload button...";
  }

  ngOnChanges() {
    if (this.imgUri) {
      this.downloadUri$ = Observable.of(this.imgUri);
      // this.downloadUri$ = Observable.create(observer => {
      //   observer.next(this.imgUri);
      //   observer.complete();
      // });
    }
  }

  private hover(event: boolean) {
    this.isHovering = event;
  }

  upload(event: FileList) {
    const file = event.item(0);
    const fileExtension = file.name.split('.').pop();
    const path = `Demo/${AppUtility.generateUUID()}.${fileExtension}`;
    const customerMetadata = 'Product image';

    if (file.type.split('/')[0] !== 'image') {
      this.msg = 'Unsupported file type!';
      return;
    }

    this.blockUI.start();

    let ref = this.storage.ref(path);
    this.task = ref.put(file);
    // this.task = this.storage.upload(path, file);
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();
    this.downloadUri$ = this.task.downloadURL();

    //Monitor the upload progress
    this.snapshot$.subscribe(
      snap => {
        console.log(`State:${snap.state} for ${snap.bytesTransferred}/${snap.totalBytes}`);
        if (snap.state === 'running' && snap.bytesTransferred < snap.totalBytes) {
          //Do something when uploading file
        }
        else {
          this.blockUI.stop();
          this.downloadUri$.subscribe(
            uri => this.updateImgUri.emit(uri)
          );
        }
      },
      error => {
        this.blockUI.stop();
        swal(
          'Error!',
          'Access denied!',
          'error'
        );
      });
  }
}
