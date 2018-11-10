import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../class/Product';
import { ProductType } from '../../class/ProductType';
import { BlockUIService } from '../../service/blockUI.service';

declare var swal: any; //SweetAlert2 typings definition

@Component({
    selector: 'prod-edit',
    providers: [ProductService],
    templateUrl: './prod-edit.component.html'
})

export class ProdEditComponent implements OnInit {
    title: string;
    private prod: Product;
    private selectedProdType: ProductType;
    private prodTypes: ProductType[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private prodService: ProductService,
        private viewContainerRef: ViewContainerRef,
        private blockUI: BlockUIService
    ) {
        this.blockUI.vRef = this.viewContainerRef;
        this.title = "Products - Edit";
        this.prod = new Product();
        this.prodTypes = this.prodService.getProductTypes();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let prodId = params['id'];

            this.blockUI.start();
            this.prodService.getById(prodId).subscribe(data => {
                this.prod = data;
                this.prodTypes.forEach(type => {
                    if (type.id == this.prod.typeId) {
                        this.selectedProdType = type;
                    }
                })

                this.blockUI.stop();
            })
        });
    }

    private setImgUri(event:string){
        this.prod.imgUri=event;
    }

    //Save!
    private save() {

        this.prod.typeId = this.selectedProdType.id;
        this.prod.type = this.selectedProdType.name;

        this.prodService.update(this.prod).then(
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


    //Back to list (Show list)
    private backToList() {
        this.router.navigate(['Product/Index']);
    }
}

