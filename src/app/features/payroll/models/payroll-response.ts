import type { PayrollRunStatus } from "../../donation-request/enums/payroll-run-status.enum";

export interface PayrollResponse {
payrollRunId : string,
payrollMonth : number,
payrollYear : number,
runStatus : PayrollRunStatus,
processRequests : number,
skippedRequests : number,
processedOn : string,
remarks : string,
totalDonationAmount : number

}
// 	private Integer skippedRequests;

// //  Total amount deducted from all successfully processed donation requests
// 	private BigDecimal totalDonationAmount;

// 	private LocalDateTime processedOn;

// 	private String remarks;
// ----
// 	private String payrollRunId;

// 	private Integer payrollMonth;

// 	private Integer payrollYear;

// 	private PayrollRunStatus runStatus;

// //  Number of donation requests successfully processed during this payroll run
// 	private Integer processedRequests;

// //  Number of donation requests skipped due to business rules
// //  (e.g., cancelled, already processed, expired, etc.)

