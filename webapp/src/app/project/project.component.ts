import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Project} from './project';
import {ProjectService} from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  dataSource: Project[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = ['name', 'beginDate', 'endDate', 'action'];
  private subscription: Subscription = null;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshTable(): void {
    this.subscription = this.service.getAll().subscribe(data => {
      this.isLoadingResults = false;
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  openAddDialog(): void {
    /*const project = new Project();
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: {project: project}
    });
    dialogRef
      .afterClosed()
      .subscribe(outProject => {
        if (outProject) {
          const body = project;
          this.service.add(body)
            .subscribe(project => {
              this.dataSource.push(project);
              this.refreshTable();
            });
        }
      });*/
  }

  openEditDialog(project: Project): void {
    /*let currentProject = new Project();
    currentProject.id = project.id;
    currentProject.name = project.name;
    currentProject.beginDate = project.beginDate;
    currentProject.endDate = project.endDate;
    const dialogRef = this.dialog.open(EditTitleProjectComponent, {
      data: {project: currentProject}
    });
    dialogRef.afterClosed().subscribe(outProject => {
      if (outProject) {
        const body = outProject;
        this.service.edit(body)
          .subscribe(data => {
            this.dataSource.push(data);
            this.refreshTable();
          });
      }
    });*/
  }

  deleteRow(project: Project): void {
    /*this.service.delete(project.id).subscribe(() => this.refreshTable());*/
  }
}
