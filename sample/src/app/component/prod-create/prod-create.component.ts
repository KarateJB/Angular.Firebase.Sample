import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../class/Product';
import {ProductType} from '../../class/ProductType';
import { ProdTypeEnum } from '../../enum/ProdTypeEnum';
import { AppUtility } from '../../class/AppUtility';


declare var swal: any; //SweetAlert2 typings definition

@Component({
    selector: 'prod-create',
    providers: [ProductService],
    templateUrl: './prod-create.component.html'
})

export class ProdCreateComponent implements OnInit {
    title: string;
    private prod: Product;
    private prodHint: string;
    private selectedProdType: ProductType;
    private prodTypes: ProductType[];

    constructor(
        private router: Router,
        private prodService: ProductService
    ) {
        this.title = "Products - Create";
        this.prodHint = "";
        this.prod = new Product();
        this.prodTypes = this.prodService.getProductTypes();
    }

    ngOnInit() {

    }
    //Change Selected Product type callback
    private changeSelectedType(event: any) {


        switch (event.id)
        {
            case ProdTypeEnum.Book.toString():
                this.prodHint="Enter a book's title.."
                break;
            case ProdTypeEnum.Toy.toString():
                this.prodHint = "Enter a toy's name.."
                break;
            default:
                this.prodHint = "";
                break;
        }
    }

    //Save!
    private save() {
        this.prod.id = AppUtility.generateUUID();
        this.prod.typeId = this.selectedProdType.id;
        this.prod.type = this.selectedProdType.name;
          
        this.prodService.create(this.prod).then(
            () => {

                var rt = this.router;
                swal(
                    'Success!',
                    'The data has been saved.',
                    'success'
                ).then(function () {
                    //Return to Index
                    rt.navigate(['Product/Index']);
                });

            }).catch(e=>
                swal(
                    'Error!',
                    'Access denied!',
                    'error'
                )
            );
    }

    private setImgUri(event:string){
        this.prod.imgUri=event;
    }


    //Back to list (Show list)
    private backToList() {
        this.router.navigate(['Product/Index']);
    }
}

