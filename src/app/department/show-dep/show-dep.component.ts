import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddDepComponent} from 'src/app/department/add-dep/add-dep.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EditDepComponent } from '../edit-dep/edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service : DepartmentService, private dialog : MatDialog,
    private snackBar : MatSnackBar) { 
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDepList();
    })
  }
  listDate : MatTableDataSource<any>;
  displayedColumns : string [] = ['Options','DepartmentID','DepartmentName'];
  @ViewChild (MatSort) sort: MatSort;

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data => {
    this.listDate = new MatTableDataSource(data);
    this.listDate.sort = this.sort;
  });

  }

  applyFilter(filtervalue: string){
    this.listDate.filter = filtervalue.trim().toLocaleLowerCase();
  }
  
  onEdit(dep :Department)
  {
    this.service.formData = dep;
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDepComponent,dialogConfig);

  }

  onDelete(id :number)
  {
    if(confirm('Are you sure to delete')){
      this.service.deleteDepartment(id).subscribe(res=>{
        this.refreshDepList();
        this.snackBar.open(res.toString(),'',{
          duration: 5000,
          verticalPosition : 'top'
        });
      });
    }
  }
  onAdd(){
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent,dialogConfig);
  }

}
