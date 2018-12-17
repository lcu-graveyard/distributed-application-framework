import { DataFlowContext } from './../contexts/data-flow.context';
import { Injectable } from '@angular/core';
import * as DotObject from 'dot-object';
import { DataMapperConfig, DataMapperMappedDetails, DataMapperFlowDetails, DataMapperShowHideDetails, DataMapperMapping } from '@lcu/apps';

@Injectable({
	providedIn: 'root'
})
export class DataMapperService {
	//	Fields
	protected mapper: DotObject;

	//	Constructors
	constructor() {
		this.mapper = new DotObject();
	}

	//	API Methods
	public Map(config: DataMapperConfig, inputs: any[], data: { [key: string]: DataFlowContext<any> }): any[] {
		var workingSet = [...inputs];

		var outputs = [];

		switch (config.MapType) {
			case 'Flow':
				outputs = this.executeFlow(<DataMapperFlowDetails>config.Details, workingSet, data);
				break;

			case 'Mapped':
				outputs = this.executeMapped(<DataMapperMappedDetails>config.Details, workingSet, data);
				break;

			case 'Ordered':
				outputs = this.executeOrdered(workingSet, data);
				break;

			case 'ShowHide':
				outputs = this.executeShowHide(<DataMapperShowHideDetails>config.Details, workingSet, data);
				break;
		}

		return outputs;
	}

	//	Helpers
	protected executeFlow(details: DataMapperFlowDetails, inputs: any[], data: { [key: string]: DataFlowContext<any> }): any[] {
		return this.executeOrdered(inputs, data);
	}

	protected executeMapped(details: DataMapperMappedDetails, inputs: any[], data: { [key: string]: DataFlowContext<any> }): any[] {
		//	TODO:  This needs better logic...  Maybe should be trying to handle multiple inputs to outputs, but it seems like what we want to do
		var outputs = [];

		if (details && details.Map) {
			outputs = inputs.map(inputCtxt => {
				var recipe = {};

				var mapKeys = Object.keys(details.Map);

				var output = {};

				mapKeys.forEach(mk => {
					var input = this.resolveInput(inputCtxt, data, details.Map[mk]);

					recipe[mk] = details.Map[mk].Output;

					if (input)
						this.processInput(input, recipe, output);
				});

				return output;
			});
		}

		return outputs;
	}

	protected executeOrdered(inputs: any[], data: { [key: string]: DataFlowContext<any> }): any[] {
		return [Object.assign({}, inputs)]
	}

	protected executeShowHide(details: DataMapperShowHideDetails, inputs: any[], data: { [key: string]: DataFlowContext<any> }): any[] {
		//	TODO:  This needs better logic...  Maybe should be trying to handle multiple inputs to outputs, but it seems like what we want to do
		var outputs = [];

		if (details && details.Left && details.Right) {
			outputs = inputs.map(inputCtxt => {
				var output = { Hide: false };

				if (!details.Left.Output && !details.Right.Output)
					output.Hide = false;
				else if (!details.Left.Output || !details.Right.Output)
					output.Hide = true;
				else {
					var leftInput = this.resolveInput(inputCtxt, data, details.Left);

					var rightInput = this.resolveInput(inputCtxt, data, details.Right);

					var recipe = {};

					recipe[details.Left.Output] = 'Value';

					var left = this.processInput(leftInput, recipe);

					recipe[details.Right.Output] = 'Value';

					var right = this.processInput(rightInput, recipe);

					output.Hide = left.Value !== right.Value;
				}

				return output;
			});
		}

		return outputs;
	}

	protected processInput(input: any, recipe: any, output?: any) {
		if (!output)
			return this.mapper.transform(recipe, input);
		else
			this.mapper.transform(recipe, input, output);
	}

	protected resolveInput(inputCtxt: any, data: { [key: string]: DataFlowContext<any> }, mapper: DataMapperMapping) {
		var input = {};

		switch (mapper.Reference) {
			case "Context":
				input = inputCtxt;
				break;

			case "Data":
				input = data[mapper.DataKey];
				break;

			case "0":
			case "1":
			case "2":
			case "3":
				input = inputCtxt[mapper.Reference];
				break;
		}

		return input;
	}
}
