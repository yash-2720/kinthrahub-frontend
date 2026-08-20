import { Component, ChangeDetectorRef, type OnInit } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import type { PayrollResponse } from '../../models/payroll-response';

@Component({
  selector: 'app-payroll-component',
  imports: [],
  templateUrl: './payroll-component.html',
  styleUrl: './payroll-component.css',
})
export class PayrollComponent implements OnInit {
  constructor(
    private payrollService: PayrollService,
    private cdr: ChangeDetectorRef,
  ) {}

  payrollRecords: PayrollResponse[] = [];
  search = '';
  page = 0;
  size = 20;
  totalElements = 0;

  ngOnInit(): void {
    this.loadPayroll();
  }

  loadPayroll(): void {
    const request = this.search.trim()
      ? this.payrollService.getAllPayrollRecords(this.page, this.size)
      : this.payrollService.searchPayrolls(this.page, this.size, this.search);

    request.subscribe({
      next : (response) =>{
        this.payrollRecords = response.content;
        this.totalElements = response.totalElements;
        console.log(this.payrollRecords);
      },
      error : (error)=>{
        console.log("Error retriving payroll");
      }
    })
  }
}
