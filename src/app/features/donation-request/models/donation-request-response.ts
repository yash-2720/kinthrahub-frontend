import type { DonationStatus } from "../enums/donation-status.enum";
import type { DonationType } from "../enums/donation-type.enum";

export interface DonationRequestResponse {
  donationRequestId: string;
  employeeId: string;
  employeeName: string;
  donationPlanId: string;
  donationName : string;
  donationType: DonationType;
  donationStatus: DonationStatus;
  donationAmount: number;
  donationStartDate: string;
  donationEndDate: string | null;
  active: boolean;
}