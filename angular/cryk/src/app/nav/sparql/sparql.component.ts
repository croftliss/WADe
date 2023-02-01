import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Sparql } from 'src/app/shared-models/sparql.model';
import { SparqlService } from './sparql.service';

@Component({
  selector: 'app-sparql',
  templateUrl: './sparql.component.html',
  styleUrls: ['./sparql.component.scss']
})
export class SparqlComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isDataAvailable = false;
  displayedColumns: string[] = [];
  dict = new Map<string, string[]>();
  results: Object;
  sparqlResults: Sparql[] = [];
  numberOfValues: number;

  constructor(private readonly sparqlService: SparqlService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      query: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.displayedColumns = [];
    this.sparqlService.getSparqlResult(this.form.value.query)
      .subscribe( sparql => 
        {
          //TODO handle error when query is incorrect
          for (var head in sparql['head']['vars']) {
            var column = sparql['head']['vars'][head].toString();
            this.displayedColumns.push(column);
            var values = [];
            for (var data in sparql['results']['bindings']) {
              this.sparqlResults.push({columnName: column, value: sparql['results']['bindings'][data][column]['value']} as Sparql);
              values.push(sparql['results']['bindings'][data][column]['value']);
            }
            this.dict.set(column, values);
          }
          this.numberOfValues = this.sparqlResults.length;
          this.results = Object.fromEntries(this.dict);
          this.isDataAvailable = true;
        });
  }

  getArrayByColumnName(columnName: string): Sparql[] {
    return this.sparqlResults.filter(el => el.columnName === columnName);
  }
}
