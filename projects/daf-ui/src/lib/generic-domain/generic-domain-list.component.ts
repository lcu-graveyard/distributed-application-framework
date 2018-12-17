import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { DomainService } from '@lcu/enterprises';

@Component({
	selector: 'forge-generic-domain-list',
	templateUrl: './generic-domain-list.component.html',
	styleUrls: ['./generic-domain-list.component.scss']
})
export class GenericDomainListComponent implements OnInit {
	//  Fields

	//  Properties
	@Input('columns-to-display')
	public ColumnsToDisplay: string[];

	@Output('delete')
	public Delete: EventEmitter<any>;

	public Error: string;

	@Input('items')
	public Items: any[];

	public Loading: boolean;

	@Output('manage')
	public Manage: EventEmitter<any>;

	@Input('page-size')
	public PageSize: number;

	@Input('page-size-options')
	public PageSizeOptions: number[];

	@ViewChild(MatPaginator)
	public Paging: MatPaginator;

	@Input('total')
	public TotalRecords: number;

	//  Constructors
	constructor(protected domainSvc: DomainService) {
		this.Delete = new EventEmitter();

		this.Manage = new EventEmitter();

		this.PageSizeOptions = [5, 10, 25, 100];

		this.PageSize = this.PageSizeOptions[0];
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public DeleteDomain(domain: any) {
		this.Delete.emit(domain);
	}

	public ManageDomain(domain: any) {
		this.Manage.emit(domain);
	}

	//	Helpers
}
