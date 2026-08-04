import type { DonationType } from "../enums/donation-type.enum";

export interface DonationRequest {
  employeeId: string;  
  donationPlanId: string;
  donationType: DonationType;
  donationAmount: number;
  donationStartDate: string;
  donationEndDate: string | null;
}